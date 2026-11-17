const Config = {
  APP_NAME: 'RNBoilerplate',
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  APP_ENV: 'development',
  ENABLE_DEV_TOOLS: 'true',
  BUNDLE_ID: 'com.rn_boilerplate_latest',
  PACKAGE_ID: 'com.rn_boilerplate_latest',
  TIMEOUT_MS: '15000',
};

module.exports = {
  ...Config,
  Config,
  default: Config,
};
