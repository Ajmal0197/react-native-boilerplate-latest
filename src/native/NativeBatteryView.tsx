import type { NativeProps } from '../../specs/NativeBatteryViewNativeComponent';
import React from 'react';
import { View, ViewProps, StyleSheet, type HostComponent } from 'react-native';

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
  fillColor = '#34C759',
  style,
  ...props
}) => {
  if (FabricBatteryView) {
    return (
      <FabricBatteryView
        level={level}
        isCharging={isCharging}
        fillColor={fillColor}
        style={style}
        {...props}
      />
    );
  }

  const fillWidth = `${Math.min(Math.max(level * 100, 0), 100)}%` as const;

  // Fallback representation for tests or legacy runtime
  return (
    <View style={[styles.container, style]} {...props}>
      <View
        style={[
          styles.fill,
          {
            width: fillWidth,
            backgroundColor: fillColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 24,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 4,
    padding: 2,
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
