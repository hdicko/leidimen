#!/usr/bin/env bash
set -euo pipefail
# Scan repository source for remaining inline style="..." occurrences (excludes generated public/)
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[scan-inline-styles] Searching for inline style occurrences in source files..."
# Allow grep to fail without exiting the script
# Exclude: public/, node_modules/, .git/, .venv/, *.md, *.py
matches=$(grep -R \
  --exclude-dir=public \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=.venv \
  --exclude-dir=.github \
  --exclude='*.md' \
  --exclude='*.py' \
  -n 'style="' layouts/ assets/ static/js/ content/ 2>/dev/null || true)

if [ -z "$matches" ]; then
  echo "[scan-inline-styles] No inline style found in source."
  exit 0
else
  echo "[scan-inline-styles] Found inline style occurrences:"
  echo "$matches"
  echo
  count=$(echo "$matches" | wc -l)
  echo "Count: $count"
  exit 2
fi
