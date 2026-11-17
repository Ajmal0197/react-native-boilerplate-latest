import { useKeyboardAnimation } from 'react-native-keyboard-controller';

/**
 * Returns animated keyboard height and progress using react-native-keyboard-controller
 */
export const useKeyboard = () => {
  return useKeyboardAnimation();
};
