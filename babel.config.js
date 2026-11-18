module.exports = function (api) {
  const isProd = api.env('production');

  const plugins = [
    // 1. Unistyles — compile-time style extraction (MUST be the FIRST plugin)
    ['react-native-unistyles/plugin', { root: 'src' }],

    // 2. Module Resolver — clean imports via @ aliases
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@locales': './src/locales',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@store': './src/store',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@api': './src/api',
          '@assets': './src/assets',
          '@native': './src/native',
          '@appTypes': './src/types',
          '@config': './src/config',
          '@test-utils': './__tests__/test-utils',
        },
      },
    ],
  ];

  // 3. Remove console logs in production builds (preserves error & warn)
  if (isProd) {
    plugins.push([
      'transform-remove-console',
      {
        exclude: ['error', 'warn'],
      },
    ]);
  }

  // 4. Reanimated plugin (MUST be the LAST plugin in the array)
  plugins.push('react-native-reanimated/plugin');

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins,
  };
};
