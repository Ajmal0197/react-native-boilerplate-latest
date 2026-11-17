import type { PhotoItem } from '../types/home.types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { homeApi } from '../api/homeApi';

export type Product = PhotoItem;

interface HomeState {
  photos: PhotoItem[];
  products: PhotoItem[];
  page: number;
  limit: number;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
}

const initialPhotos: PhotoItem[] = [
  {
    albumId: 1,
    id: '1',
    title: 'Wireless Noise-Canceling Headphones',
    url: 'https://picsum.photos/seed/1/600',
    thumbnailUrl: 'https://picsum.photos/seed/1/150',
  },
  {
    albumId: 1,
    id: '2',
    title: 'Ergonomic Mechanical Keyboard',
    url: 'https://picsum.photos/seed/2/600',
    thumbnailUrl: 'https://picsum.photos/seed/2/150',
  },
  {
    albumId: 1,
    id: '3',
    title: 'Ultra-Wide Curved Monitor 34"',
    url: 'https://picsum.photos/seed/3/600',
    thumbnailUrl: 'https://picsum.photos/seed/3/150',
  },
  {
    albumId: 1,
    id: '4',
    title: 'Smart Fitness Tracker Watch',
    url: 'https://picsum.photos/seed/4/600',
    thumbnailUrl: 'https://picsum.photos/seed/4/150',
  },
  {
    albumId: 1,
    id: '5',
    title: 'MagSafe Wireless Charging Station',
    url: 'https://picsum.photos/seed/5/600',
    thumbnailUrl: 'https://picsum.photos/seed/5/150',
  },
];

const initialState: HomeState = {
  photos: initialPhotos,
  products: initialPhotos,
  page: 1,
  limit: 10,
  isLoading: false,
  isRefreshing: false,
  isLoadingMore: false,
  hasMore: true,
  error: null,
};

/**
 * Async thunk for fetching paginated photos from JSONPlaceholder
 */
export const fetchPhotos = createAsyncThunk<
  { items: PhotoItem[]; page: number; isRefresh: boolean },
  { page?: number; limit?: number; isRefresh?: boolean } | undefined,
  { rejectValue: string }
>('home/fetchPhotos', async (params, { getState, rejectWithValue }) => {
  try {
    const state = (getState() as { home: HomeState }).home;
    const targetPage =
      params?.page ?? (params?.isRefresh ? 1 : (state?.page ?? 1));
    const targetLimit = params?.limit ?? state?.limit ?? 10;

    const items = await homeApi.getPhotos({
      page: targetPage,
      limit: targetLimit,
    });

    return {
      items,
      page: targetPage,
      isRefresh: !!params?.isRefresh,
    };
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Failed to load photos');
  }
});

/**
 * Backward compatibility alias for fetchProducts
 */
export const fetchProducts = fetchPhotos;

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearProducts: state => {
      state.photos = [];
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
    addProduct: (state, action: PayloadAction<PhotoItem>) => {
      state.photos.unshift(action.payload);
      state.products = state.photos;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhotos.pending, (state, action) => {
        const isRefresh = action.meta?.arg?.isRefresh;
        const currentCount =
          state.photos?.length ?? state.products?.length ?? 0;

        if (isRefresh) {
          state.isRefreshing = true;
        } else if (currentCount === 0) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isLoadingMore = false;

        let items: PhotoItem[] = [];
        let page = 1;
        let isRefresh = false;

        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload?.items) {
          items = action.payload.items;
          page = action.payload.page ?? 1;
          isRefresh = !!action.payload.isRefresh;
        }

        if (!state.photos) {
          state.photos = [];
        }

        if (isRefresh || page === 1) {
          state.photos = items;
        } else {
          const existingIds = new Set(state.photos.map(p => String(p.id)));
          const newItems = items.filter(p => !existingIds.has(String(p.id)));
          state.photos.push(...newItems);
        }

        state.products = state.photos;
        state.page = page;
        state.hasMore = items.length >= (state.limit ?? 10);
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isLoadingMore = false;
        state.error = (action.payload as string) || 'Failed to load photos';
      });
  },
});

export const { clearProducts, addProduct } = homeSlice.actions;
export default homeSlice.reducer;
