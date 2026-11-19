import type { PhotoItem } from '../types/home.types';
import type { RootStackScreenProps } from '@navigation/types';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { normalizeApiError } from '@api/errors';
import { Text, Spacer, Button } from '@components/atoms';
import { Card } from '@components/molecules';
import { Header } from '@components/organisms';
import { useApiCancellation } from '@hooks';
import { homeApi } from '../api/homeApi';

export const ProductDetailScreen: React.FC<
  RootStackScreenProps<'ProductDetail'>
> = ({ route, navigation }) => {
  const { productId, title: initialTitle } = route.params;
  const { signal } = useApiCancellation();
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  const [product, setProduct] = useState<PhotoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);
    try {
      const data = await homeApi.getPhotoDetail(productId, signal);
      setProduct(data);
    } catch (error) {
      if (!signal.aborted && !axios.isCancel(error)) {
        const normalized = normalizeApiError(error);
        setErrorMessage(normalized.message);
        setHasError(true);
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [productId, signal]);

  useEffect(() => {
    void fetchDetail();
  }, [fetchDetail]);

  const displayTitle = product?.title || initialTitle;
  const imageUri =
    product?.url ||
    product?.thumbnailUrl ||
    `https://picsum.photos/seed/${productId}/600`;

  return (
    <View style={styles.container}>
      <Header
        title={t('productDetail.title')}
        subtitle={`#${productId}`}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainRow}>
          <View style={styles.mediaColumn}>
            <Card variant="elevated" style={styles.imageCard}>
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
              />
            </Card>
          </View>

          <View style={styles.detailColumn}>
            <Card variant="outlined" style={styles.infoCard}>
              <View style={styles.badgeRow}>
                {product?.albumId != null && (
                  <View style={styles.albumBadge}>
                    <Text variant="caption" weight="bold" tone="primary">
                      {t('home.albumBadge', { id: product.albumId })}
                    </Text>
                  </View>
                )}
                <View style={styles.idBadge}>
                  <Text variant="caption" tone="textSecondary">
                    {t('productDetail.itemBadge', { id: productId })}
                  </Text>
                </View>
              </View>

              <Spacer size="sm" />

              <Text variant="title" weight="bold">
                {displayTitle}
              </Text>

              <Spacer size="sm" />

              <Text variant="body" tone="textSecondary">
                {t('productDetail.description')}
              </Text>
            </Card>

            <Spacer size="md" />

            <Card variant="flat" style={styles.metaCard}>
              <Text variant="label" weight="bold">
                {t('productDetail.metadata')}
              </Text>
              <Spacer size="xs" />
              <View style={styles.metaRow}>
                <Text variant="caption" tone="textSecondary">
                  {t('productDetail.identifier')}
                </Text>
                <Text variant="caption" weight="medium">
                  {productId}
                </Text>
              </View>
              <View style={styles.metaRow}>
                <Text variant="caption" tone="textSecondary">
                  {t('productDetail.albumId')}
                </Text>
                <Text variant="caption" weight="medium">
                  {product?.albumId ?? t('common.na')}
                </Text>
              </View>
              <View style={styles.metaRow}>
                <Text variant="caption" tone="textSecondary">
                  {t('productDetail.status')}
                </Text>
                <Text variant="caption" weight="medium" tone="success">
                  {t('productDetail.active')}
                </Text>
              </View>
            </Card>
          </View>
        </View>

        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Spacer size="xs" />
            <Text variant="caption" tone="textSecondary">
              {t('productDetail.loading')}
            </Text>
          </View>
        )}

        {hasError && (
          <View style={styles.errorContainer}>
            <Text variant="caption" tone="error">
              {errorMessage || t('productDetail.loadError')}
            </Text>
            <Spacer size="xs" />
            <TouchableOpacity onPress={fetchDetail}>
              <Text variant="label" tone="primary" weight="bold">
                {t('productDetail.retry')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Spacer size="lg" />

        <Button
          title={t('productDetail.back')}
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
    paddingBottom: theme.spacing.xxl,
    maxWidth: {
      lg: 1100,
    },
    width: {
      lg: '100%',
    },
    alignSelf: {
      lg: 'center',
    },
  },
  mainRow: {
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    alignItems: {
      lg: 'flex-start',
    },
    gap: theme.spacing.md,
  },
  mediaColumn: {
    flex: {
      lg: 1,
    },
    width: {
      xs: '100%',
    },
  },
  detailColumn: {
    flex: {
      lg: 1,
    },
    width: {
      xs: '100%',
    },
    marginTop: {
      xs: theme.spacing.md,
      lg: 0,
    },
  },
  imageCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.lg,
  },
  image: {
    width: '100%',
    height: {
      xs: 260,
      md: 300,
      lg: 320,
    },
    backgroundColor: theme.colors.surface,
  },
  infoCard: {
    padding: theme.spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
  },
  idBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  metaCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  loaderContainer: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
}));

export default ProductDetailScreen;
