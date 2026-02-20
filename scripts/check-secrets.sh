#!/usr/bin/env bash
# Simple project secret scanner — exits non-zero if suspicious strings found
set -euo pipefail

echo "Scanning repo for likely secrets..."
PATTERNS=("API_KEY" "APIKEY" "SECRET" "TOKEN" "PRIVATE_KEY" "ACCESS_KEY" "SECRET_KEY" "AUTH_TOKEN" "JWT" "client_secret" "PASSWORD" "BEGIN PRIVATE KEY" "BEGIN RSA PRIVATE KEY")
FOUND=0
for p in "${PATTERNS[@]}"; do
  if git grep -n -I --line-number --ignore-case "$p" -- . > /dev/null 2>&1; then
    echo "Potential match for: $p"
    git grep -n -I --line-number --ignore-case "$p" -- . || true
    FOUND=1
  fi
done

if [ "$FOUND" -eq 1 ]; then
  echo "Checks failed — see potential matches above."
  exit 2
fi

echo "No obvious secrets found by heuristic scan."
exit 0
