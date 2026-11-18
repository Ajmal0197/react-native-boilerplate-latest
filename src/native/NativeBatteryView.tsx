import type { NativeProps } from '../../specs/NativeBatteryViewNativeComponent';
import React from 'react';
import { View, ViewProps, type HostComponent } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export interface BatteryViewProps extends ViewProps {
  level: number;
  isCharging?: boolean;
  fillColor?: string;
}

let FabricBatteryView: HostComponent<NativeProps> | null = null;

try {
  FabricBatteryView =
    require('../../specs/NativeBatteryViewNativeComponent').default;
} catch {
  FabricBatteryView = null;
}

/**
 * Fabric Native Component Wrapper
 *
 * Renders the native C++ ShadowNode battery indicator on New Architecture,
 * falling back to a pure JS representation if running in test/unsupported environments.
 */
export const NativeBatteryView: React.FC<BatteryViewProps> = ({
  level,
  isCharging = false,
  fillColor,
  style,
  ...props
}) => {
  const { theme } = useUnistyles();
  const resolvedFillColor = fillColor ?? theme.colors.success;

  if (FabricBatteryView) {
    return (
      <FabricBatteryView
        level={level}
        isCharging={isCharging}
        fillColor={resolvedFillColor}
        style={style}
        {...props}
      />
    );
  }

  const fillWidth = `${Math.min(Math.max(level * 100, 0), 100)}%` as const;

  // Fallback representation for tests or legacy runtime
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.fill(fillWidth, resolvedFillColor)} />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    width: 48,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.textMuted,
    borderRadius: theme.borderRadius.xs,
    padding: theme.spacing.xxs,
    justifyContent: 'center',
  },
  fill: (width: `${number}%`, backgroundColor: string) => ({
    width,
    height: '100%',
    borderRadius: theme.spacing.xxs,
    backgroundColor,
  }),
}));
