# Phase 2 conflict resolution guide

If GitHub shows conflicts in these files during merge/rebase:

- `.env.example`
- `README.md`
- `apps/api/package.json`
- `apps/api/src/app.module.ts`
- `apps/api/src/auth/*`
- `apps/api/src/establishments/*`

use the repository's current branch implementation as source of truth, because it already includes:

1. Auth hardening (`auth/login` hash verification + JWT payload with `establishmentId`).
2. Role-based guards (`SUPERADMIN`, `DIMES_ADMIN`, `DIMES_USER`).
3. Establishment-aware restrictions and validated DTOs.
4. Phase 2 modules (meetings, participants, attendances, meeting-minutes).

## Automated helper

While merge/rebase is paused by conflicts, run:

```bash
bash scripts/resolve_phase2_conflicts.sh
```

Then complete validation and continue:

```bash
npm run -w @dimes/api typecheck
npm run -w @dimes/web typecheck
git status
git merge --continue   # or: git rebase --continue
```

