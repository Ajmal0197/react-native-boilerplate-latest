import React from 'react';
import { Text } from '@components/atoms/Text';
import { render, screen } from '@test-utils';

describe('Text Component', () => {
  it('renders children correctly', async () => {
    await render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('renders display variant without crashing', async () => {
    await render(<Text variant="display">Large Title</Text>);
    expect(screen.getByText('Large Title')).toBeTruthy();
  });
});
