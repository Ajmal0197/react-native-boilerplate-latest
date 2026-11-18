# 🚀 React Native Production Boilerplate (RN 0.88+)

<p align="center">
  <img src="https://raw.githubusercontent.com/facebook/react-native/main/packages/react-native/ReactAndroid/src/main/res/drawable-hdpi/rn_edit_text_material.xml" alt="React Native Logo" width="80" height="80" />
</p>

<p align="center">
  <b>A battle-tested, feature-driven React Native boilerplate built on the New Architecture (Fabric & TurboModules), powered by React 19, TypeScript, Unistyles v3, and multi-environment pipelines.</b>
</p>

<p align="center">
  <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React%20Native-0.88.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native 0.88" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Strict" /></a>
  <a href="https://reactnative.dev/docs/the-new-architecture/landing-page"><img src="https://img.shields.io/badge/New%20Architecture-Enabled-success?style=for-the-badge" alt="New Architecture" /></a>
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Tests-13%2F13%20Passed-brightgreen?style=for-the-badge&logo=jest" alt="Tests" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License" /></a>
</p>

---

## 📱 App Demo & Walkthrough

<p align="center">
  <img src="./docs/assets/demo.gif" alt="App Walkthrough Demo" width="300" style="border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
  <br />
  <sub>📱 <b>Live Demo on iOS Simulator (iPhone Air)</b> — High-speed LegendList scrolling, Unistyles dynamic theming, and multi-environment setup.</sub>
  <br />
  <sub><a href="./docs/assets/demo.mp4">▶️ Watch High-Resolution MP4 Recording</a> • <a href="./Simulator Screen Recording - iPhone Air - 2026-11-18 at 02.02.25.mp4">Original Recording</a></sub>
</p>

---

## 📖 Complete Documentation

Looking for the exhaustive technical guide, deep-dive architecture notes, native module tutorials, or Android/iOS internal configurations?

👉 **[Read the Full Documentation Guide (Documentation.md)](./Documentation.md)**

---

## 🌟 Key Highlights & Architecture

- ⚡ **100% New Architecture**: Hermes V1 enabled, native C++ JSI bindings, custom **TurboModule** (`NativeAppDeviceInfo`), and custom **Fabric Component** (`NativeBatteryView`).
- 🎨 **Unistyles v3 + Dynamic Theming**: High-performance Nitro Modules C++ styling with zero JS re-renders on theme or orientation changes. Supports automatic light/dark mode.
- 📦 **Dual State Management**:
  - **Redux Toolkit**: Predictable state container for complex domains, async thunks, and entity caching.
  - **Zustand**: Minimalist store for authentication & UI flags, backed by synchronous MMKV persistence.
- 🚀 **High-Speed MMKV Storage**: 30x faster than AsyncStorage via direct memory-mapped key-value storage.
- 🧭 **React Navigation v7**: Native Stack and Bottom Tabs with end-to-end type safety and deep linking.
- 🌐 **Multi-Environment Ready**: Out-of-the-box support for **Development**, **Staging**, and **Production** environments (`react-native-config`) with dynamic app display names and bundle IDs.
- 🌍 **Internationalization (i18n) & RTL**: Multi-language support (English, Arabic, Spanish) with automatic RTL layout switching and application restart.
- 🛡️ **Production Minification & Obfuscation**: Android R8/ProGuard rules configured for all libraries, Hermes bytecode compilation, and Terser console stripping in release mode.
- 🃏 **100% Test Coverage Ready**: Pre-configured Jest & React Native Testing Library suite with 13 test suites (39 tests) passing.

---

## 📋 Prerequisites

Before setting up the project, make sure your development environment satisfies the official requirements:

- **Node.js**: `>= 18` (LTS recommended) — [Official Node.js Guide](https://nodejs.org/)
- **Yarn**: `v1` or Yarn Modern (Berry) — [Official Yarn Guide](https://yarnpkg.com/)
- **Android**:
  - [Android Studio](https://developer.android.com/studio) with Android SDK & Platform Tools
  - JDK 17 (`java -version`)
- **iOS** *(macOS only)*:
  - [Xcode](https://developer.apple.com/xcode/) `>= 15.0`
  - CocoaPods `>= 1.13` (`brew install cocoapods` or `sudo gem install cocoapods`)
- **React Native Official Setup**: [React Native CLI Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd RN_BoilerplateLatest

# One-command full setup (Node modules + CocoaPods)
yarn install:all
```

> [!TIP]
> If you ever need to clean your workspace and reinstall dependencies from scratch, run:
> ```bash
> yarn clean:install
> ```

---

### 2. Run the Application

#### 📱 Development (Default)
```bash
# Start Metro bundler with cache reset
yarn start

# Run Android (Development Flavor)
yarn android

# Run iOS (Development Scheme)
yarn ios
```

#### 🧪 Staging
```bash
# Run Android with .env.staging
yarn android:staging

# Run iOS with .env.staging
yarn ios:staging
```

#### 🚀 Production
```bash
# Run Android with .env.production
yarn android:prod

# Run iOS with .env.production
yarn ios:prod
```

---

### 3. Build & Package Binaries

```bash
# Build Android Production Release APK
yarn build:android

# Build Android Development Debug APK
yarn build:android:debug

# Build Android App Bundle (.aab for Google Play Store)
yarn bundle:android

# Build iOS Production Release App
yarn build:ios
```

---

## ⚙️ Multi-Environment Configuration

Environment variables are managed cleanly using [`react-native-config`](https://github.com/react-native-config/react-native-config):

| Environment | Config File | iOS Scheme | Android Flavor | Bundle / Application ID | App Name |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Development** | `.env.development` | `RN_Boilerplate_Latest_Dev` | `development` | `com.rn_boilerplate_latest.dev` | `RNBoilerplate (Dev)` |
| **Staging** | `.env.staging` | `RN_Boilerplate_Latest_Staging` | `staging` | `com.rn_boilerplate_latest.staging` | `RNBoilerplate (Staging)` |
| **Production** | `.env.production` | `RN_Boilerplate_Latest` | `production` | `com.rn_boilerplate_latest` | `RNBoilerplate` |

To access variables in TypeScript with full autocompletion:
```typescript
import { env } from '@config/env';

console.log(env.API_BASE_URL);
console.log(env.APP_ENV); // 'development' | 'staging' | 'production'
```

---

## 📂 Project Architecture

This boilerplate follows a modular, feature-first structure:

```text
RN_BoilerplateLatest/
├── android/                          # 🤖 Android native project & ProGuard rules
├── ios/                              # 🍏 iOS native project, xcconfig & schemes
├── specs/                            # ⚡ Codegen specs (TurboModules & Fabric)
├── src/
│   ├── api/                          # 🌐 Axios client, endpoints, and interceptors
│   ├── assets/                       # 🎨 Vector icons (SVGs) and fonts
│   ├── components/                   # 🧱 Atomic design system
│   │   ├── atoms/                    #    Button, Text, Input, Spacer
│   │   ├── molecules/                #    Card, ListItem
│   │   └── organisms/                #    Header, ErrorFallback
│   ├── config/                       # ⚙️ Constants, environment configs
│   ├── features/                     # 📦 Feature-driven slices
│   │   ├── auth/                     #    Authentication screens, validation & API
│   │   ├── home/                     #    Product list with LegendList & Redux
│   │   ├── notifications/            #    Notifee notification triggers
│   │   └── settings/                 #    Theme switcher, language selection
│   ├── hooks/                        # 🪝 Shared custom React hooks
│   ├── locales/                      # 🌍 Translation files (en, ar, es)
│   ├── native/                       # 📱 TypeScript wrappers for native modules
│   ├── navigation/                   # 🧭 Navigators (Root, Auth, App Tabs)
│   ├── services/                     # 🔌 Storage (MMKV), i18n, notifications
│   ├── store/                        # 🧠 State management (Redux & Zustand)
│   ├── theme/                        # 🎨 Unistyles themes, colors, typography
│   ├── types/                        # 📘 Global TypeScript definitions
│   └── utils/                        # 🛠️ Formatters, validators, logger
├── __tests__/                        # 🃏 Jest unit & integration test suites
├── Documentation.md                  # 📑 In-depth technical documentation
└── package.json
```

---

## 🛠️ NPM Scripts & Shortcuts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`yarn start`** | `react-native start --reset-cache` | Start Metro bundler with cache reset |
| **`yarn android`** | `react-native run-android --mode=developmentDebug` | Run Android in Development mode |
| **`yarn android:staging`** | `react-native run-android --mode=stagingDebug` | Run Android in Staging mode |
| **`yarn android:prod`** | `react-native run-android --mode=productionDebug` | Run Android in Production mode |
| **`yarn ios`** | `react-native run-ios --scheme RN_Boilerplate_Latest_Dev` | Run iOS in Development mode |
| **`yarn ios:staging`** | `react-native run-ios --scheme RN_Boilerplate_Latest_Staging` | Run iOS in Staging mode |
| **`yarn ios:prod`** | `react-native run-ios --scheme RN_Boilerplate_Latest` | Run iOS in Production mode |
| **`yarn build:android`** | `cd android && ./gradlew assembleProductionRelease && cd ..` | Build Production Release APK |
| **`yarn build:android:debug`** | `cd android && ./gradlew assembleDevelopmentDebug && cd ..` | Build Development Debug APK |
| **`yarn bundle:android`** | `cd android && ./gradlew bundleProductionRelease && cd ..` | Build Production Release Bundle (`.aab`) |
| **`yarn build:ios`** | `react-native build-ios --mode Release --scheme RN_Boilerplate_Latest` | Build iOS in Release mode |
| **`yarn install:all`** | `yarn install && (bundle install \|\| true) && cd ios && (bundle exec pod install \|\| pod install) && cd ..` | Full dependency installation |
| **`yarn clean:install`** | `bash scripts/clean-install.sh` | Deep clean caches & fresh dependency install |
| **`yarn openAS`** | `open -a "Android Studio" android` | Open Android project in Android Studio |
| **`yarn openWS`** | `xed -b ios` | Open iOS workspace in Xcode |
| **`yarn typecheck`** | `tsc --noEmit` | Validate TypeScript types (0 errors) |
| **`yarn lint`** | `eslint .` | Run ESLint across project |
| **`yarn lint:fix`** | `eslint . --fix` | Automatically fix linting issues |
| **`yarn format`** | `prettier --write .` | Format all files with Prettier |
| **`yarn test`** | `jest` | Run all 13 test suites (39 tests) |
| **`yarn test:coverage`** | `jest --coverage` | Run tests with coverage summary |
| **`yarn knip:check`** | `knip` | Detect unused files, exports & dependencies |

---

## 🛡️ Code Quality & Engineering Practices

This boilerplate enforces enterprise-grade code health, strict typing, and defensive design patterns:

### 1. ESLint & Static Analysis Rules (`eslint.config.mjs`)
- 🪝 **Strict React Hooks Validation**:
  - `react-hooks/rules-of-hooks: error`: Calling hooks conditionally, inside nested loops, or outside React components throws immediate lint errors.
  - `react-hooks/exhaustive-deps: warn`: Enforces declaring all dependencies in `useEffect`, `useCallback`, and `useMemo` to prevent stale closures.
- 📱 **React & React Native Best Practices**:
  - `react-native/no-inline-styles: warn`: Flags inline style objects to prevent object re-allocation per render.
  - `react-native/no-unused-styles: warn`: Detects leftover unreferenced style definitions.
  - `react-native/no-single-element-style-arrays: error`: Flags redundant single-item arrays like `style={[styles.box]}`.
  - `react/self-closing-comp: warn`: Enforces self-closing tags `<View />` instead of `<View></View>`.
  - `react/jsx-no-useless-fragment: warn`: Eliminates redundant `<>...</>` wrappers that clutter the fiber tree.
  - `eqeqeq: error`: Enforces strict type equality (`===` / `!==`).
  - `max-lines: warn (400 lines)`: Soft warning discouraging monolithic files and prompting component/hook decomposition.
- 🧹 **Automatic Dead Import Stripping**: Uses `eslint-plugin-unused-imports` to detect and auto-remove unreferenced imports on save (`yarn lint:fix`).
- 🗂️ **Deterministic Import Sorting**: Enforces `import/order` with strict grouping (`type` ➔ `react` ➔ `react-native` ➔ external libraries ➔ `@/` path aliases ➔ relative files) and case-insensitive alphabetization.

### 2. Strict TypeScript Architecture
- Configured with `strict: true`, `noImplicitAny: true`, and `strictNullChecks: true`.
- Zero `any` policy across core modules, custom TurboModules, navigation route parameter contracts (`RootStackParamList`), and state slices.
- Verified in CI with `yarn typecheck` (`tsc --noEmit`).

### 3. Atomic Design & Anti-Monolith Philosophy
- UI is strictly decoupled into **Atoms** (Button, Text, Input), **Molecules** (Card, ListItem), and **Organisms** (Header, ErrorFallback).
- Screens stay lightweight and delegate domain logic to custom hooks (`@hooks/`) and feature-specific slices (`@features/`), avoiding 1,000+ line bloated component files.

### 4. Dead Code & Unused Export Detection (Knip)
- Integrated with [`knip`](https://knip.dev) (`yarn knip:check`) to automatically detect unused npm packages, dead exports, dangling types, and orphaned assets before merging to production.

### 5. Automated Testing & Regression Shield
- **12 Test Suites (35 Tests)** pre-configured with Jest and React Native Testing Library.
- Covers Redux Toolkit reducers, asynchronous thunks, Zustand store persistence, custom React hooks (`useDebounce`), Atomic UI components, and end-to-end screen navigation.

### 6. Production Hardening & Sanitization
- **Console & Debugger Stripping**: Production release builds strip `console.log` and `debugger` statements via Terser in Metro bundler.
- **Android R8 & ProGuard**: Configured with library-specific keep rules for Unistyles, MMKV, and TurboModules, with resource shrinking enabled.

---

## 💻 VS Code Configuration

Pre-configured in `.vscode/settings.json`:
- **Format On Save**: Automatically formats with Prettier on every save (`Cmd + S`).
- **ESLint Fix On Save**: Removes unreachable code and cleans up lint issues automatically.
- **Workspace TypeScript SDK**: Locked to project TypeScript compiler.
- **Jest Runner Disabled in Background**: Prevents background terminal spawning.

---

## 📄 License

This boilerplate is open-source software licensed under the [MIT License](LICENSE).
