import React from 'react';
import { homeApi } from '@features/home/api/homeApi';
import { HomeScreen } from '@features/home/screens/HomeScreen';
import { render, screen, fireEvent, act } from '@test-utils';

jest.mock('@features/home/api/homeApi', () => ({
  homeApi: {
    getPhotos: jest.fn().mockImplementation(
      () =>
        new Promise(() => {
          // Keep promise pending during screen render tests
        }),
    ),
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
  key: 'Home-key',
  name: 'Home',
};

describe('HomeScreen (Redux Connected UI)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with products sourced from Redux store', async () => {
    await render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

    // Search input rendered
    expect(screen.getByPlaceholderText(/search/i)).toBeTruthy();

    // Default products from Redux store initial state are displayed
    expect(
      screen.getByText(/Wireless Noise-Canceling Headphones/i),
    ).toBeTruthy();
    expect(screen.getByText(/Ergonomic Mechanical Keyboard/i)).toBeTruthy();
  });

  it('navigates to ProductDetail screen with product params on item touchEnd', async () => {
    await render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

    const productItem = screen.getByText(
      /Wireless Noise-Canceling Headphones/i,
    );
    fireEvent(productItem, 'touchEnd');

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetail', {
      productId: '1',
      title: 'Wireless Noise-Canceling Headphones',
    });
  });

  it('aborts in-flight request when component unmounts', async () => {
    let capturedSignal: AbortSignal | undefined;
    (homeApi.getPhotos as jest.Mock).mockImplementationOnce(
      (_params, signal) => {
        capturedSignal = signal;
        return new Promise(() => {});
      },
    );

    const { unmount } = await render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(capturedSignal).toBeDefined();
    expect(capturedSignal?.aborted).toBe(false);

    await act(async () => {
      unmount();
    });

    expect(capturedSignal?.aborted).toBe(true);
  });
});
