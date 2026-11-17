import React from 'react';
import { render } from '@testing-library/react-native';
import App from '@app/App';

describe('App Root', () => {
  it('renders root application without crashing', async () => {
    const { toJSON } = await render(<App />);
    expect(toJSON()).toBeTruthy();
  });
});
