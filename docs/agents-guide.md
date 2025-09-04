# Agents Guide (Cursor + Claude Code)

Purpose

This guide gives AI coding agents the context and constraints needed to work effectively in this repo during the smc-manager → smc-app rebuild.

Project intent (high level)

- Rebuild UI/UX with Subframe components for sustainability and speed.
- Keep the current Supabase schema as the source of truth; evolve via migrations only.
- Deliver the MVP scope defined in docs/prd.md with a clean, maintainable Next.js 14 App Router architecture.
- Prefer Netlify for deployment and local dev ergonomics.

Key constraints and expectations

- Language/Runtime: TypeScript-first, Next.js 14 App Router. Avoid any legacy Pages Router patterns unless explicitly required.
- Data access: Supabase JS client on the server when possible; keep RLS in mind—queries must include auth context.
- Ownership model: Public read for codes; writes limited to code owners via RLS.
- Do not hardcode secrets or print them in logs. Use environment variables.
- Schema changes: Propose explicit migrations in supabase/migrations; do not re-edit existing migrations.

Terminology mapping

- “Favorites” in UX = saved_codes table relation (unique per user/code)
- Upvote/Downvote = code_votes with is_upvote boolean; counters are on sref_codes
- Tags, Images = normalized into code_tags and code_images

Directories to care about

- app/ (Next.js App Router)
- components/ (presentation components; prefer Subframe primitives)
- lib/ (helpers, Supabase client wrappers, validation)
- supabase/ (schema.sql, migrations/, functions/ if any)
- docs/ (this folder)

Coding conventions

- Naming: semantic, descriptive; prefer verbs for actions and nouns for data.
- Types: favor explicit types and zod or TS types for validation where appropriate.
- Async: use async/await; avoid unhandled promise rejections.
- Errors: return typed errors for API handlers; do not leak secrets.
- UI: keep components presentational; move data fetching to server components or route handlers when feasible.

RLS-aware patterns

- Reads: Public lists (discover) can query sref_codes without user context. User-specific reads (favorites, folders) must filter by auth.uid().
- Writes: Insert/Update/Delete require ownership or per-table policy checks—always pass user context.
- Counters: Use transactional updates or RPCs where appropriate (e.g., update_code_vote_counts) to avoid race conditions.

What not to change without approval

- Supabase schema.sql (outside of migrations)
- RLS policies unless there is an explicit task and associated migration
- Production environment variables or Netlify build settings

When proposing changes

- Add a short note in docs/ARCHITECTURE.md or docs/DECISIONS.md (if present) describing the change and reasoning.
- For database changes, add a new migration with a descriptive filename and an accompanying docs/ entry if it impacts the data model.

Testing and verification (lightweight)

- Add minimal route handler tests or utility tests when adding non-trivial logic.
- Provide a manual test plan in PR descriptions for UI changes.

Deployment assumptions

- Netlify-first. Local dev via `netlify dev` or standard `next dev`. See docs/netlify-deployment.md.

Quick references

- PRD: docs/prd.md (DB schema section defers to Supabase + docs/data-model.md)
- Data model: docs/data-model.md
- Supabase schema: supabase/schema.sql and supabase/migrations/

