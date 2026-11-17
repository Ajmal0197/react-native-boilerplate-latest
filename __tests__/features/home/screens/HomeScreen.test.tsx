import React from 'react';
import { HomeScreen } from '@features/home/screens/HomeScreen';
import { render, screen, fireEvent } from '@test-utils';

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
});
