import reactotronZustand from 'reactotron-plugin-zustand';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { useAppStore } from './src/store/zustand/useAppStore';
import { useAuthStore } from './src/store/zustand/useAuthStore';

/**
 * Reactotron Debugging Configuration
 *
 * Provides timeline monitoring, Redux action dispatch inspection,
 * Zustand state snapshots, and network request monitoring in development.
 */
const reactotron = Reactotron.configure({
  name: 'RNBoilerplate',
})
  .useReactNative({
    asyncStorage: false, // We use MMKV instead
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    overlay: false,
  })
  .use(reactotronRedux())
  .use(
    reactotronZustand({
      stores: [
        { name: 'authStore', store: useAuthStore },
        { name: 'appStore', store: useAppStore },
      ],
      omitFunctionKeys: true,
    }),
  )
  .connect();

export default reactotron;
