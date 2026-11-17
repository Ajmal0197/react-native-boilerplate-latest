import type { PhotoItem } from '../types/home.types';
import React from 'react';
import { PhotoList } from './PhotoList';

export interface ProductListProps {
  products: PhotoItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onProductPress?: (product: PhotoItem) => void;
  isRefreshing?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onRefresh,
  onProductPress,
  isRefreshing = false,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore = () => {},
}) => {
  return (
    <PhotoList
      photos={products}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      onPhotoPress={onProductPress}
    />
  );
};

export default ProductList;
