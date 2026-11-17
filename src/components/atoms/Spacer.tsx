import React from 'react';
import { View } from 'react-native';
import { spacing } from '@theme/spacing';

export interface SpacerProps {
  size?: keyof typeof spacing;
  horizontal?: boolean;
}

/**
 * Spacer Atom for clean, consistent whitespace
 */
export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  horizontal = false,
}) => {
  const dimension = spacing[size];

  return (
    <View
      style={{
        width: horizontal ? dimension : undefined,
        height: !horizontal ? dimension : undefined,
      }}
    />
  );
};
