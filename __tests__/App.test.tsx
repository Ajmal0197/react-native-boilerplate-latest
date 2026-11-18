import React from 'react';
import { render } from '@testing-library/react-native';
import App from '@app/App';
import { useAppStore } from '@store/zustand/useAppStore';

describe('App Root', () => {
  it('renders root application without crashing', async () => {
    const { toJSON } = await render(<App />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders root application in dark mode without crashing', async () => {
    useAppStore.setState({ themeMode: 'dark' });
    const { toJSON } = await render(<App />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders root application in auto mode without crashing', async () => {
    useAppStore.setState({ themeMode: 'auto' });
    const { toJSON } = await render(<App />);
    expect(toJSON()).toBeTruthy();
  });
});
