import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Tracks current App state (active, background, inactive)
 */
export const useAppState = () => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState ?? 'active',
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appState,
    isForeground: appState === 'active',
    isBackground: appState === 'background',
  };
};
