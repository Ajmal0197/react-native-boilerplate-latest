import { createMMKV, type MMKV } from 'react-native-mmkv';
import { Config } from '@config';

/**
 * Storage Service — powered by MMKV
 *
 * Unlike AsyncStorage which is asynchronous and uses SQLite/files, MMKV
 * reads and writes memory-mapped files directly via C++ JSI synchronously.
 * Equivalent to SharedPreferences on Android and UserDefaults on iOS, but 30x faster.
 */
class StorageService {
  private mmkv: MMKV;

  constructor() {
    const encryptionKey = Config.secureFor('MMKV_ENCRYPTION_KEY');
    this.mmkv = createMMKV({
      id: 'app-default-storage',
      ...(encryptionKey ? { encryptionKey } : {}),
    });
  }

  /**
   * Set string value
   */
  set(key: string, value: string): void {
    this.mmkv.set(key, value);
  }

  /**
   * Get string value
   */
  getString(key: string): string | undefined {
    return this.mmkv.getString(key);
  }

  /**
   * Set boolean value
   */
  setBoolean(key: string, value: boolean): void {
    this.mmkv.set(key, value);
  }

  /**
   * Get boolean value
   */
  getBoolean(key: string): boolean | undefined {
    return this.mmkv.getBoolean(key);
  }

  /**
   * Set number value
   */
  setNumber(key: string, value: number): void {
    this.mmkv.set(key, value);
  }

  /**
   * Get number value
   */
  getNumber(key: string): number | undefined {
    return this.mmkv.getNumber(key);
  }

  /**
   * Store any JSON-serializable object
   */
  setObject<T>(key: string, value: T): void {
    this.mmkv.set(key, JSON.stringify(value));
  }

  /**
   * Retrieve parsed object with TypeScript type safety
   */
  getObject<T>(key: string): T | null {
    const raw = this.mmkv.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  /**
   * Delete a specific key
   */
  delete(key: string): boolean {
    return this.mmkv.remove(key);
  }

  /**
   * Wipe all keys from this instance
   */
  clearAll(): void {
    this.mmkv.clearAll();
  }

  /**
   * Get underlying MMKV instance (useful for Zustand persist middleware)
   */
  getInstance(): MMKV {
    return this.mmkv;
  }
}

export const storage = new StorageService();

/**
 * Synchronous MMKV storage adapter for Zustand `persist` middleware
 */
export const zustandStorage = {
  setItem: (name: string, value: string): void => {
    storage.set(name, value);
  },
  getItem: (name: string): string | null => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string): void => {
    storage.delete(name);
  },
};
