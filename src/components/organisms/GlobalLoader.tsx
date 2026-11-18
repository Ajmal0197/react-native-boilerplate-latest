import React, { useEffect } from 'react';
import { View, ActivityIndicator, BackHandler } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Spacer, Text } from '@components/atoms';

export interface LoadingOverlayProps {
  message?: string;
}

/**
 * Fullscreen loading overlay rendered into RootSiblings.
 * Intercepts and blocks the hardware back button while visible.
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  const { theme } = useUnistyles();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.backdrop} testID="global-loader-backdrop">
      <View style={styles.card} testID="global-loader-card">
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          testID="global-loader-spinner"
        />
        {message ? (
          <>
            <Spacer size="sm" />
            <Text
              variant="body"
              weight="medium"
              center
              testID="global-loader-message"
            >
              {message}
            </Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    zIndex: 9999,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    minWidth: 140,
    maxWidth: 280,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
}));

/**
 * GlobalLoader
 *
 * Industry-standard imperative loader overlay powered by `react-native-root-siblings`.
 * Accessible anywhere (screens, thunks, interceptors, services) without requiring
 * context passing or being nested in screen JSX.
 *
 * Includes built-in reference counting so multiple concurrent async operations
 * do not dismiss the loader prematurely.
 */
export class GlobalLoader {
  private static sibling: RootSiblings | null = null;
  private static count: number = 0;

  /**
   * Show global loader with optional message.
   * Increments reference count.
   */
  static show(message?: string): void {
    this.count++;
    if (this.sibling) {
      this.sibling.update(<LoadingOverlay message={message} />);
      return;
    }
    this.sibling = new RootSiblings(<LoadingOverlay message={message} />);
  }

  /**
   * Hide global loader.
   * Decrements reference count and dismisses overlay when count reaches 0.
   * @param force If true, immediately closes regardless of reference count.
   */
  static hide(force: boolean = false): void {
    if (this.count > 0) {
      this.count--;
    }
    if (force || this.count === 0) {
      this.count = 0;
      if (this.sibling) {
        this.sibling.destroy();
        this.sibling = null;
      }
    }
  }

  /**
   * Check if loader is currently visible.
   */
  static isVisible(): boolean {
    return this.sibling !== null;
  }

  /**
   * Force reset and dismiss loader immediately.
   */
  static reset(): void {
    this.count = 0;
    if (this.sibling) {
      this.sibling.destroy();
      this.sibling = null;
    }
  }
}

export default GlobalLoader;
