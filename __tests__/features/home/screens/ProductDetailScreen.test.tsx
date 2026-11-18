import React from 'react';
import { homeApi } from '@features/home/api/homeApi';
import { ProductDetailScreen } from '@features/home/screens/ProductDetailScreen';
import { render, screen, fireEvent, waitFor, act } from '@test-utils';

jest.mock('@features/home/api/homeApi', () => ({
  homeApi: {
    getPhotoDetail: jest.fn(),
  },
}));

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(() => () => {}),
  isFocused: jest.fn(() => true),
};

const mockRoute: any = {
  key: 'ProductDetail-key',
  name: 'ProductDetail',
  params: {
    productId: '42',
    title: 'Super Smart Gadget',
  },
};

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial params and calls getPhotoDetail', async () => {
    (homeApi.getPhotoDetail as jest.Mock).mockResolvedValueOnce({
      id: 42,
      albumId: 5,
      title: 'Super Smart Gadget Loaded',
      url: 'https://via.placeholder.com/600/42',
      thumbnailUrl: 'https://via.placeholder.com/150/42',
    });

    await render(
      <ProductDetailScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(screen.getByText('Product Details')).toBeTruthy();
    expect(screen.getByText('#42')).toBeTruthy();

    await waitFor(() => {
      expect(homeApi.getPhotoDetail).toHaveBeenCalledWith(
        '42',
        expect.anything(),
      );
      expect(screen.getByText('Super Smart Gadget Loaded')).toBeTruthy();
      expect(screen.getByText('Album #5')).toBeTruthy();
    });
  });

  it('displays normalized error message when API call fails', async () => {
    (homeApi.getPhotoDetail as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to connect to backend'),
    );

    await render(
      <ProductDetailScreen navigation={mockNavigation} route={mockRoute} />,
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to connect to backend')).toBeTruthy();
      expect(screen.getByText('Tap to retry')).toBeTruthy();
    });
  });

  it('aborts API call when screen unmounts', async () => {
    let capturedSignal: AbortSignal | undefined;
    (homeApi.getPhotoDetail as jest.Mock).mockImplementationOnce(
      (_id, signal) => {
        capturedSignal = signal;
        return new Promise(() => {});
      },
    );

    const { unmount } = await render(
      <ProductDetailScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(capturedSignal).toBeDefined();
    expect(capturedSignal?.aborted).toBe(false);

    await act(async () => {
      unmount();
    });

    expect(capturedSignal?.aborted).toBe(true);
  });

  it('navigates back when header back button or button is pressed', async () => {
    (homeApi.getPhotoDetail as jest.Mock).mockResolvedValueOnce({
      id: 42,
      albumId: 5,
      title: 'Super Smart Gadget',
      url: 'https://via.placeholder.com/600/42',
      thumbnailUrl: 'https://via.placeholder.com/150/42',
    });

    await render(
      <ProductDetailScreen navigation={mockNavigation} route={mockRoute} />,
    );

    await waitFor(() => {
      expect(screen.getByText('Super Smart Gadget')).toBeTruthy();
    });

    const backButton = screen.getByText('‹ Back');
    await fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
