import type { RootStackParamList } from '@navigation/types';

/**
 * Global Navigation Type Augmentation
 *
 * Allows useNavigation() from @react-navigation/native to infer
 * the RootStackParamList automatically without manual generic typing.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
