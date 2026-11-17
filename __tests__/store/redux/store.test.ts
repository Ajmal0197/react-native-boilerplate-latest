import {
  clearProducts,
  addProduct,
  Product,
} from '@features/home/store/homeSlice';
import { store, createTestStore } from '@store/redux/store';

describe('Redux store configuration', () => {
  const dummyProduct: Product = {
    id: 'store-test-1',
    title: 'Store Test Monitor',
    price: 399.99,
    category: 'Displays',
    description: 'High-res test monitor',
  };

  it('initializes store with valid default RootState', () => {
    const state = store.getState();
    expect(state).toBeDefined();
    expect(state.home).toBeDefined();
    expect(Array.isArray(state.home.products)).toBe(true);
    expect(state.home.isLoading).toBe(false);
  });

  it('updates state upon dispatching action to the store', () => {
    const testStore = createTestStore();
    testStore.dispatch(clearProducts());
    expect(testStore.getState().home.products).toEqual([]);

    testStore.dispatch(addProduct(dummyProduct));
    expect(testStore.getState().home.products[0]).toEqual(dummyProduct);
  });

  it('allows injecting isolated preloadedState with createTestStore', () => {
    const preloadedState = {
      home: {
        products: [dummyProduct],
        isLoading: true,
        error: 'Initial error',
      },
    };

    const isolatedStore = createTestStore(preloadedState);
    const state = isolatedStore.getState();

    expect(state.home.products).toEqual([dummyProduct]);
    expect(state.home.isLoading).toBe(true);
    expect(state.home.error).toBe('Initial error');
  });

  it('guarantees state isolation across separate store instances', () => {
    const storeA = createTestStore();
    const storeB = createTestStore();

    storeA.dispatch(clearProducts());

    expect(storeA.getState().home.products).toHaveLength(0);
    expect(storeB.getState().home.products.length).toBeGreaterThan(0);
  });
});
