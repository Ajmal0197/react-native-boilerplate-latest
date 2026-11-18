# 🚀 React Native Production Boilerplate

A production-ready, feature-driven **React Native CLI (v0.88+)** boilerplate built on the **New Architecture (Fabric + TurboModules)**, strictly typed with **TypeScript**, styled with **Unistyles v3**, and secured with native key management and build obfuscation.

---

## 📑 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Prerequisites](#-prerequisites)
3. [Quick Start (Beginner Friendly)](#-quick-start-beginner-friendly)
4. [VS Code Setup & Auto-Format on Save](#-vs-code-setup--auto-format-on-save)
5. [For Android Developers](#-for-android-developers)
6. [For iOS Developers](#-for-ios-developers)
7. [Application Configuration](#-application-configuration)
8. [Project Architecture & Directory Map](#-project-architecture--directory-map)
9. [State Management — Redux Toolkit & Zustand (Optional)](#-state-management--redux-toolkit--zustand-optional)
10. [Design System & Styling — Unistyles v3](#-design-system--styling--unistyles-v3)
11. [Synchronous Fast Storage — MMKV](#-synchronous-fast-storage--mmkv)
12. [Multi-language & RTL Support (i18n)](#-multi-language--rtl-support-i18n)
13. [Forms & Validation — React Hook Form + Yup](#-forms--validation--react-hook-form--yup)
14. [Native TurboModules & Fabric Components](#-native-turbomodules--fabric-components)
15. [Local Notifications — Notifee](#-local-notifications--notifee)
16. [Minification, Resource Shrinking & Obfuscation](#-minification-resource-shrinking--obfuscation)
17. [Global Loader & Network Architecture](#-global-loader--network-architecture)
18. [Native Bottom Toast & Global Network Error Display](#-native-bottom-toast--global-network-error-display)
19. [Bottom Sheet Modals — Stacked & Keyboard-Handled](#-bottom-sheet-modals--stacked--keyboard-handled)
20. [Android On-Screen Soft Navigation Bar Handling](#-android-on-screen-soft-navigation-bar-handling)
21. [Interactive Features Lab — TabViewDemoScreen](#-interactive-features-lab--tabviewdemoscreen)
22. [Testing Guide — Jest + RNTL](#-testing-guide--jest--rntl)
23. [NPM Scripts & Shortcuts](#-npm-scripts--shortcuts)

---

## 🧰 Tech Stack

| Category             | Library                                                                                                        | Purpose                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Framework**        | [React Native CLI](https://reactnative.dev) (v0.88)                                                            | Native engine with New Architecture (Fabric & TurboModules) enabled        |
| **Styling**          | [react-native-unistyles](https://unistyl.es) (v3)                                                              | Nitro Modules C++ styling core with zero JS re-render overhead             |
| **Primary State**    | [Redux Toolkit](https://redux-toolkit.js.org)                                                                  | Centralized global store for server caches, products, and complex slices   |
| **Optional State**   | [Zustand](https://zustand.docs.pmnd.rs)                                                                        | _(Optional)_ Lightweight store with MMKV persistence for auth and UI flags |
| **Fast Storage**     | [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)                                             | JSI memory-mapped key-value storage (30x faster than AsyncStorage)         |
| **Bottom Sheets**    | [@gorhom/bottom-sheet](https://docs.swmansion.com/react-native-bottom-sheet/) (v5)                             | Gesture-driven stacked modal sheets and interactive keyboard avoidance     |
| **Tab View**         | [react-native-tab-view](https://github.com/satya164/react-native-tab-view)                                      | Virtualized swipable tabs backed by `react-native-pager-view`               |
| **Native Toast**     | [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)                          | Bottom-anchored capsule HUD toasts with automatic API error surfacing      |
| **Localization**     | [i18next](https://www.i18next.com) + [react-native-localize](https://github.com/zoontek/react-native-localize) | 100% type-safe translation keys with RTL layout switching                  |
| **Forms**            | [React Hook Form](https://react-hook-form.com) + [Yup](https://github.com/jquense/yup)                         | Uncontrolled, lag-free inputs with schema validation                       |
| **Navigation**       | [React Navigation v7](https://reactnavigation.org)                                                             | Native Stack + Bottom Tabs navigation with deep linking                    |
| **Lists**            | [@legendapp/list](https://legendapp.com/open-source/list/)                                                     | Virtualized, high-performance lists with estimated item sizing             |
| **Keyboard**         | [react-native-keyboard-controller](https://kirillzyusko.github.io/react-native-keyboard-controller/)           | Edge-to-edge window insets and keyboard tracking                           |
| **Notifications**    | [@notifee/react-native](https://notifee.app)                                                                   | Local notifications, channels, and background triggers                     |
| **Animations**       | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)                                 | Worklet-based 60/120fps UI thread animations                               |
| **Network**          | [Axios](https://axios-http.com)                                                                                | Interceptors, Bearer token injection, automatic 401 refresh, and errors    |
| **Global Loader**    | [react-native-root-siblings](https://github.com/magicismight/react-native-root-siblings)                        | Fullscreen overlay with reference counting, controllable from anywhere     |
| **Multi-Env Config** | [react-native-keys](https://github.com/numandev1/react-native-keys)                                             | Build-flavor dynamic app name, package ID, and encrypted JSI keys          |
| **Security / Build** | R8 / ProGuard + Terser + Hermes                                                                                | Bytecode compilation, dead code stripping, and identifier mangling         |
| **Testing**          | [Jest](https://jestjs.io) + RNTL                                                                               | 21 consolidated test suites (85 tests) covering state, hooks, UI, and APIs  |

---

## 📋 Prerequisites

Before setting up the project, ensure your machine satisfies the official [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) requirements:

- **Node.js**: `>= 22.11.0` — [Node.js Official Downloads](https://nodejs.org/) (Recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- **Yarn**: [Yarn Official Installation](https://yarnpkg.com/getting-started/install) (`corepack enable` or `npm install -g yarn`)
- **JDK (Java Development Kit)**: Java 17 (required for Android) — [Azul Zulu OpenJDK 17](https://www.azul.com/downloads/?package=jdk#zulu) or [Adoptium Temurin 17](https://adoptium.net/temurin/releases/?version=17)
- **Android Studio & SDK**: [Android Studio Download](https://developer.android.com/studio) (includes Android SDK Platform, Command-line Tools, Build-Tools, and Android Emulator)
- **macOS only (for iOS development)**:
  - **Xcode**: `>= 15.0` via [Mac App Store](https://apps.apple.com/app/xcode/id497799835) or [Apple Developer](https://developer.apple.com/download/all/)
  - **Xcode Command Line Tools**: `xcode-select --install`
  - **CocoaPods**: [CocoaPods Getting Started Guide](https://guides.cocoapods.org/using/getting-started.html) (`sudo gem install cocoapods` or `brew install cocoapods`)
  - **Ruby & Bundler**: [Bundler Official Documentation](https://bundler.io/) (`gem install bundler`)
- **Watchman** (Recommended file watcher for macOS): [Watchman Installation Guide](https://facebook.github.io/watchman/docs/install) (`brew install watchman`)

---

## ⚡ Quick Start (Beginner Friendly)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repo-url>
cd RN_BoilerplateLatest

# One-command full setup (Node modules + CocoaPods)
yarn install:all
```

> [!TIP]
> If you are having trouble with iOS, reinstall the dependencies by running the official workflow:
> ```bash
> cd ios
> bundle install
> bundle exec pod install
> cd ..
> ```

### 2. Open Native Workspaces (Convenience Shortcuts)

```bash
# Open Android project in Android Studio
yarn openAS

# Open iOS project in Xcode
yarn openWS
```

### 3. Run the Application

```bash
# Start the Metro bundler
yarn start

# Run Android
yarn android

# Run iOS
yarn ios
```

---

## 💻 VS Code Setup & Auto-Format on Save

This repository comes pre-configured with workspace settings in `.vscode/` so that every file is automatically formatted and linted whenever you save:

### 1. Recommended Extensions

When opening the folder in VS Code, install the recommended workspace extensions:

- **Prettier** (`esbenp.prettier-vscode`): Code formatting engine.
- **ESLint** (`dbaeumer.vscode-eslint`): Code quality & auto-fix.
- **EditorConfig** (`editorconfig.editorconfig`): Enforces consistent indent style (2 spaces).

### 2. How On-Save Formatting Works

Preconfigured in `.vscode/settings.json`:

- **`editor.formatOnSave: true`**: Automatically formats TypeScript, JavaScript, JSON, and Markdown on every `Cmd + S` (macOS) / `Ctrl + S` (Windows/Linux) using Prettier.
- **`source.fixAll.eslint: "explicit"`**: Automatically removes unused imports and fixes lint issues upon saving.
- **`files.trimTrailingWhitespace: true`**: Cleans up trailing whitespace on save.
- **Workspace TypeScript SDK**: Configured to use the exact project TypeScript version (`node_modules/typescript/lib`).

---

## 🤖 For Android Developers

If you are coming from native Android (Kotlin / Jetpack Compose):

| Android Concept                 | React Native Equivalent in this Boilerplate                 | Location in Project                                                                                                                                  |
| ------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Activity` / `Fragment`         | Screen components wrapped in React Navigation               | [`src/features/*/screens/`](src/features/)                                                                                                           |
| Jetpack Compose `@Composable`   | Functional React components with JSX                        | [`src/components/atoms/`](src/components/atoms/)                                                                                                     |
| `ViewModel` + `StateFlow`       | Redux Toolkit slice or Zustand store                        | [`src/store/`](src/store/)                                                                                                                           |
| `SharedPreferences`             | MMKV (`storage.getString`, `storage.set`)                   | [`src/services/storage.ts`](src/services/storage.ts)                                                                                                 |
| `strings.xml`                   | JSON translation catalogs (`en.json`, `es.json`, `ar.json`) | [`src/locales/`](src/locales/)                                                                                                                       |
| `NotificationManager` / Channel | `@notifee/react-native` channels and triggers               | [`src/services/notification.ts`](src/services/notification.ts)                                                                                       |
| `@ReactMethod` (Old Bridge)     | TurboModule via C++ JSI (`NativeAppDeviceInfoSpec`)         | [`android/app/src/main/java/com/rn_boilerplate_latest/DeviceInfoModule.kt`](android/app/src/main/java/com/rn_boilerplate_latest/DeviceInfoModule.kt) |
| `build.gradle` properties       | `android/gradle.properties` (`newArchEnabled=true`)         | [`android/gradle.properties`](android/gradle.properties)                                                                                             |

---

## 🍏 For iOS Developers

If you are coming from native iOS (Swift / SwiftUI / UIKit):

| iOS Concept                       | React Native Equivalent in this Boilerplate                | Location in Project                                                                              |
| --------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `UIViewController`                | Screen components                                          | [`src/features/*/screens/`](src/features/)                                                       |
| `UINavigationController`          | `@react-navigation/native-stack`                           | [`src/navigation/`](src/navigation/)                                                             |
| `UITabBarController`              | `@react-navigation/bottom-tabs`                            | [`src/navigation/AppNavigator.tsx`](src/navigation/AppNavigator.tsx)                             |
| `ObservableObject` / `@Published` | Redux / Zustand hooks (`useAppSelector`, `useAuthStore`)   | [`src/store/`](src/store/)                                                                       |
| `UserDefaults`                    | MMKV (`storage.getString`, `storage.set`)                  | [`src/services/storage.ts`](src/services/storage.ts)                                             |
| `Localizable.strings`             | i18next translation resources                              | [`src/locales/`](src/locales/)                                                                   |
| `UNUserNotificationCenter`        | Notifee notification manager                               | [`src/services/notification.ts`](src/services/notification.ts)                                   |
| `RCTBridgeModule`                 | TurboModule (`NativeDeviceInfo.mm` conforming to JSI spec) | [`ios/RN_Boilerplate_Latest/NativeDeviceInfo.mm`](ios/RN_Boilerplate_Latest/NativeDeviceInfo.mm) |

---

## ⚙️ Application Configuration & Multi-Environment Setup

The project uses [`react-native-keys`](https://github.com/numandev1/react-native-keys) for seamless, New-Architecture-compatible multi-environment support (`development`, `staging`, and `production`) with C++ & JSI obfuscation and native key separation.

### Environment Files

| Environment | Config File | App Name | Application / Bundle ID |
| --- | --- | --- | --- |
| **Development** | [`keys.development.json`](keys.development.json) | `RNBoilerplate (Dev)` | `com.rn_boilerplate_latest.dev` |
| **Staging** | [`keys.staging.json`](keys.staging.json) | `RNBoilerplate (Staging)` | `com.rn_boilerplate_latest.staging` |
| **Production** | [`keys.production.json`](keys.production.json) | `RNBoilerplate` | `com.rn_boilerplate_latest` |

### Accessing Config in TypeScript

Centralized and strictly typed in [`src/config/env.ts`](src/config/env.ts):

```typescript
import { Config } from '@config/env';

// Access configuration anywhere in the app
const appName = Config.APP_NAME;         // "RNBoilerplate (Dev)" in development
const baseUrl = Config.API_BASE_URL;     // "https://jsonplaceholder.typicode.com"
const env = Config.APP_ENV;              // "development" | "staging" | "production"
const isDev = Config.ENABLE_DEV_TOOLS;   // boolean
const timeout = Config.TIMEOUT_MS;       // 15000 (number)
```

### Native Dynamic App Name Integration

- **Android**: `dotenv.gradle` injects `@string/APP_NAME` from the active environment file into `android/app/src/main/res/values/strings.xml`, dynamically changing the app name and application ID per product flavor (`development`, `staging`, `production`).
- **iOS**: Xcode schemes (`RN_Boilerplate_Latest` for production, `RN_Boilerplate_Latest_Dev` for dev, and `RN_Boilerplate_Latest_Staging` for staging) run `BuildXCConfig.rb` in Pre-actions to generate `tmp.xcconfig`. `ios/RN_Boilerplate_Latest/Info.plist` references `$(APP_NAME)` to set `CFBundleDisplayName` dynamically without manual file copies.

### Running Specific Environments

```bash
# Development (Default)
yarn android
yarn ios

# Staging
yarn android:staging
yarn ios:staging

# Production
yarn android:prod
yarn ios:prod
```

### Building the Application

```bash
# Build Android APK (Production)
yarn build:android

# Build Android APK (Debug)
yarn build:android:debug

# Build Android Bundle (.aab for Google Play Store)
yarn bundle:android

# Build iOS App (Production)
yarn build:ios
```

### 🔐 Secure Keys Architecture (`react-native-keys`)

All environment variables and secrets are managed via [`react-native-keys`](https://github.com/numandev1/react-native-keys):

- **Public Keys**: Stored natively in Java/Objective-C/xcconfig (`APP_NAME`, `BUNDLE_ID`, `PACKAGE_ID`, `APP_ENV`, `ENABLE_DEV_TOOLS`, `TIMEOUT_MS`) for build-time manifest injection and build flavors.
- **Secure Keys**: Encrypted at build-time with AES and accessed via C++ and JSI directly into memory (`Keys.secureFor(...)`), preventing secrets from leaking in decompiled APK/IPA packages.

---

## 📂 Project Architecture & Directory Map

```text
RN_BoilerplateLatest/
├── index.js                          # 🏁 React Native app entry (registers src/App.tsx)
├── babel.config.js                   # 🔀 Babel (Unistyles, Module Resolver, Console stripper, Reanimated)
├── metro.config.js                   # 📦 Metro bundler with Terser minifier & mangler
├── tsconfig.json                     # 📘 Strict TypeScript with path aliases
├── jest.config.js                    # 🃏 Jest test runner configuration
├── knip.json                         # 🔍 Unused code and dependency cleaner configuration
├── scripts/
│   └── clean-install.sh              # 🧹 Deep clean caches & fresh dependency installation script
├── specs/                            # ⚡ Codegen specs for New Architecture
│   ├── NativeAppDeviceInfo.ts        #    TurboModule spec
│   └── NativeBatteryViewNativeComponent.ts # Fabric view component spec
├── android/                          # 🤖 Native Android application code
│   └── app/
│       ├── build.gradle              #    Build configuration (minifyEnabled, shrinkResources, Hermes)
│       └── proguard-rules.pro        #    Crash-prevention rules for all third-party libraries
├── ios/                              # 🍏 Native iOS application code
│   └── RN_Boilerplate_Latest.xcodeproj
├── src/
│   ├── App.tsx                       # 🚀 Root Component: Providers, ErrorBoundary, Theme, Navigation
│   ├── api/                          # 🌐 Axios client, endpoints, error normalizer, and types
│   ├── assets/                       # 🎨 Vector icons (SVGs) and graphics
│   ├── components/                   # 🧱 Atomic design components
│   │   ├── atoms/                    #    Button, Text, Input, Spacer
│   │   ├── molecules/                #    Card, ListItem
│   │   └── organisms/                #    Header, ErrorFallback, GlobalLoader, Toast, StackedBottomSheet, KeyboardBottomSheet
│   ├── config/                       # ⚙️ AppConstant, constants, and secure env wrapper (Config)
│   ├── features/                     # 📦 Feature-driven modules
│   │   ├── auth/                     #    Login & Register screens with Yup & React Hook Form
│   │   ├── home/                     #    Photo/Product list with LegendList & Redux, TabViewDemoScreen
│   │   ├── notifications/            #    Notifee local notification triggers
│   │   └── settings/                 #    Theme toggle, language switcher, device info
│   ├── hooks/                        # 🪝 Reusable custom hooks (useApiCancellation, useDebounce, etc.)
│   ├── locales/                      # 🌍 Translation catalogs (en, es, ar with RTL support)
│   ├── native/                       # 📱 Type-safe TS wrappers for TurboModules & Fabric
│   ├── navigation/                   # 🧭 Type-safe React Navigation (Root, App, Auth Navigators)
│   ├── services/                     # 🔧 MMKV storage, i18n, Notifee, Day.js
│   ├── store/                        # 🏪 Global State Management
│   │   ├── redux/                    #    Primary Store: Redux Toolkit (store, rootReducer, slices)
│   │   └── zustand/                  #    Optional Store: Zustand stores with MMKV persistence
│   ├── theme/                        # 🎨 Unistyles v3 theme definitions and breakpoints
│   ├── types/                        # 📝 Global TypeScript definitions
│   └── utils/                        # 🛠️ Pure utilities (formatters, validators, logger)
└── __tests__/                        # 🧪 Consolidated Test Suite (21 suites, 85 tests)
    ├── App.test.tsx                  #    Root App rendering test
    ├── setup.ts                      #    Global Jest mocks (MMKV, Reanimated, LegendList, Notifee, BottomSheet)
    ├── test-utils.tsx                #    Custom render() wrapped with Redux & Theme providers
    ├── api/                          #    API error normalizer tests (errors.test.ts)
    ├── components/                   #    Component tests (Button, Text, GlobalLoader, Toast, StackedBottomSheet, KeyboardBottomSheet)
    ├── features/                     #    Feature tests (HomeScreen, ProductDetailScreen, TabViewDemoScreen, homeSlice)
    ├── hooks/                        #    Custom hook tests (useApiCancellation, useDebounce)
    ├── store/                        #    Store tests (Redux store, hooks, Zustand MMKV persist)
    └── utils/                        #    Pure utility tests (formatters.test.ts)
```

### Module Resolver Path Aliases

All imports use clean aliases configured in `tsconfig.json`, `babel.config.js`, and `jest.config.js`:

```typescript
import { Button, Text } from '@components/atoms';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { useAppDispatch, useAppSelector } from '@store/redux/hooks';
import { storage } from '@services/storage';
import { colors } from '@theme';
import { getSecureKey } from '@config/env';
```

---

## 🏪 State Management — Redux Toolkit & Zustand (Optional)

This boilerplate supports two state paradigms. Redux Toolkit is the primary state manager.

```text
Decision Guide:
├── Need complex global state, async thunks, normalized data, or server caching?
│   └── ➔ Use REDUX TOOLKIT (src/store/redux/) [PRIMARY]
│
└── Need simple UI toggles or lightweight auth state?
    ├── ➔ Use ZUSTAND (src/store/zustand/) [OPTIONAL]
    └── ➔ Or use local React useState()
```

### 1. Primary: Redux Toolkit (`src/store/redux/`)

Configured in [`src/store/redux/store.ts`](src/store/redux/store.ts) with typed hooks:

```typescript
import { useAppDispatch, useAppSelector } from '@store/redux/hooks';
import { fetchPhotos } from '@features/home/store/homeSlice';

export const PhotoListScreen = () => {
  const dispatch = useAppDispatch();
  const { photos, isLoading } = useAppSelector(state => state.home);

  useEffect(() => {
    const promise = dispatch(fetchPhotos({ page: 1 }));
    return () => {
      promise.abort(); // Auto abort in-flight network request on unmount
    };
  }, [dispatch]);
};
```

### 2. Optional: Zustand with MMKV Sync (`src/store/zustand/`)

> [!NOTE]
> **Zustand is OPTIONAL.** If your project prefers a single state management library, you can delete `src/store/zustand/` and manage all authentication and app settings inside Redux Toolkit slices.

When used, Zustand state is persisted to disk synchronously using MMKV via `zustandStorage`:

```typescript
import { useAuthStore } from '@store/zustand/useAuthStore';

// In any component:
const { user, isAuthenticated, login, logout } = useAuthStore();
```

---

## 🎨 Design System & Styling — Unistyles v3

Styling is powered by **react-native-unistyles (v3)**, which executes styling in C++ (via Nitro Modules) without JavaScript re-renders when switching themes.

### Creating Styles:

```tsx
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import { Text } from '@components/atoms';

export const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Welcome back</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
  },
}));
```

### Instant Theme Switch:

```typescript
import { UnistylesRuntime } from 'react-native-unistyles';

UnistylesRuntime.setTheme('dark'); // or 'light'
```

---

## ⚡ Synchronous Fast Storage — MMKV

Traditional `AsyncStorage` communicates across the asynchronous bridge. **MMKV** uses C++ memory-mapped files via JSI for immediate, synchronous reads and writes:

```typescript
import { storage } from '@services/storage';

// Strings & Numbers
storage.set('user_token', 'jwt_token_here');
const token = storage.getString('user_token');

// Objects & Arrays
storage.setObject('user_profile', { id: '1', name: 'Alex' });
const profile = storage.getObject<UserProfile>('user_profile');

// Remove or Clear
storage.delete('user_token');
storage.clearAll();
```

---

## 🌍 Multi-language & RTL Support (i18n)

Full internationalization using `i18next` and `react-native-localize`:

- **100% Type-Safe Keys**: Auto-completion for all keys defined in `src/locales/en.json`.
- **RTL Support**: Selecting Arabic (`ar`) invokes `I18nManager.forceRTL(true)` and restarts the root view with `react-native-restart`.

```tsx
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms';

export const Greeting = () => {
  const { t } = useTranslation();
  return <Text>{t('common.save')}</Text>;
};
```

---

## 📋 Forms & Validation — React Hook Form + Yup

All forms utilize **React Hook Form** for uncontrolled, lag-free text input handling and **Yup** for declarative schema validation:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from './validation/loginSchema';

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: yupResolver(loginSchema),
});
```

---

## 📱 Native TurboModules & Fabric Components

The New Architecture is enabled by default.

### TurboModule (`NativeAppDeviceInfo`)

1. **Spec**: Defined in [`specs/NativeAppDeviceInfo.ts`](specs/NativeAppDeviceInfo.ts)
2. **Android**: Kotlin implementation in [`android/app/src/main/java/com/rn_boilerplate_latest/DeviceInfoModule.kt`](android/app/src/main/java/com/rn_boilerplate_latest/DeviceInfoModule.kt)
3. **iOS**: Objective-C++ implementation in [`ios/RN_Boilerplate_Latest/NativeDeviceInfo.mm`](ios/RN_Boilerplate_Latest/NativeDeviceInfo.mm)
4. **TS Consumption**:
   ```typescript
   import { NativeDeviceInfo } from '@native/NativeDeviceInfo';
   const model = NativeDeviceInfo.getDeviceModel();
   ```

---

## 🔔 Local Notifications — Notifee

Preconfigured notification channels and scheduling in [`src/services/notification.ts`](src/services/notification.ts):

```typescript
import { notificationService } from '@services/notification';

// Trigger an instant notification
await notificationService.displayNotification('Title', 'Message body');

// Schedule a reminder after 5 seconds
await notificationService.scheduleNotification(
  'Reminder',
  '5 seconds elapsed',
  5,
);
```

---

## 🛡️ Minification, Resource Shrinking & Obfuscation

Production release builds are hardened out-of-the-box:

1. **Android R8 / ProGuard (`minifyEnabled true`, `shrinkResources true`)**:
   - Strips unused Java/Kotlin bytecode and shrinks unused resources.
   - [`android/app/proguard-rules.pro`](android/app/proguard-rules.pro) includes rules for every library (`react-native-mmkv`, `nitro-modules`, `reanimated`, `screens`, `notifee`, `unistyles`) to prevent runtime crashes.
   - Retains line numbers for crash tracking services.
2. **Hermes Bytecode Compilation**:
   - `hermesFlags = ["-O", "-output-source-map"]` compiles the JavaScript bundle into binary bytecode (`.hbc`), preventing plaintext extraction.
3. **Metro Terser Identifier Mangling**:
   - Configured in [`metro.config.js`](metro.config.js) to mangle local variable/function names to single-letter tokens and remove dead code.
4. **Console Log Stripping**:
   - `babel-plugin-transform-remove-console` strips `console.log` automatically from production builds while keeping errors and warnings.

---

## 🌐 Global Loader & Network Architecture

### 1. Global Loader (`react-native-root-siblings`)

The loader is rendered imperatively via `react-native-root-siblings`, bypassing React Native `<Modal>` layering issues on iOS and Android.

- **Controllable Anywhere**: Use `GlobalLoader.show('Loading...')` or `AppConstant.showLoader('Loading...')`.
- **Reference Counted**: If two async tasks trigger the loader, the loader remains visible until both finish. Calling `hide(true)` force-resets it immediately.
- **Hardware Back Button**: Automatically disabled while the loader overlay is visible.

```typescript
import { AppConstant } from '@config';

// Show loader with reference count increment
AppConstant.showLoader('Saving changes...');

try {
  await api.save();
} finally {
  // Decrements counter; dismisses overlay when count reaches 0
  AppConstant.hideLoader();
}
```

### 2. API Request Cancellation on Unmount

To prevent memory leaks and unmounted component state updates:

- **Redux Toolkit**: RTK thunks pass `signal` into Axios. Calling `promise.abort()` in `useEffect` cleanup immediately cancels the mobile network socket.
  ```typescript
  useEffect(() => {
    const promise = dispatch(fetchPhotos({ page: 1 }));
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  ```
- **Direct Calls (`useApiCancellation`)**: For local-state components:
  ```typescript
  const { signal } = useApiCancellation();

  useEffect(() => {
    apiClient.get('/details', { signal });
  }, [signal]);
  ```
- **Bulk Cancellation**: `AppConstant.cancelAllRequests()` is automatically called upon user logout (`useAuthStore.logout()`) and 401 token refresh failures.

### 3. Industry-Level Network Issue Normalizer (`normalizeApiError`)

Defined in [`src/api/errors.ts`](src/api/errors.ts), this helper unifies Axios, network, timeout, and JavaScript errors into a structured shape:

```typescript
import { normalizeApiError } from '@api';

try {
  const result = await apiClient.get('/endpoint');
} catch (error) {
  const { message, isNetworkError, isTimeout, isCanceled } = normalizeApiError(error);

  if (isCanceled) {
    // Silently ignore aborted requests on unmount
    return;
  }

  // User-facing message: "Unable to connect to the server. Please check your internet connection."
  showErrorMessage(message);
}
```

---

## 🔔 Native Bottom Toast & Global Network Error Display

Powered by `react-native-toast-message`, our toast architecture is customized into a native HUD capsule anchored at the **bottom of the screen** (`position: 'bottom'`).

### 1. Visual HUD Design & Types
- **Variants**: `error` (crimson), `success` (emerald), `warning` (amber), `info` (azure).
- **Surface Elevation**: Rendered inside a rounded capsule (18dp corner radius) with subtle border contrast and dual-mode dark/light elevation.
- **Dismiss Interaction**: Includes an icon badge, title, subtitle message, and touchable close button.

### 2. Auto-Clearance Above Soft Navigation Bars
Instead of a static bottom margin, the toast calculates its `bottomOffset` dynamically:
```typescript
bottomOffset: Math.max(insets.bottom, Platform.OS === 'android' ? 16 : 10) + 16
```
This guarantees the toast sits gracefully above the Android 3-button bar or iOS home bar.

### 3. Imperative Static API
Use `Toast` from `@components/organisms` anywhere in UI components, sagas, thunks, or helper classes:
```typescript
import { Toast } from '@components/organisms';

Toast.error('Server timed out', 'Request Failed');
Toast.success('Saved to wishlist');
Toast.warning('Battery level low');
Toast.info('Sync in progress');
Toast.hide();
```

### 4. Global Interceptor Integration (`src/api/client.ts`)
Zero-boilerplate error notification: When any network error (`ERR_NETWORK`) or 5xx server failure occurs, the response interceptor automatically triggers:
```typescript
Toast.error(
  'Unable to connect to the server. Please check your internet connection.',
  'Network Error',
);
```
Pass `{ silent: true }` in Axios request config to disable automatic error toasts for background ping requests.

---

## 🗂️ Bottom Sheet Modals — Stacked & Keyboard-Handled

Implemented using `@swmansion/react-native-bottom-sheet` (Software Mansion's official bottom sheet) inside `<BottomSheetProvider>`.

### 1. Dual-Level Stacked Bottom Sheets (`StackedBottomSheet.tsx`)
Enables opening a modal sheet on top of another modal sheet with layered dimming backdrops:
- **Level 1 Sheet**: Snap points configured with `detents={[0, '55%', '85%']}`.
- **Level 2 Stacked Sheet**: Snap points configured with `detents={[0, '42%', '70%']}`, presented over Level 1.
- Both sheets share smooth dismiss gestures, pan-down-to-close physics, layered scrims, and independent ref controllers (`StackedBottomSheetRef`).

```typescript
import { StackedBottomSheet, StackedBottomSheetRef } from '@components/organisms';

const sheetRef = useRef<StackedBottomSheetRef>(null);

// Open Level 1 sheet
sheetRef.current?.present();
```

### 2. Keyboard-Handled Bottom Sheet (`KeyboardBottomSheet.tsx`)
Prevents inputs from being obscured by the virtual keyboard:
- Utilizes `ModalBottomSheet` with `detents={[0, 'content']}`.
- Pairs with `KeyboardAwareScrollView` from `react-native-keyboard-controller` (following official Swmansion examples).
- **Smart Backdrop Interaction**: Powered by `useKeyboardState` from `react-native-keyboard-controller`. Tapping the scrim/backdrop when the soft keyboard is visible dismisses the keyboard (`Keyboard.dismiss()`) while preserving the open sheet. Tapping the backdrop when the keyboard is hidden dismisses the bottom sheet (`setIndex(0)`).
- Includes interactive dismiss on drag, automatic input scrolling, and safe bottom padding above the Android navigation bar.

```typescript
import { KeyboardBottomSheet, KeyboardBottomSheetRef } from '@components/organisms';

const keyboardSheetRef = useRef<KeyboardBottomSheetRef>(null);

// Open interactive input sheet
keyboardSheetRef.current?.present();
```

---

## 📱 Android On-Screen Soft Navigation Bar & Notch Architecture

### 1. Device Notch & Status Bar (Zero Extra Height Guarantee)
To avoid the common "double notch spacing / extra top height" pitfall:
- **No Duplicate Safe Areas**: Screen container views use `{ flex: 1, backgroundColor: theme.colors.background }` with **zero** `paddingTop` and no nested `SafeAreaView`.
- **Organism Header Ownership**: The [`Header`](src/components/organisms/Header.tsx) organism is the single authority for top inset clearance, applying `paddingTop: insets.top` above a standard 52dp action bar.
- **Full Screen Consistency**: Navigation stack routes (`ProductDetail`, `TabViewDemo`, `LanguageSelect`) use native slide transitions (`animation: 'slide_from_right'`), guaranteeing uniform top notch alignment across iOS (Dynamic Island / Notch) and Android.

### 2. On-Screen Soft Navigation Bar Handling
On Android devices without physical buttons, navigation is handled on-screen:
1. **3-Button Navigation**: Back, Home, Recent Apps (~48-60dp height).
2. **2-Button Navigation**: Back + Pill (~40dp height).
3. **Gesture Navigation**: Slim swipe bar (~16-24dp height).

#### The Inset Pitfall
On devices with transparent status/nav bars (`edge-to-edge`), `insets.bottom` may report `0` or small values if the view does not explicitly query the window inset provider or if the user switches navigation modes.

#### Standardized Universal Safe Clearance Formula
Across all bottom-anchored overlays (bottom sheets, toasts, action bars, bottom tabs), we apply:
```typescript
const insets = useSafeAreaInsets();
const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 16 : 10) + 12;
```
- **Modal Sheets**: Applied as dynamic content safe padding in `<ModalBottomSheet>`.
- **Toasts**: Handled via `bottomOffset: Platform.OS === 'android' ? 56 : 40` without redundant card margins.
- **Scrollable Scenes**: Added to `paddingBottom: insets.bottom + 24`.

### 3. Provider Nesting Order & Portal Contexts
In [`src/App.tsx`](src/App.tsx), providers are layered hierarchically:
```tsx
<GestureHandlerRootView>
  <ErrorBoundary>
    <SafeAreaProvider>
      <KeyboardProvider>
        <BottomSheetProvider>
          <RootSiblingParent>
            <Provider store={store}>
              <NavigationContainer>
                <StatusBar barStyle={...} />
                <RootNavigator />
              </NavigationContainer>
            </Provider>
          </RootSiblingParent>
          <RNToastMessage config={toastConfig} />
        </BottomSheetProvider>
        {Config.APP_ENV !== 'production' && <BugBubble />}
      </KeyboardProvider>
    </SafeAreaProvider>
  </ErrorBoundary>
</GestureHandlerRootView>
```
- **Why `KeyboardProvider` wraps `BottomSheetProvider`**: `ModalBottomSheet` renders overlays into the `BottomSheetProvider` portal host. By wrapping `BottomSheetProvider` inside `KeyboardProvider`, any sheet content mounted in the modal portal (such as `KeyboardBottomSheet` with `KeyboardAwareScrollView`) inherits `KeyboardContext` seamlessly without context missing warnings.
- **Edge-to-Edge Detection**: With React Native 0.88, edge-to-edge is enabled natively by default. `react-native-keyboard-controller` automatically detects this (`IS_EDGE_TO_EDGE = true`). Explicitly passing `statusBarTranslucent` or `navigationBarTranslucent` is unnecessary and triggers dev warnings (`"statusBarTranslucent and navigationBarTranslucent values are ignored when using react-native-edge-to-edge"`); omitting them allows the library to apply edge-to-edge handling cleanly.
- **Async Debugger Notifications**: Debugger listener notifications in `BugBubble` are dispatched via `queueMicrotask()`, preventing synchronous `setState` during render in React 19.
- **Unistyles Status Bar & Native Window Synchronization**: `UnistylesRuntime.statusBar.setStyle(isDark ? StatusBarStyle.Light : StatusBarStyle.Dark, true)` and `UnistylesRuntime.setRootViewBackgroundColor(theme.colors.background)` synchronize native iOS UIKit and Android window decorations directly on theme toggle (`light`, `dark`, `auto`). In addition, `RootNavigator` specifies `statusBarStyle: isDark ? 'light' : 'dark'` so `react-native-screens`'s `preferredStatusBarStyle` is always in full agreement with the active theme.

---

## 🧪 Interactive Features Lab — TabViewDemoScreen

Located at [`src/features/home/screens/TabViewDemoScreen.tsx`](src/features/home/screens/TabViewDemoScreen.tsx), this screen provides an interactive lab to verify all components on a live device:
- **Tab 1: Bottom Sheets**: Live triggers for Dual-Level Stacked Modal Sheets and Keyboard-Handled Modal Sheets.
- **Tab 2: Toast & Network**: Interactive buttons to simulate network drops, 500 server errors, warning HUDs, and bulk API request cancellation.
- **Tab 3: Architecture**: Complete matrix of libraries, architectural guarantees, and unit test coverage.

**Direct Navigation Entry Points**:
- **HomeScreen**: Tap the **"Features Lab"** top banner.
- **SettingsScreen**: Tap **"Features & UI Lab"** in the list.

---

## 🧪 Testing Guide — Jest + RNTL (21 Suites, 85 Tests)

All test files are stored in the root `__tests__/` directory, mirroring the `src/` directory structure.

```bash
# Run all Jest unit tests
yarn test

# Run tests with code coverage report
yarn test:coverage
```

### Custom `render` Wrapper:

[`__tests__/test-utils.tsx`](__tests__/test-utils.tsx) automatically provides a fresh Redux store and Navigation wrapper for every test:

```tsx
import { render, screen, fireEvent } from '@test-utils';
import { Button } from '@components/atoms';

it('handles button press', async () => {
  const onPress = jest.fn();
  await render(<Button title="Submit" onPress={onPress} />);

  fireEvent.press(screen.getByTestId('button-touchable'));
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

---

## 🛠️ NPM Scripts & Shortcuts

| Script | Command | Description |
| --- | --- | --- |
| **`yarn start`** | `react-native start --reset-cache` | Start Metro bundler with cache reset |
| **`yarn android`** | `react-native run-android --mode=developmentDebug` | Run Android in Development mode |
| **`yarn android:staging`** | `react-native run-android --mode=stagingDebug` | Run Android in Staging mode |
| **`yarn android:prod`** | `react-native run-android --mode=productionDebug` | Run Android in Production mode |
| **`yarn ios`** | `react-native run-ios --scheme RN_Boilerplate_Latest_Dev` | Run iOS in Development mode |
| **`yarn ios:staging`** | `react-native run-ios --scheme RN_Boilerplate_Latest_Staging` | Run iOS in Staging mode |
| **`yarn ios:prod`** | `react-native run-ios --scheme RN_Boilerplate_Latest` | Run iOS in Production mode |
| **`yarn build:android`** | `cd android && ./gradlew assembleProductionRelease && cd ..` | Build Production Release APK |
| **`yarn build:android:debug`** | `cd android && ./gradlew assembleDevelopmentDebug && cd ..` | Build Development Debug APK |
| **`yarn bundle:android`** | `cd android && ./gradlew bundleProductionRelease && cd ..` | Build Production Release Bundle (`.aab` for Play Store) |
| **`yarn build:ios`** | `react-native build-ios --mode Release --scheme RN_Boilerplate_Latest` | Build iOS in Release mode |
| **`yarn install:all`** | `yarn install && (bundle install \|\| true) && cd ios && (bundle exec pod install \|\| pod install) && cd ..` | Install Node, Ruby, and CocoaPods dependencies |
| **`yarn openAS`** | `open -a "Android Studio" android` | Open Android project in Android Studio |
| **`yarn openWS`** | `xed -b ios` | Open iOS workspace in Xcode |
| **`yarn clean:install`** | `bash scripts/clean-install.sh` | Deep clean caches & fresh dependency install |
| **`yarn typecheck`** | `tsc --noEmit` | Validate TypeScript types (0 errors) |
| **`yarn lint`** | `eslint .` | Run ESLint across project |
| **`yarn lint:fix`** | `eslint . --fix` | Automatically fix linting issues |
| **`yarn format`** | `prettier --write .` | Format all files with Prettier |
| **`yarn test`** | `jest` | Run all 21 test suites in `__tests__/` (85 tests) |
| **`yarn test:coverage`** | `jest --coverage` | Run tests with coverage summary |
| **`yarn knip:check`** | `knip` | Detect unused files, exports & dependencies |
