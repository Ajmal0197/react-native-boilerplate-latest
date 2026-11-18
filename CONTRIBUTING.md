# Contributing

## Setup

```bash
nvm use                  # Node version from .nvmrc
yarn install:all         # JS deps + CocoaPods (also installs git hooks via `prepare`)
cp keys.example.json keys.development.json   # repeat for staging / production / keys.json
```

`keys.*.json` are git-ignored. Never commit them or any keystore.

## Workflow

1. Branch from `main`: `feat/<summary>`, `fix/<summary>` or `chore/<summary>`.
2. Keep changes small and focused; add or update tests for any behavior change.
3. Run the same gates CI runs, before pushing:

   ```bash
   yarn ci
   ```

4. Open a pull request (GitHub) or merge request (GitLab). Both run `scripts/ci.sh` and must be green. Any other CI host runs that same script.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org) are enforced by commitlint:

```
feat(auth): add refresh token rotation
fix(api): share a single in-flight token refresh
```

## Code standards

- Feature-first layout: new business logic lives in `src/features/<name>/` (`api/`, `components/`, `hooks/`, `screens/`, `store/`, `types/`, `validation/`, `index.ts`).
- Use path aliases (`@components`, `@services`, `@theme`, ...). Deep relative imports (`../../`) are lint errors.
- Style with `react-native-unistyles` and theme tokens only. No hex or `rgba` literals, no magic spacing.
- All user-facing text goes through `useTranslation()` / `i18n.t()`. Add keys to `src/locales/en.json`, `es.json` and `ar.json`.
- Key-value storage uses MMKV via `@services/storage`. Never use AsyncStorage.
- TypeScript is strict: no `any`, no `enum` (use union literals or `as const`).
- Forms use React Hook Form + Yup; schema messages are i18n keys resolved lazily.
- Native modules must be TurboModules/Fabric with Codegen specs in `specs/`.

## Android release signing

Set these in `~/.gradle/gradle.properties` or as environment variables (CI):

```
RELEASE_STORE_FILE=/absolute/path/to/release.keystore
RELEASE_STORE_PASSWORD=...
RELEASE_KEY_ALIAS=...
RELEASE_KEY_PASSWORD=...
```

CI release builds fail when signing is not configured. Local release builds fall back to the debug keystore with a warning; never publish those.

## Crash reporting

Register an adapter once at startup with `setCrashReporter` from `@services/crashReporting` (Sentry, Crashlytics, ...). Until then reporting is a no-op.
