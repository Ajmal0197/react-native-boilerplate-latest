import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RNToast, {
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
  AlertCircleIcon,
  CheckIcon,
  AlertTriangleIcon,
  InfoIcon,
  CloseIcon,
} from '@assets/svgs/Icons';

export type ToastType = 'error' | 'success' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  bottomOffset?: number;
  onDismiss?: () => void;
  onPress?: () => void;
}

const TOAST_COLORS = {
  error: {
    accent: '#EF4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.35)',
    defaultTitle: 'Something Went Wrong',
  },
  success: {
    accent: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.35)',
    defaultTitle: 'Success',
  },
  warning: {
    accent: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.35)',
    defaultTitle: 'Warning',
  },
  info: {
    accent: '#3B82F6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.35)',
    defaultTitle: 'Information',
  },
};

interface CustomToastCardProps {
  type: ToastType;
  text1?: string;
  text2?: string;
  onPress?: () => void;
  onHide?: () => void;
}

/**
 * Native-looking Floating Bottom Toast Card
 *
 * Designed with a floating pill/capsule HUD aesthetic.
 * Automatically accounts for Android on-screen navigation buttons (3-button / gesture bar)
 * and iOS home indicators using safe area insets.
 */
export const CustomToastCard: React.FC<CustomToastCardProps> = ({
  type = 'error',
  text1,
  text2,
  onPress,
  onHide,
}) => {
  const { theme } = useUnistyles();
  const config = TOAST_COLORS[type] || TOAST_COLORS.error;
  const displayTitle = text1 || config.defaultTitle;

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon size={20} color={config.accent} />;
      case 'warning':
        return <AlertTriangleIcon size={20} color={config.accent} />;
      case 'info':
        return <InfoIcon size={20} color={config.accent} />;
      case 'error':
      default:
        return <AlertCircleIcon size={20} color={config.accent} />;
    }
  };

  return (
    <View style={styles.wrapper} testID="toast-card-wrapper">
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface,
            borderColor: config.border,
          },
        ]}
        testID={`toast-container-${type}`}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress || onHide}
          style={styles.contentRow}
          testID="toast-card"
        >
          {/* Status Badge Icon */}
          <View
            style={[styles.iconBadge, { backgroundColor: config.badgeBg }]}
            testID="toast-icon-badge"
          >
            {renderIcon()}
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            {displayTitle ? (
              <Text
                numberOfLines={1}
                style={[styles.title, { color: theme.colors.text }]}
                testID="toast-title"
              >
                {displayTitle}
              </Text>
            ) : null}
            {text2 ? (
              <Text
                numberOfLines={3}
                style={[styles.message, { color: theme.colors.textSecondary }]}
                testID="toast-message"
              >
                {text2}
              </Text>
            ) : null}
          </View>

          {/* Close Button */}
          <TouchableOpacity
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={onHide}
            style={styles.closeButton}
            testID="toast-close-button"
          >
            <CloseIcon size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * ToastConfig for react-native-toast-message
 */
export const toastConfig: ToastConfig = {
  error: ({ text1, text2, onPress, hide }: ToastConfigParams<unknown>) => (
    <CustomToastCard
      type="error"
      text1={text1}
      text2={text2}
      onPress={onPress}
      onHide={hide}
    />
  ),
  success: ({ text1, text2, onPress, hide }: ToastConfigParams<unknown>) => (
    <CustomToastCard
      type="success"
      text1={text1}
      text2={text2}
      onPress={onPress}
      onHide={hide}
    />
  ),
  warning: ({ text1, text2, onPress, hide }: ToastConfigParams<unknown>) => (
    <CustomToastCard
      type="warning"
      text1={text1}
      text2={text2}
      onPress={onPress}
      onHide={hide}
    />
  ),
  info: ({ text1, text2, onPress, hide }: ToastConfigParams<unknown>) => (
    <CustomToastCard
      type="info"
      text1={text1}
      text2={text2}
      onPress={onPress}
      onHide={hide}
    />
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    width: '92%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
    overflow: 'hidden',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  message: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '400',
  },
  closeButton: {
    padding: 6,
    marginLeft: 8,
    alignSelf: 'center',
  },
});

/**
 * Toast Static Controller
 *
 * Imperative global toast service powered by `react-native-toast-message`.
 * Defaults to bottom placement with automatic clearance above Android's
 * on-screen navigation bar and iOS home indicator.
 */
export class Toast {
  /**
   * Show a bottom-placed native toast
   */
  static show(options: ToastOptions): void {
    const type = options.type || 'error';
    const config = TOAST_COLORS[type] || TOAST_COLORS.error;
    const title = options.title ?? config.defaultTitle;

    RNToast.show({
      type,
      text1: title,
      text2: options.message,
      position: options.position || 'bottom',
      visibilityTime: options.duration || 3500,
      autoHide: true,
      // Default bottom offset safely clearing Android on-screen navigation bar (~48-60dp)
      bottomOffset: options.bottomOffset ?? (Platform.OS === 'android' ? 56 : 40),
      onPress: options.onPress,
      onHide: options.onDismiss,
    });
  }

  /**
   * Helper to show an error toast
   */
  static error(
    message: string,
    title: string = 'Network Error',
    duration: number = 4000,
  ): void {
    this.show({ type: 'error', title, message, duration });
  }

  /**
   * Helper to show a success toast
   */
  static success(
    message: string,
    title: string = 'Success',
    duration: number = 3000,
  ): void {
    this.show({ type: 'success', title, message, duration });
  }

  /**
   * Helper to show a warning toast
   */
  static warning(
    message: string,
    title: string = 'Warning',
    duration: number = 3500,
  ): void {
    this.show({ type: 'warning', title, message, duration });
  }

  /**
   * Helper to show an informational toast
   */
  static info(
    message: string,
    title: string = 'Information',
    duration: number = 3000,
  ): void {
    this.show({ type: 'info', title, message, duration });
  }

  /**
   * Dismiss the currently active toast immediately
   */
  static hide(): void {
    RNToast.hide();
  }
}

export default Toast;
