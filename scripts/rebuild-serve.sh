#!/usr/bin/env bash
set -euo pipefail
# Clean and start the local dev server (uses ./dev-server.sh if present).
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[rebuild-serve] Cleaning public and installing deps..."
rm -rf public/*
npm install

if [ -x ./dev-server.sh ]; then
  echo "[rebuild-serve] Starting dev-server.sh"
  ./dev-server.sh
else
  echo "[rebuild-serve] dev-server.sh not found/executable — falling back to 'npm run dev'"
  npm run dev
fi
