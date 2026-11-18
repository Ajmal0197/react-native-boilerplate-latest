import type { PhotoItem, FetchPhotosParams } from '../types/home.types';
import { apiClient } from '@api/client';
import { API_ENDPOINTS } from '@api/endpoints';

export const homeApi = {
  /**
   * Fetch paginated photos from JSONPlaceholder
   */
  getPhotos: async (
    { page = 1, limit = 10 }: FetchPhotosParams,
    signal?: AbortSignal,
  ): Promise<PhotoItem[]> => {
    const response = await apiClient.get<PhotoItem[]>(
      API_ENDPOINTS.PHOTOS.LIST,
      {
        params: {
          _page: page,
          _limit: limit,
        },
        signal,
      },
    );
    return response.data;
  },

  /**
   * Fetch a single photo by id
   */
  getPhotoDetail: async (
    id: number | string,
    signal?: AbortSignal,
  ): Promise<PhotoItem> => {
    const response = await apiClient.get<PhotoItem>(
      API_ENDPOINTS.PHOTOS.DETAIL(id),
      { signal },
    );
    return response.data;
  },
};

export default homeApi;
