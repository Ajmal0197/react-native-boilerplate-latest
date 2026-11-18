import type { TabScreenProps } from '@navigation/types';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Input, Text, Spacer } from '@components/atoms';

import { Header } from '@components/organisms';
import { AppConstant } from '@config';
import { useDebounce } from '@hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@store/redux/hooks';
import { PhotoList } from '../components/PhotoList';
import { fetchPhotos } from '../store/homeSlice';

export const HomeScreen = ({ navigation }: TabScreenProps<'Home'>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { photos, page, isLoading, isRefreshing, isLoadingMore, hasMore } =
    useAppSelector(state => state.home);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    AppConstant.setCurrentHomeScreenPageId(page);
  }, [page]);

  useEffect(() => {
    const promise = dispatch(fetchPhotos({ page: 1 }));
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const handleRefresh = () => {
    void dispatch(fetchPhotos({ page: 1, isRefresh: true }));
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      void dispatch(fetchPhotos({ page: page + 1 }));
    }
  };

  const filteredPhotos = photos.filter(
    photo =>
      photo.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      String(photo.albumId).includes(debouncedSearch),
  );

  return (
    <View style={styles.container}>
      <Header
        title={t('home.title')}
        subtitle={t('home.subtitle')}
        rightElement={
          <Text variant="caption" color="#888888">
            v{AppConstant.appVersion}
          </Text>
        }
      />

      <View style={styles.searchContainer}>
        <Input
          placeholder={t('home.searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        <Spacer size="xs" />
        <TouchableOpacity
          style={styles.labCard}
          onPress={() => navigation.navigate('TabViewDemo')}
          testID="btn-navigate-features-lab"
        >
          <Text variant="caption" weight="bold">
            🚀 Features Lab: Tab View • Bottom Sheets • Bottom Toast ›
          </Text>
        </TouchableOpacity>
      </View>

      <PhotoList
        photos={filteredPhotos}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        onPhotoPress={photo => {
          navigation.navigate('ProductDetail', {
            productId: String(photo.id),
            title: photo.title,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  labCard: {
    backgroundColor: 'rgba(0, 102, 255, 0.08)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
}));

export default HomeScreen;
