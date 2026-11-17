import type { Spec } from '../../specs/NativeAppDeviceInfo';
import { Platform } from 'react-native';

/**
 * JavaScript wrapper around NativeAppDeviceInfo TurboModule
 *
 * Provides safe fallback values for Jest test environments or
 * when running on platforms without the native module linked.
 */
let NativeModule: Spec | null = null;

try {
  NativeModule = require('../../specs/NativeAppDeviceInfo').default;
} catch {
  NativeModule = null;
}

export const NativeDeviceInfo = {
  getDeviceModel: (): string => {
    if (NativeModule?.getDeviceModel) {
      return NativeModule.getDeviceModel();
    }
    return Platform.select({
      ios: 'iPhone Simulator',
      android: 'Android Emulator',
      default: 'Device',
    });
  },

  isEmulator: (): boolean => {
    if (NativeModule?.isEmulator) {
      return NativeModule.isEmulator();
    }
    return true;
  },

  getBatteryLevel: async (): Promise<number> => {
    if (NativeModule?.getBatteryLevel) {
      return await NativeModule.getBatteryLevel();
    }
    return 85; // Mock fallback
  },

  getAppVersion: (): string => {
    if (NativeModule?.getAppVersion) {
      return NativeModule.getAppVersion();
    }
    return '1.0.0';
  },
};
