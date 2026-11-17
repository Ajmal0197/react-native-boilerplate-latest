import React from 'react';
import { homeApi } from '@features/home/api/homeApi';
import { ProductDetailScreen } from '@features/home/screens/ProductDetailScreen';
import { render, screen, fireEvent, waitFor } from '@test-utils';

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
      expect(homeApi.getPhotoDetail).toHaveBeenCalledWith('42');
      expect(screen.getByText('Super Smart Gadget Loaded')).toBeTruthy();
      expect(screen.getByText('Album #5')).toBeTruthy();
    });
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

    const backButton = screen.getByText('‹ Back');
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);

    const bottomBackButton = screen.getByText('Back to Products');
    fireEvent.press(bottomBackButton);
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(2);
  });
});
