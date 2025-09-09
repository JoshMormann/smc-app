# Quick Reference

## Key Commands
- **Dev**: `npm run dev` or `netlify dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Essential URLs
- **Local**: http://localhost:3000
- **Supabase Dashboard**: [Check environment variables]
- **Subframe**: [Design system source]

## Key File Locations
- **Schema**: `supabase/schema.sql` (authoritative)
- **Migrations**: `supabase/migrations/`
- **Subframe Components**: `src/ui/components/` (DO NOT MODIFY)
- **Custom Components**: `components/`
- **API Routes**: `app/api/`
- **Pages**: `app/`
- **Specs**: `.kiro/specs/`

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key (server-only)
```

## Common Patterns

### Auth Check
```typescript
const { data: { user } } = await supabase.auth.getUser()
if (!user) return // Handle unauthenticated
```

### RLS Context
```typescript
// Always include auth.uid() for user-scoped queries
const { data } = await supabase
  .from('saved_codes')
  .select('*')
  .eq('user_id', user.id)
```

### API Error Format
```typescript
type ApiResponse<T> = {
  ok: boolean
  data?: T
  error?: string
  code?: string
}
```

### Supabase Client Creation
```typescript
// Server-side
import { createClient } from '@/lib/supabase/server'
const supabase = createClient()

// Client-side (limited)
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
```

## Core Tables
- **sref_codes**: Main SREF data (public read, owner write)
- **code_images**: Normalized images per code
- **code_tags**: Normalized tags per code
- **saved_codes**: User favorites (unique per user/code)
- **code_votes**: Upvotes/downvotes (unique per user/code)
- **folders**: User organization
- **users**: Profile data (matches auth.users.id)

## Navigation Structure
- **Discover**: Public SREF browsing (home)
- **Favorites**: User's saved codes (auth required)
- **Library**: User's created codes (auth required)

## Tech Stack
- **Frontend**: Next.js 15 + React 19
- **UI**: Subframe + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Netlify (preferred)

## Critical Rules
1. **Never modify** `src/ui/components/` (Subframe exports)
2. **Always use migrations** for schema changes
3. **Include auth context** for RLS queries
4. **Follow ownership model** for writes
5. **Use wrapper components** to extend Subframe functionality