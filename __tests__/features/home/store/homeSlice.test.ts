import { homeApi } from '@features/home/api/homeApi';
import homeReducer, {
  clearProducts,
  addProduct,
  fetchProducts,
  Product,
} from '@features/home/store/homeSlice';
import { createTestStore } from '@store/redux/store';

describe('homeSlice reducer', () => {
  const sampleProduct: Product = {
    albumId: 1,
    id: 'test-99',
    title: 'New Gadget',
    url: 'https://picsum.photos/seed/test-99/600',
    thumbnailUrl: 'https://picsum.photos/seed/test-99/150',
  };

  it('returns default initial state with products', () => {
    const state = homeReducer(undefined, { type: 'unknown' });
    expect(state.products.length).toBeGreaterThan(0);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('clears products array on clearProducts', () => {
    const state = homeReducer(undefined, clearProducts());
    expect(state.products).toHaveLength(0);
  });

  it('adds product to top of list on addProduct', () => {
    const state = homeReducer(undefined, addProduct(sampleProduct));
    expect(state.products[0]).toEqual(sampleProduct);
  });

  it('sets isLoading to true and clears error on fetchProducts.pending', () => {
    const previousState = {
      photos: [],
      products: [],
      page: 1,
      limit: 10,
      isLoading: false,
      isRefreshing: false,
      isLoadingMore: false,
      hasMore: true,
      error: 'Previous error message',
    };
    const state = homeReducer(previousState, {
      type: fetchProducts.pending.type,
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('populates products and sets isLoading to false on fetchProducts.fulfilled', () => {
    const products = [sampleProduct];
    const state = homeReducer(
      {
        photos: [],
        products: [],
        page: 1,
        limit: 10,
        isLoading: true,
        isRefreshing: false,
        isLoadingMore: false,
        hasMore: true,
        error: null,
      },
      { type: fetchProducts.fulfilled.type, payload: products },
    );
    expect(state.isLoading).toBe(false);
    expect(state.products).toEqual(products);
    expect(state.error).toBeNull();
  });

  it('sets error and resets isLoading on fetchProducts.rejected', () => {
    const errorMessage = 'Network timeout';
    const state = homeReducer(
      {
        photos: [],
        products: [],
        page: 1,
        limit: 10,
        isLoading: true,
        isRefreshing: false,
        isLoadingMore: false,
        hasMore: true,
        error: null,
      },
      { type: fetchProducts.rejected.type, payload: errorMessage },
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('executes fetchProducts async thunk successfully in store', async () => {
    const getPhotosSpy = jest
      .spyOn(homeApi, 'getPhotos')
      .mockResolvedValue([sampleProduct]);

    const store = createTestStore({
      home: {
        photos: [],
        products: [],
        page: 1,
        limit: 10,
        isLoading: false,
        isRefreshing: false,
        isLoadingMore: false,
        hasMore: true,
        error: null,
      },
    });

    const promise = store.dispatch(fetchProducts());
    expect(store.getState().home.isLoading).toBe(true);

    await promise;

    const state = store.getState().home;
    expect(state.isLoading).toBe(false);
    expect(state.products.length).toBeGreaterThan(0);
    expect(state.error).toBeNull();
    getPhotosSpy.mockRestore();
  });
});
