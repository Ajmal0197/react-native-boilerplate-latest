# React Native Production Boilerplate

A starter app for React Native **0.88.1** and React **19.3.0**. The New Architecture (Fabric and TurboModules) is on. TypeScript is strict. Clone it, run it, then replace the sample features with your product.

This README tells you what is already in the box, where each piece lives, and how to run it. Native build internals and TurboModule walkthroughs are in [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md). Team workflow is in [CONTRIBUTING.md](./CONTRIBUTING.md). For a full inventory of libraries, ESLint rules, tests, SonarQube, and CI, see the [dev.to walkthrough](https://dev.to/ajmal_hasan/everything-inside-rn-boilerplate-latest-libraries-lint-rules-tests-sonar-and-ci-a-full-46dc).

<p>
  <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React%20Native-0.88.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native 0.88.1" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.3.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19.3.0" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 6" /></a>
  <a href="https://reactnative.dev/docs/the-new-architecture/landing-page"><img src="https://img.shields.io/badge/New%20Architecture-Enabled-success?style=flat-square" alt="New Architecture" /></a>
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Tests-33%20suites%20%2F%20128%20tests-brightgreen?style=flat-square&logo=jest" alt="33 suites, 128 tests" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT License" /></a>
</p>

<p align="center">
  <img src="./docs/assets/demo.gif" alt="App walkthrough" width="280" />
  <br />
  <a href="./docs/assets/demo.mov">Watch the demo video</a>
</p>

---

## What you see when the app opens

Login is required. `USE_MOCK_API` is `"true"` in `keys.example.json`, so login and register succeed offline with a fake user. Set it to `"false"` when you have a real auth API.

After login, three tabs:

| Tab      | Screen                | What it shows                                                                               |
| :------- | :-------------------- | :------------------------------------------------------------------------------------------ |
| Home     | `HomeScreen`          | Searchable photo list (JSONPlaceholder) in a `LegendList`, plus a link to the Features Lab  |
| Alerts   | `NotificationsScreen` | Local notifications through Notifee                                                         |
| Settings | `SettingsScreen`      | Signed-in user, light / dark / auto theme, language, device info from a TurboModule, logout |

Screens pushed on top of the tabs:

| Screen                           | Opened from                     | What it shows                                                                        |
| :------------------------------- | :------------------------------ | :----------------------------------------------------------------------------------- |
| `LoginScreen` / `RegisterScreen` | App launch while logged out     | Forms (React Hook Form + Yup). Errors are translated.                                |
| `ProductDetailScreen`            | A photo on Home                 | One item, with its own route                                                         |
| `LanguageSelectScreen`           | Settings → Language             | English, Spanish, Arabic. Arabic turns on RTL and restarts the app.                  |
| `TabViewDemoScreen`              | Home or Settings → Features Lab | Live samples: stacked sheets, keyboard sheet, toasts, network errors, request cancel |

Non-production builds also mount `BugBubble` (`@lokal-dev/react-native-bugbubble`) so you can inspect network, console, and analytics logs inside the app. Production builds do not render it.

---

## What is included

| Job                 | What we use                                                                                                                        | Where to look                                                            |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| UI styling          | Unistyles v3. Styles read `theme.colors` and `theme.spacing`. Light, dark, and system theme.                                       | `src/theme/`                                                             |
| Navigation          | React Navigation 7. Native stack + bottom tabs. Typed params. Deep links.                                                          | `src/navigation/`                                                        |
| Server state        | Redux Toolkit. The photo list is the sample slice.                                                                                 | `src/store/redux/`, `src/features/home/store/`                           |
| UI and auth state   | Zustand. Auth session and theme mode.                                                                                              | `src/store/zustand/`                                                     |
| HTTP                | Axios. One client, typed endpoints, `normalizeApiError`, silent flag, 401 refresh that logs out on failure.                        | `src/api/`                                                               |
| Forms               | React Hook Form + Yup. Messages come from i18n.                                                                                    | `src/features/auth/validation/`                                          |
| Copy                | i18next. English, Spanish, Arabic. No raw strings in JSX.                                                                          | `src/locales/`                                                           |
| Key-value storage   | MMKV through `@services/storage`. AsyncStorage is not used.                                                                        | `src/services/storage.ts`                                                |
| Secrets and env     | `react-native-keys`. Separate files for development, staging, and production.                                                      | `keys.example.json`, `src/config/env.ts`                                 |
| Lists               | `@legendapp/list` (`LegendList`) for the photo feed.                                                                               | `src/features/home/components/PhotoList.tsx`                             |
| Sheets and keyboard | Software Mansion bottom sheet + `react-native-keyboard-controller`.                                                                | `src/components/organisms/`                                              |
| Toasts and loader   | `react-native-toast-message` and a root-sibling loader. Call them from anywhere.                                                   | `src/components/organisms/`, `src/services/AppConstant.ts`               |
| Notifications       | Notifee.                                                                                                                           | `src/features/notifications/`                                            |
| Native modules      | Codegen specs: device info and a sample battery view.                                                                              | `specs/`, `src/native/`                                                  |
| Crash reports       | A small facade. Plug in Sentry or Crashlytics with `setCrashReporter`. Until then it is a no-op. Wired to the root error boundary. | `src/services/crashReporting.ts`                                         |
| Tests               | Jest and React Native Testing Library. 33 suites, 128 tests. Coverage thresholds are enforced.                                     | `__tests__/`, `jest.config.js`                                           |
| Code quality scan   | Local SonarQube community server. Host scanner via `@sonar/scan`.                                                                  | `docker-compose.yml`, `sonar-project.properties`                         |
| CI and git hooks    | One script for every host. GitHub Actions and GitLab CI both call it. Husky, lint-staged, commitlint (Conventional Commits).       | `scripts/ci.sh`, `.github/workflows/ci.yml`, `.gitlab-ci.yml`, `.husky/` |

---

## How the folders are meant to be used

New product code goes in `src/features/<feature-name>/`. A feature can contain `api/`, `components/`, `hooks/`, `screens/`, `store/`, `types/`, `validation/`, and an `index.ts` that is the public door. Screens import other features only through that `index.ts`.

Shared UI that is not tied to one feature goes in `src/components/` (atoms, molecules, organisms). Shared services (storage, i18n, crash reporting) stay in `src/services/`.

```text
RN_BoilerplateLatest/
├── android/                 # Android project, flavors, release signing
├── ios/                     # Xcode project and schemes (Dev, Staging, Production)
├── specs/                   # Codegen specs for TurboModules and Fabric views
├── src/
│   ├── api/                 # Axios client, endpoints, error normalizer
│   ├── assets/              # SVG icons
│   ├── components/          # Shared UI: atoms, molecules, organisms
│   ├── config/              # Config (env) and app constants
│   ├── features/
│   │   ├── auth/            # Login, register, mock-or-real auth API
│   │   ├── home/            # Photo list, product detail, Features Lab
│   │   ├── notifications/   # Local notifications
│   │   └── settings/        # Theme, language, logout
│   ├── hooks/               # useIsDark, useApiCancellation, useDebounce, ...
│   ├── locales/             # en.json, es.json, ar.json
│   ├── native/              # JS wrappers for the specs in specs/
│   ├── navigation/          # Auth stack, tabs, linking
│   ├── services/            # MMKV, i18n, AppConstant, crash reporting
│   ├── store/               # Redux store and Zustand stores
│   ├── theme/               # Colors, spacing, typography, Unistyles setup
│   └── types/               # Ambient types (env, axios, i18next)
├── __tests__/               # Jest tests, mirroring src/
├── keys.example.json        # Template. Copy this. Do not commit real keys.
├── CONTRIBUTING.md
└── package.json
```

Imports use aliases (`@components`, `@features`, `@services`, `@theme`, `@config`, …). Deep relative paths (`../../../`) fail lint.

---

## Set up and run

You need:

1. **Node.js 22** (see `.nvmrc`; `package.json` requires `>= 22.11.0`)
2. **Yarn 3.6.4** through Corepack (`packageManager` in `package.json`). Do not use Yarn 1.
3. **Android:** Android Studio, SDK 37, JDK 17
4. **iOS (macOS only):** Xcode 15 or newer, CocoaPods (`brew install cocoapods`)

First-time machine setup: [React Native environment guide](https://reactnative.dev/docs/set-up-your-environment).

```bash
nvm use
corepack enable          # makes `yarn` match package.json ("yarn@3.6.4")
yarn install:all         # JS dependencies, then CocoaPods

cp keys.example.json keys.development.json
cp keys.example.json keys.staging.json
cp keys.example.json keys.production.json
cp keys.example.json keys.json
```

`keys.*.json` are git-ignored. `keys.example.json` is the only one in git. Replace `SECRET_KEY` and `MMKV_ENCRYPTION_KEY` (16 characters or fewer; `openssl rand -hex 8` works). Never commit a real keys file or a keystore.

```bash
yarn start               # Metro, in its own terminal

yarn android             # development flavor
yarn ios                 # Dev scheme
```

| Environment | Android                | iOS                | Keys file the native build reads |
| :---------- | :--------------------- | :----------------- | :------------------------------- |
| Development | `yarn android`         | `yarn ios`         | `keys.development.json`          |
| Staging     | `yarn android:staging` | `yarn ios:staging` | `keys.staging.json`              |
| Production  | `yarn android:prod`    | `yarn ios:prod`    | `keys.production.json`           |

Release binaries:

```bash
yarn build:android          # production APK
yarn bundle:android         # production AAB (Play Store)
yarn build:ios              # iOS Release, production scheme
```

Android release signing reads `RELEASE_STORE_FILE`, `RELEASE_STORE_PASSWORD`, `RELEASE_KEY_ALIAS`, and `RELEASE_KEY_PASSWORD` from Gradle properties or the environment. CI fails the release build when those are missing. A local release build without them falls back to the debug keystore and prints a warning. Do not ship that build.

Read config in app code:

```typescript
import { Config } from '@config';

Config.APP_ENV; // 'development' | 'staging' | 'production'
Config.API_BASE_URL;
Config.USE_MOCK_API;
Config.secureFor('SECRET_KEY');
```

A release build with no `API_BASE_URL` throws at startup. Debug builds fall back to JSONPlaceholder.

---

## Commands

| Command                               | What it does                                  |
| :------------------------------------ | :-------------------------------------------- |
| `yarn start`                          | Metro, cache cleared                          |
| `yarn android` / `:staging` / `:prod` | Run an Android flavor                         |
| `yarn ios` / `:staging` / `:prod`     | Run an iOS scheme                             |
| `yarn build:android`                  | Production APK                                |
| `yarn build:android:debug`            | Development debug APK                         |
| `yarn bundle:android`                 | Production AAB                                |
| `yarn build:ios`                      | iOS production Release                        |
| `yarn install:all`                    | `yarn install` plus CocoaPods                 |
| `yarn clean:install`                  | Wipe caches and reinstall                     |
| `yarn typecheck`                      | `tsc --noEmit`                                |
| `yarn lint` / `yarn lint:fix`         | ESLint                                        |
| `yarn format` / `yarn format:check`   | Prettier                                      |
| `yarn test`                           | Jest                                          |
| `yarn test:coverage`                  | Jest with coverage thresholds                 |
| `yarn knip:check`                     | Unused files, exports, and dependencies       |
| `yarn check`                          | typecheck, lint, format, coverage, knip       |
| `yarn ci`                             | Same gates as CI, plus a locked install       |
| `yarn ci audit`                       | Production dependency audit                   |
| `yarn sonar:start`                    | Start the local SonarQube server              |
| `yarn sonar:open`                     | Open the project dashboard in the browser     |
| `yarn sonar`                          | Run tests with coverage, then scan and upload |
| `yarn sonar:stop`                     | Stop SonarQube, keep its data                 |
| `yarn adb`                            | Reverse Metro and debugger ports              |
| `yarn open:ios` / `yarn open:android` | Open the iOS or Android project in its IDE    |

---

## How to use the pieces that are already wired

### Theme

```tsx
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderColor: theme.colors.border,
  },
}));
```

Do not hardcode hex colors or spacing numbers. `useIsDark()` (`@hooks`) is the shared dark-mode check.

### Copy

```tsx
const { t } = useTranslation();
<Text>{t('home.title')}</Text>;
```

Add every new string to `src/locales/en.json`, `es.json`, and `ar.json`.

### State

```typescript
// Auth and theme: Zustand
const user = useAuthStore(state => state.user);

// Photo list and other server state: Redux Toolkit
const dispatch = useAppDispatch();
const { photos, isLoading } = useAppSelector(state => state.home);
```

### HTTP

```typescript
const { signal } = useApiCancellation(); // aborted when the screen unmounts
await apiClient.get('/photos', { signal });

// Skip the automatic error toast for this call:
await apiClient.get('/photos', { silent: true });
```

The client shows a toast on network failure and 5xx unless `silent: true` is set. A 401 tries one token refresh. If refresh fails, the auth store logs the user out. `AppConstant.cancelAllRequests()` aborts every in-flight call (used on logout).

```typescript
import { normalizeApiError } from '@api';

const { message, isNetworkError, isTimeout, isCanceled } =
  normalizeApiError(error);
```

### Loader, toasts, crash reports

```typescript
import { AppConstant } from '@services/AppConstant';
import { Toast } from '@components/organisms';
import { setCrashReporter } from '@services/crashReporting';

AppConstant.showLoader('Please wait...');
AppConstant.hideLoader();

Toast.success('Saved');
Toast.error('Could not reach the server');
Toast.hide();

setCrashReporter({
  captureException: (error, context) => {
    /* hand off to your vendor */
  },
  setUser: userId => {
    /* optional; null on logout */
  },
});
```

`GlobalLoader.show` / `GlobalLoader.hide` are the same loader without going through `AppConstant`.

### A new feature

1. Add `src/features/<name>/` with a screen and an `index.ts`.
2. Register the screen in `src/navigation/`.
3. Add strings to all three locale files.
4. Add a test under `__tests__/features/<name>/`.

---

## Rules the repo already enforces

- TypeScript strict. No `any`. No `enum` (use a union or `as const`).
- Unistyles only. ESLint warns on color literals.
- User-facing text goes through i18n.
- MMKV only. AsyncStorage is blocked by lint.
- Forms use React Hook Form and Yup.
- New native modules are TurboModules or Fabric components, with a spec in `specs/`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org). Husky runs lint-staged and commitlint.
- CI runs `scripts/ci.sh`: typecheck, lint, format, tests with coverage, and knip. GitHub Actions (`.github/workflows/ci.yml`) and GitLab CI (`.gitlab-ci.yml`) both call that script. Jenkins, Bitbucket, CircleCI, or Azure Pipelines run `bash scripts/ci.sh` on Node 22. `bash scripts/ci.sh audit` is the dependency audit and is allowed to fail.

---

## SonarQube locally

Local SonarQube community server in Docker. The scanner runs on your machine through `@sonar/scan`. Docker Desktop must be running. This is not part of CI.

```bash
yarn sonar:start    # start the server (first run downloads the image)
yarn sonar          # test with coverage, then scan and upload
yarn sonar:open     # open the project dashboard
yarn sonar:stop     # stop the server, keep its data
```

### First time

1. Open Docker Desktop and wait until `docker ps` works.
2. `yarn sonar:start`, then open http://localhost:9000 and sign in with `admin` / `admin`. Change that password.
3. Avatar → My Account → Security → generate a **Global Analysis Token**. Copy it once.
4. Keep the token out of the repo. Export it in your shell profile (for example `~/.zshrc`):

   ```bash
   export SONAR_TOKEN=your-token
   ```

   `sonar-project.properties` has no token line. The scanner reads `SONAR_TOKEN` from the environment. Never commit a token.

5. `yarn sonar`, then `yarn sonar:open`.

The dashboard is http://localhost:9000/dashboard?id=RN_Boilerplate_Latest. It exists after the first successful scan. Before that, http://localhost:9000 is the login page.

To remove the containers, run `docker-compose down`. Named volumes keep the data until `docker-compose down -v`.

| Problem                     | What to do                                                                        |
| :-------------------------- | :-------------------------------------------------------------------------------- |
| Server never becomes ready  | `docker-compose logs -f sonarqube`, then `yarn sonar:stop` and `yarn sonar:start` |
| Scanner says not authorized | `SONAR_TOKEN` is not set in this shell, or the token was revoked                  |
| Dashboard URL is empty      | Run `yarn sonar` once, then `yarn sonar:open`                                     |
| Port 9000 is taken          | `lsof -i :9000`. Another local SonarQube (for example Aramex) already uses it     |

---

## License

[MIT](LICENSE).
