# Netlify Deployment (Next.js 14 App Router)

This project prefers Netlify for hosting and CI/CD. Pushes to the main branch should trigger builds. Local dev can use either `netlify dev` or `next dev`.

Build & runtime overview

- Framework: Next.js 14+ (App Router)
- Netlify Runtime: Official Netlify Next.js Runtime (build plugin) supports App Router, middleware, and ISR.
- Functions: Route handlers run on Netlify Functions (Node) or Edge Functions depending on Next route config.

Recommended scripts

- dev: next dev
- build: next build
- start: next start

Example netlify.toml

[build]
  command = "npm run build"
  publish = ".next"

[plugins]
  package = "@netlify/plugin-nextjs"

# Optional: environment-specific redirects or headers
# [[redirects]]
#   from = "/api/*"
#   to = "/.netlify/functions/next"
#   status = 200

Local development

Option A: Netlify Dev (recommended)
- Install: npm i -g netlify-cli
- Auth: netlify login
- Run: netlify dev
- Benefits: Emulates Netlify’s runtime locally (functions, edge, redirects), proxies Next dev server.

Option B: Next Dev
- Run: npm run dev
- Use when you only need pure Next.js without Netlify emulation.

Environment variables

- Store secrets in Netlify UI or via netlify env: netlify env:set NAME value
- Do not echo or print secret values in scripts or logs.
- For Supabase, set at least:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (server-side only; avoid in client)

Supabase considerations

- RLS requires user context; prefer server actions/route handlers with Supabase auth helpers.
- Avoid long-lived service role keys in client. Use server-only functions for privileged operations.

Deployment flow

- Connect repo to Netlify (main branch)
- Configure environment variables in Netlify UI
- First deploy builds with @netlify/plugin-nextjs
- Subsequent pushes to main auto-deploy

Troubleshooting tips

- If routes 404 in production, verify @netlify/plugin-nextjs installed and netlify.toml present.
- Large images: enable Next image optimization; ensure domains allowed in next.config.js.
- Edge vs Node: choose per-route runtime if needed. Default Node is fine for Supabase server clients.

Notes for Subframe styling

- This project relies on Tailwind v3 for Subframe-generated utilities. If styles look unstyled after a dependency or config change, confirm the Tailwind v3 wrapper is in place (see docs/subframe-troubleshooting.md).

