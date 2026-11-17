const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      ecma: 8,
      keep_classnames: false,
      keep_fnames: false,
      module: true,
      mangle: {
        module: true,
        toplevel: false,
      },
      compress: {
        drop_console: isProduction,
        drop_debugger: true,
        passes: 2,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
