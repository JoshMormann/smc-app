# Migration Plan (smc-manager → smc-app)

Scope

- Application rebuild and re-organization. Backend (Supabase) schema is already aligned in both repos.
- Frontend moves to Next.js 14 App Router + Subframe.

What carries over

- Supabase schema: supabase/schema.sql and migrations are the same in both projects
- RLS policies and RPCs (e.g., update_code_vote_counts)
- Core concepts: Codes, Favorites (saved_codes), Votes (code_votes), Tags, Images, Folders

What changes in the app

- UI rebuilt using Subframe components
- App Router layout and route handlers replace older patterns
- Documentation structure updated; PRD no longer embeds SQL schema (defers to supabase/)

Deprecated or corrected assumptions

- No is_public column; public read is via RLS allowing SELECT true
- No user_interactions table; use saved_codes and code_votes. copy_count remains on sref_codes
- users table includes tier and waitlist_status; no avatar_url column in current schema

Milestones

1) Baseline foundation
- Verify environment variables and Supabase client setup
- Implement app shell (sidebar + top navigation)

2) Discover
- Public list of sref_codes with images and tags
- Search by title/tag

3) Favorites
- Persist via saved_codes with UNIQUE(user_id, code_id)
- Ensure RLS filters

4) Library (My Codes)
- CRUD for sref_codes + images + tags (owner only)
- Ensure folder organizing flows

5) Votes & Metrics
- Upvote/downvote with code_votes
- Use RPC to refresh counters if needed

Verification checklist

- RLS: Cannot read/write other users' private relations (folders, saved_codes, votes)
- Public read: Unauthed users can browse codes/images/tags
- Ownership writes: Only owner can modify their codes/images/tags
- Favorites: No duplicates possible (UNIQUE constraint)
- Votes: Toggling/updating behaves correctly, counters are consistent

Cutover notes

- Since schema is unchanged, no DB migration is required for the switchover
- Ensure Netlify deploy environment matches local env vars and supabase URL/keys
- Monitor logs post-launch for RLS violations or rate limits

