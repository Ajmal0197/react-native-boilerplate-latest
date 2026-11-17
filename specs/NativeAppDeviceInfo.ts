import {
  TurboModuleRegistry,
  type TurboModule,
} from 'react-native';

/**
 * TurboModule TypeScript Specification
 *
 * Codegen reads this spec during build-time to generate C++ JSI bindings
 * for Android and iOS. This replaces the legacy Bridge (@ReactMethod) with
 * zero-overhead synchronous/asynchronous calls.
 */
export interface Spec extends TurboModule {
  /**
   * Returns device model name (e.g., iPhone 15 Pro, Pixel 8)
   */
  getDeviceModel(): string;

  /**
   * Returns current battery percentage (0 to 100) or -1 if unavailable
   */
  getBatteryLevel(): Promise<number>;

  /**
   * Synchronously checks if device is running in an emulator/simulator
   */
  isEmulator(): boolean;

  /**
   * Returns current app version name
   */
  getAppVersion(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeAppDeviceInfo');
