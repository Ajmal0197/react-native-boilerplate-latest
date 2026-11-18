import type { PhotoItem } from '../types/home.types';
import React from 'react';
import { View, RefreshControl, ActivityIndicator } from 'react-native';
import { LegendList } from '@legendapp/list/react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@components/atoms';
import { PhotoCard } from './PhotoCard';

export interface PhotoListProps {
  photos: PhotoItem[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onPhotoPress?: (photo: PhotoItem) => void;
}

export const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  isLoading,
  isRefreshing,
  isLoadingMore,
  hasMore,
  onRefresh,
  onLoadMore,
  onPhotoPress,
}) => {
  const renderItem = ({ item }: { item: PhotoItem }) => (
    <PhotoCard item={item} onPress={onPhotoPress} />
  );

  const renderFooter = () => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#2563EB" />
      </View>
    );
  };

  return (
    <LegendList
      data={photos}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      estimatedItemSize={48}
      drawDistance={250}
      recycleItems={true}
      contentContainerStyle={styles.listContent}
      onEndReached={() => {
        if (!isLoadingMore && hasMore) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        !isLoading ? (
          <View style={styles.emptyContainer}>
            <Text variant="body" color="#9CA3AF" center>
              No photos found
            </Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create(theme => ({
  listContent: {
    padding: theme.spacing.md,
  },
  footerLoader: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: theme.spacing.xxl,
    alignItems: 'center',
  },
}));
