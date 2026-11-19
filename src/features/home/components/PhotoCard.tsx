import type { PhotoItem } from '../types/home.types';
import React from 'react';
import { View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Text, Spacer } from '@components/atoms';
import { Card } from '@components/molecules';

export interface PhotoCardProps {
  item: PhotoItem;
  onPress?: (item: PhotoItem) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ item, onPress }) => {
  const { t } = useTranslation();
  const imageUri =
    item.thumbnailUrl ||
    item.url ||
    `https://picsum.photos/seed/${item.id}/150`;

  return (
    <Card
      variant="elevated"
      style={styles.card}
      onTouchEnd={() => onPress?.(item)}
    >
      <View style={styles.contentRow}>
        <Image
          source={{ uri: imageUri }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        <View style={styles.textContainer}>
          <View style={styles.badgeRow}>
            {item.albumId != null && (
              <View style={styles.albumBadge}>
                <Text variant="caption" weight="bold" tone="primary">
                  {t('home.albumBadge', { id: item.albumId })}
                </Text>
              </View>
            )}
            <View style={styles.idBadge}>
              <Text variant="caption" tone="textSecondary">
                #{item.id}
              </Text>
            </View>
          </View>

          <Spacer size="xs" />

          <Text variant="body" weight="medium" numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.sm,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: {
      xs: 72,
      fold: 80,
      md: 88,
    },
    height: {
      xs: 72,
      fold: 80,
      md: 88,
    },
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  textContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
    justifyContent: 'center',
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
}));
