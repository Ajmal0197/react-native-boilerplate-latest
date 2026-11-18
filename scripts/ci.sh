#!/usr/bin/env bash
# Quality gates for any CI host. GitHub Actions and GitLab CI both call this.
# Other hosts (Jenkins, Bitbucket, CircleCI, Azure Pipelines) run the same command:
#   bash scripts/ci.sh          # typecheck, lint, format, tests, knip
#   bash scripts/ci.sh audit    # production dependency audit
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MODE="${1:-quality}"

activate_yarn() {
  if ! command -v corepack >/dev/null 2>&1; then
    echo "corepack is missing. Install Node >= 22.11 (see .nvmrc)." >&2
    exit 1
  fi
  export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
  corepack enable
  corepack prepare yarn@3.6.4 --activate
  echo "node $(node -v)"
  echo "yarn $(yarn -v)"
}

write_placeholder_keys() {
  local f
  for f in keys.json keys.development.json keys.staging.json keys.production.json; do
    if [[ ! -f "$f" ]]; then
      cp keys.example.json "$f"
    fi
  done
}

case "$MODE" in
  quality)
    activate_yarn
    yarn install --immutable
    write_placeholder_keys
    yarn typecheck
    yarn lint
    yarn format:check
    yarn test --coverage --ci
    yarn knip:check
    ;;
  audit)
    activate_yarn
    yarn install --immutable
    yarn npm audit --environment production
    ;;
  *)
    echo "Usage: bash scripts/ci.sh [quality|audit]" >&2
    exit 1
    ;;
esac
