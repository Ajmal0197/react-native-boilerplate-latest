import React from 'react';
import { Button } from '@components/atoms/Button';
import { render, screen, fireEvent } from '@test-utils';

describe('Button Component', () => {
  it('renders title text correctly', async () => {
    await render(<Button title="Submit Action" />);
    expect(screen.getByText('Submit Action')).toBeTruthy();
  });

  it('calls onPress when clicked', async () => {
    const onPressMock = jest.fn();
    await render(<Button title="Click Me" onPress={onPressMock} />);

    await fireEvent.press(screen.getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('disables interactions when disabled=true', async () => {
    const onPressMock = jest.fn();
    await render(<Button title="Disabled" disabled onPress={onPressMock} />);

    await fireEvent.press(screen.getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
