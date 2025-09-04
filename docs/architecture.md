# Architecture Overview

System components

- Next.js 14 (App Router)
  - Server Components for data fetching where possible
  - Route Handlers (app/api/*) for server-side operations
  - Client Components for interactivity only
- UI: Subframe component library + Tailwind CSS
- Backend: Supabase (PostgreSQL, Auth, Storage)
- Hosting: Netlify (preferred)

Data flow (typical)

- Unauthenticated Discover
  - Client requests page → Server Component queries sref_codes (public SELECT)
  - Render code cards with first image, tags

- Authenticated actions
  - User signs in (Supabase Auth)
  - Client sends request to Route Handler with session
  - Handler uses Supabase server client with auth context to insert/update rows (RLS-enforced)

Directory structure (suggested)

- app/
  - (routes)/discover
  - (routes)/favorites
  - (routes)/library
  - api/
    - sref-codes/route.ts (list/create)
    - sref-codes/[id]/route.ts (read/update/delete)
    - votes/route.ts
    - favorites/route.ts
- components/
  - ui/ (Subframe-based building blocks)
  - sref/
- lib/
  - supabase/server.ts (server client)
  - supabase/client.ts (client limited)
  - validators/
- docs/
- supabase/

Security & RLS

- Public read model: codes/images/tags readable without auth
- Ownership writes: code, image, tag modifications require auth.uid() to match owner
- Per-user resources: folders, favorites, votes are scoped to the user
- Never expose service role key to the client; keep privileged logic server-side

Performance notes

- Use Server Components for initial lists to reduce client JS
- Paginate Discover queries and index on sref_codes(title, created_at) as needed
- Lazy-load images and prefer optimized formats

Error handling

- Use typed responses in route handlers { ok: boolean, data?: T, error?: string }
- Map database errors (unique constraint violations) to user-friendly messages

Observability

- Log key events server-side (without secrets)
- Consider lightweight analytics on page views and interactions (respect privacy)

Deployments

- Netlify-first. See docs/netlify-deployment.md for runtime and env details
- Push to main triggers deploy; use preview builds for feature branches if configured

Future expansion

- Edge runtime for read-only endpoints if latency-sensitive
- Background jobs (Netlify Scheduled Functions) for maintenance tasks

