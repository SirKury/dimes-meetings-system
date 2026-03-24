#!/usr/bin/env bash
set -euo pipefail

# Resolve known conflicts from Phase 2 PRs by keeping the current branch implementation.
# Run this only while an in-progress merge/rebase has conflicts.

FILES=(
  ".env.example"
  "README.md"
  "apps/api/package.json"
  "apps/api/src/app.module.ts"
  "apps/api/src/auth/auth.controller.ts"
  "apps/api/src/auth/auth.module.ts"
  "apps/api/src/auth/auth.service.ts"
  "apps/api/src/auth/dto/login.dto.ts"
  "apps/api/src/establishments/dto/create-establishment.dto.ts"
  "apps/api/src/establishments/establishments.controller.ts"
  "apps/api/src/establishments/establishments.service.ts"
)

for file in "${FILES[@]}"; do
  if [[ -f "$file" ]] || git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    git checkout --ours -- "$file" || true
    git add "$file" || true
  fi
done

echo "Known Phase 2 conflicts resolved with --ours strategy."
echo "Now run: git status && npm run -w @dimes/api typecheck && npm run -w @dimes/web typecheck"
