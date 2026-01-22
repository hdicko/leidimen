#!/usr/bin/env bash
set -euo pipefail
# Scan repository source for remaining inline style="..." occurrences (excludes generated public/)
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[scan-inline-styles] Searching for inline 'style="' occurrences (excluding public/ and node_modules/)..."
# Allow grep to fail without exiting the script
matches=$(grep -R --exclude-dir=public --exclude-dir=node_modules -n 'style="' . || true)

if [ -z "$matches" ]; then
  echo "[scan-inline-styles] No inline style=\"...\" found in source (excluding public/)."
  exit 0
else
  echo "[scan-inline-styles] Found inline style occurrences:";
  echo "$matches"
  echo
  echo "Count: $(echo "$matches" | wc -l)"
  exit 2
fi
