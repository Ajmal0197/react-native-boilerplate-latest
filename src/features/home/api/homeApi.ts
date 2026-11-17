import type { PhotoItem, FetchPhotosParams } from '../types/home.types';
import { apiClient } from '@api/client';
import { API_ENDPOINTS } from '@config/constants';

export const homeApi = {
  /**
   * Fetch paginated photos from JSONPlaceholder
   */
  getPhotos: async ({
    page = 1,
    limit = 10,
  }: FetchPhotosParams): Promise<PhotoItem[]> => {
    const response = await apiClient.get<PhotoItem[]>(
      API_ENDPOINTS.PHOTOS.LIST,
      {
        params: {
          _page: page,
          _limit: limit,
        },
      },
    );
    return response.data;
  },

  /**
   * Fetch a single photo by id
   */
  getPhotoDetail: async (id: number | string): Promise<PhotoItem> => {
    const response = await apiClient.get<PhotoItem>(
      API_ENDPOINTS.PHOTOS.DETAIL(id),
    );
    return response.data;
  },
};

export default homeApi;
