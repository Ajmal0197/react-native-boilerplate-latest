import React from 'react';
import { View } from 'react-native';
import { act } from 'react-test-renderer';
import {
  GlobalLoader,
  LoadingOverlay,
} from '@components/organisms/GlobalLoader';
import { AppConstant } from '@config';
import { render, screen } from '@test-utils';

const waitTick = async () => {
  await act(async () => {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 50);
    });
  });
};

describe('GlobalLoader', () => {
  beforeEach(async () => {
    AppConstant.reset();
    GlobalLoader.reset();
    await waitTick();
  });

  afterEach(async () => {
    GlobalLoader.reset();
    await waitTick();
  });

  it('renders LoadingOverlay standalone correctly with message', async () => {
    await render(<LoadingOverlay message="Please wait..." />);
    expect(screen.getByTestId('global-loader-backdrop')).toBeTruthy();
    expect(screen.getByTestId('global-loader-spinner')).toBeTruthy();
    expect(screen.getByText('Please wait...')).toBeTruthy();
  });

  it('is not visible when loader is hidden', async () => {
    await render(<View />);
    expect(GlobalLoader.isVisible()).toBe(false);
    expect(screen.queryByTestId('global-loader-backdrop')).toBeNull();
  });

  it('renders root sibling and spinner when AppConstant.showLoader() is called', async () => {
    await render(<View />);

    AppConstant.showLoader('Loading test data...');
    await waitTick();

    expect(GlobalLoader.isVisible()).toBe(true);
    expect(AppConstant.isLoading()).toBe(true);
    expect(screen.getByTestId('global-loader-backdrop')).toBeTruthy();
    expect(screen.getByTestId('global-loader-spinner')).toBeTruthy();
    expect(screen.getByText('Loading test data...')).toBeTruthy();
  });

  it('hides root sibling when AppConstant.hideLoader() is called', async () => {
    await render(<View />);

    AppConstant.showLoader('Processing...');
    await waitTick();

    expect(GlobalLoader.isVisible()).toBe(true);
    expect(screen.getByTestId('global-loader-backdrop')).toBeTruthy();

    AppConstant.hideLoader();
    await waitTick();

    expect(GlobalLoader.isVisible()).toBe(false);
    expect(AppConstant.isLoading()).toBe(false);
    expect(screen.queryByTestId('global-loader-backdrop')).toBeNull();
  });

  it('supports reference counting for concurrent loaders', async () => {
    await render(<View />);

    // First operation triggers loader
    GlobalLoader.show('Task 1');
    await waitTick();
    expect(GlobalLoader.isVisible()).toBe(true);

    // Second operation triggers loader
    GlobalLoader.show('Task 2');
    await waitTick();
    expect(GlobalLoader.isVisible()).toBe(true);

    // First operation finishes -> loader should remain visible
    GlobalLoader.hide();
    await waitTick();
    expect(GlobalLoader.isVisible()).toBe(true);

    // Second operation finishes -> loader should dismiss
    GlobalLoader.hide();
    await waitTick();
    expect(GlobalLoader.isVisible()).toBe(false);
  });

  it('force hide immediately dismisses despite active reference count', async () => {
    await render(<View />);

    GlobalLoader.show('Task 1');
    GlobalLoader.show('Task 2');
    await waitTick();
    expect(GlobalLoader.isVisible()).toBe(true);

    GlobalLoader.hide(true);
    await waitTick();
    expect(GlobalLoader.isVisible()).toBe(false);
  });

  it('can be controlled directly via GlobalLoader.show() and hide()', async () => {
    await render(<View />);

    GlobalLoader.show('Direct loader message');
    await waitTick();

    expect(GlobalLoader.isVisible()).toBe(true);
    expect(screen.getByTestId('global-loader-backdrop')).toBeTruthy();
    expect(screen.getByText('Direct loader message')).toBeTruthy();

    GlobalLoader.hide();
    await waitTick();

    expect(GlobalLoader.isVisible()).toBe(false);
    expect(screen.queryByTestId('global-loader-backdrop')).toBeNull();
  });
});
