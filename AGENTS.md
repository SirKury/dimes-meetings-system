# AGENTS.md

## Repository expectations
- Respect the monorepo structure defined in README.md.
- Treat README.md as the main implementation contract.
- Prefer maintainable and production-oriented code over shortcuts.
- Keep frontend and backend clearly separated.
- Use TypeScript strictly.
- Use Prisma as the ORM and PostgreSQL as the database.
- Use NestJS for backend modules.
- Use Next.js for frontend.
- Do not collapse domain modules into generic files.
- Preserve modular architecture by domain.

## Implementation priorities
1. Set up monorepo, package manager, and base tooling.
2. Configure database, Prisma schema, and seeds.
3. Implement authentication and role-based access control.
4. Implement establishments and users.
5. Implement meetings, participants, attendance, and minutes.
6. Implement commitments, dashboard, audit logs, and attachments.
7. Add documentation and Docker support.

## Code quality rules
- Validate all input DTOs.
- Avoid duplicated logic.
- Use clear naming.
- Keep controllers thin and services focused.
- Add reusable shared types where appropriate.
- Document important assumptions in docs/.

## Review guidelines
- Flag missing authorization checks as critical.
- Flag missing validation as high priority.
- Flag broken repository structure as high priority.
- Flag schema inconsistencies as high priority.
- Flag hardcoded secrets as critical.
