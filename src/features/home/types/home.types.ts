/**
 * Item interface matching JSONPlaceholder /photos schema with optional product fields
 */
export interface PhotoItem {
  id: number | string;
  title: string;
  albumId?: number;
  url?: string;
  thumbnailUrl?: string;
  price?: number;
  category?: string;
  description?: string;
}

export interface FetchPhotosParams {
  page?: number;
  limit?: number;
  isRefresh?: boolean;
}
