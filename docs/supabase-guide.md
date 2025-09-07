# Supabase Guide

Authoritative schema

- supabase/schema.sql (table definitions, policies, functions)
- supabase/migrations/ (chronological changes; add new migrations for changes)

Local setup (optional but recommended)

- Install Supabase CLI: https://supabase.com/docs/guides/cli
- Start local stack: supabase start
- Link project (if using remote): supabase link --project-ref <ref>
- Pull remote migrations (read-only): supabase db pull

Environment variables (App)

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server-only)

Auth model

- users table is keyed to auth.users (id matches auth.uid())
- Create user profile rows with id = auth.uid()
- RLS ensures users can only read/update their own profile row

Key tables and usage

- sref_codes: public SELECT, owner-controlled writes; counters store engagement
- code_images: normalized images per code with position
- code_tags: tag strings per code (UNIQUE(code_id, tag))
- saved_codes: represents Favorites (UNIQUE user/code)
- code_votes: upvote/downvote; use server-side update of counters
- folders, folder_codes: personal organization, supports nesting
- waitlist: basic status tracking; admin-only reads

RLS highlights

- Public read on sref_codes, code_images, code_tags
- Ownership checks for inserts/updates/deletes on codes, images, tags
- Per-user access on folders, folder_codes, saved_codes, code_votes

RPCs

- update_code_vote_counts(code_id UUID): recomputes upvote/downvote counts on sref_codes.

Patterns (server)

- Instantiate Supabase client with auth context in Route Handlers/Server Actions
- Never expose service role key to the client
- Use UNIQUE constraints (saved_codes, folder_codes, code_votes) to avoid duplicates

Migrations workflow

- Propose schema changes in a new file under supabase/migrations/ with a descriptive name
- Do not rewrite existing migrations
- If an RLS change is required, include CREATE POLICY/ALTER POLICY statements and test locally

Images & storage

- Store image URLs in code_images.image_url (typically Supabase Storage public URLs)
- Consider signed URLs for private scenarios; current model assumes public read access

## Troubleshooting Common RLS Issues

### RLS Policy Debugging
```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'sref_codes';

-- Test RLS policies
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid"}';
SELECT * FROM sref_codes;
```

### Common RLS Errors
1. **"new row violates row-level security policy"**
   - Check if auth.uid() matches user_id
   - Verify policy conditions are correct

2. **"permission denied for table"**
   - Ensure RLS policies exist for the operation
   - Check if user has proper role

3. **"JWT expired"**
   - Refresh auth token
   - Check token expiration settings

### Connection Issues
- Verify environment variables
- Check Supabase project status
- Test with simple query first
- Monitor connection pool usage

### General Troubleshooting
- Ensure auth.uid() context exists when debugging RLS-denied writes
- Verify policies for DELETE/UPDATE on code_images/code_tags (fixed in 20250121 migration)

