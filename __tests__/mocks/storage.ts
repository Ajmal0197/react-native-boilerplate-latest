const store = new Map<string, any>();

export const mockMMKV = {
  set: jest.fn((key: string, val: any) => store.set(key, val)),
  getString: jest.fn((key: string) => store.get(key)),
  getBoolean: jest.fn((key: string) => store.get(key)),
  getNumber: jest.fn((key: string) => store.get(key)),
  delete: jest.fn((key: string) => store.delete(key)),
  clearAll: jest.fn(() => store.clear()),
};
