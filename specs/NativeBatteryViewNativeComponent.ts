import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type {
  Double,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

/**
 * Fabric Component TypeScript Specification
 *
 * Codegen reads this spec during build-time to generate C++ ShadowNode
 * descriptors and native component scaffolding for Android & iOS.
 */
export interface NativeProps extends ViewProps {
  /**
   * Battery level percentage from 0.0 to 1.0
   */
  level?: WithDefault<Double, 1.0>;

  /**
   * Whether the battery is currently charging
   */
  isCharging?: boolean;

  /**
   * Primary fill color for battery indicator
   */
  fillColor?: string;
}

export default codegenNativeComponent<NativeProps>(
  'NativeBatteryView',
) as HostComponent<NativeProps>;
