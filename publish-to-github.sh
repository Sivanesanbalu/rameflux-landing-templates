#!/usr/bin/env bash
# Sync the packaged Frameflux v0.1 source to the connected GitHub repository.
# Usage: bash publish-to-github.sh [owner/repository]
set -euo pipefail

REPO="${1:-Sivanesanbalu/rameflux-landing-templates}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

for command in git python3 rsync; do
  if ! command -v "$command" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$command" >&2
    exit 1
  fi
done

printf 'Validating Frameflux source...\n'
python3 "$PROJECT_DIR/scripts/package_orbit.py"
python3 "$PROJECT_DIR/scripts/check_site.py"

printf 'Cloning https://github.com/%s.git ...\n' "$REPO"
git clone "https://github.com/$REPO.git" "$TMP_DIR/remote"

printf 'Copying project files into your GitHub repository...\n'
rsync -a --exclude='.git' --exclude='*.DS_Store' "$PROJECT_DIR/" "$TMP_DIR/remote/"
cd "$TMP_DIR/remote"

git add -A
if git diff --cached --quiet; then
  printf 'Repository already contains the same files. Nothing to push.\n'
  exit 0
fi

git commit -m 'chore: sync Frameflux source'
git push -u origin HEAD:main
printf '\nSUCCESS: uploaded Frameflux to https://github.com/%s\n' "$REPO"
printf 'Cloudflare Pages: production branch main, framework None, output directory site.\n'
