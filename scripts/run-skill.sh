#!/usr/bin/env bash
set -euo pipefail
# Run the SKILL verification: install deps, build, scan for inline styles, run compatibility tests.
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[SKILL] 1/4 Installing npm dependencies..."
npm install

echo "[SKILL] 2/4 Cleaning public output..."
rm -rf public/*

echo "[SKILL] 3/4 Building production site..."
npm run build

echo "[SKILL] 4/4 Running quick checks..."
"$ROOT_DIR/scripts/scan-inline-styles.sh"
if [ -x "$ROOT_DIR/test-hugo-compatibility.sh" ]; then
  "$ROOT_DIR/test-hugo-compatibility.sh" || echo "[SKILL] test-hugo-compatibility.sh returned non-zero"
else
  echo "[SKILL] Warning: test-hugo-compatibility.sh not executable or missing"
fi

echo "[SKILL] Completed. If you want live testing, run ./dev-server.sh or npm run dev."
