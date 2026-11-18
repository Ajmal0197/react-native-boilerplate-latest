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
import { StyleSheet } from 'react-native-unistyles';

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
        title="Product Details"
        subtitle={`#${productId}`}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card variant="elevated" style={styles.imageCard}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </Card>

        <Spacer size="md" />

        <Card variant="outlined" style={styles.infoCard}>
          <View style={styles.badgeRow}>
            {product?.albumId != null && (
              <View style={styles.albumBadge}>
                <Text variant="caption" weight="bold" color="#2563EB">
                  Album #{product.albumId}
                </Text>
              </View>
            )}
            <View style={styles.idBadge}>
              <Text variant="caption" color="#6B7280">
                Item #{productId}
              </Text>
            </View>
          </View>

          <Spacer size="sm" />

          <Text variant="title" weight="bold">
            {displayTitle}
          </Text>

          <Spacer size="sm" />

          <Text variant="body" color="#4B5563">
            High performance photo item rendered with full details, metadata, and
            react-native-keys environment variables.
          </Text>
        </Card>

        <Spacer size="md" />

        <Card variant="flat" style={styles.metaCard}>
          <Text variant="label" weight="bold">
            Metadata
          </Text>
          <Spacer size="xs" />
          <View style={styles.metaRow}>
            <Text variant="caption" color="#6B7280">
              Identifier:
            </Text>
            <Text variant="caption" weight="medium">
              {productId}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text variant="caption" color="#6B7280">
              Album ID:
            </Text>
            <Text variant="caption" weight="medium">
              {product?.albumId ?? 'N/A'}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text variant="caption" color="#6B7280">
              Status:
            </Text>
            <Text variant="caption" weight="medium" color="#10B981">
              Active
            </Text>
          </View>
        </Card>

        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Spacer size="xs" />
            <Text variant="caption" color="#6B7280">
              Loading latest details...
            </Text>
          </View>
        )}

        {hasError && (
          <View style={styles.errorContainer}>
            <Text variant="caption" color="#DC2626">
              {errorMessage || 'Could not refresh live data. Showing cached parameters.'}
            </Text>
            <Spacer size="xs" />
            <TouchableOpacity onPress={fetchDetail}>
              <Text variant="label" color="#2563EB" weight="bold">
                Tap to retry
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Spacer size="lg" />

        <Button
          title="Back to Products"
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
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  imageCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.lg,
  },
  image: {
    width: '100%',
    height: 260,
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
    backgroundColor: '#DBEAFE',
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
