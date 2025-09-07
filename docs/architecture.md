# Architecture Overview

## System Components

### Frontend Stack
- **Next.js 14** (App Router)
  - Server Components for data fetching and SEO
  - Client Components for interactivity only
  - Route Handlers (app/api/*) for server-side operations
  - Middleware for auth and redirects
- **UI Framework**: Subframe component library + Tailwind CSS
- **State Management**: React Context + Supabase client state

### Backend Stack
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime (future)

### Hosting & Deployment
- **Primary**: Netlify (preferred)
- **CDN**: Built-in Netlify CDN
- **Environment**: Node.js runtime

## Data Flow Patterns

### Unauthenticated Discover Flow
```
User Request → Server Component → Supabase Query (public) → Render Cards
```

### Authenticated Actions Flow
```
User Action → Client Component → Route Handler → Supabase Mutation → RLS Check → Response
```

### Search & Filter Flow
```
User Input → URL State → Server Component → Supabase Query → Filtered Results
```

## Component Architecture

### Layout Hierarchy
```
DefaultPageLayout
├── SideBarNavigation
├── MainNavigation
└── Page Content
    ├── SearchHeader
    ├── FilterControls
    └── SrefGrid
        └── SrefCard[]
```

### State Management Strategy
- **Server State**: Supabase queries in Server Components
- **Client State**: React Context for auth, local state for UI
- **URL State**: Search parameters for filters
- **Form State**: React Hook Form for complex forms

## Directory Structure

```
app/
├── (routes)/
│   ├── discover/
│   ├── favorites/
│   └── library/
├── api/
│   ├── sref-codes/
│   │   ├── route.ts (list/create)
│   │   └── [id]/route.ts (read/update/delete)
│   ├── votes/route.ts
│   └── favorites/route.ts
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── ui/ (Subframe-based building blocks - DO NOT MODIFY)
├── layout/ (Layout components)
├── navigation/ (Navigation components)
├── sref/ (SREF-specific components)
└── common/ (Shared utility components)

lib/
├── supabase/
│   ├── server.ts (server client)
│   ├── client.ts (client limited)
│   └── errors.ts (error handling)
├── validators/ (Zod schemas)
├── hooks/ (Custom React hooks)
└── utils/ (Utility functions)

src/
└── staging/ (Page views from Subframe - Agent modifiable)
```

## Security & RLS

### Access Control Model
- **Public Read**: codes/images/tags readable without auth
- **Ownership Writes**: code modifications require auth.uid() match
- **Per-User Resources**: folders, favorites, votes scoped to user
- **Service Role**: Never expose to client; server-side only

### RLS Policy Patterns
```sql
-- Public read example
CREATE POLICY "Public read access" ON sref_codes
FOR SELECT USING (true);

-- Ownership write example
CREATE POLICY "Owner can modify" ON sref_codes
FOR ALL USING (auth.uid() = user_id);
```

## Performance Optimization

### Server-Side Optimizations
- Use Server Components for initial data loading
- Implement pagination for large datasets
- Add database indexes on frequently queried columns
- Use Supabase connection pooling

### Client-Side Optimizations
- Lazy load images with Next.js Image component
- Implement virtual scrolling for large lists
- Use React.memo for expensive components
- Optimize bundle size with dynamic imports

### Caching Strategy
- Static generation for public pages
- ISR for semi-dynamic content
- Client-side caching for user-specific data
- CDN caching for static assets

## Error Handling Strategy

### Error Boundaries
- Global error boundary for unhandled errors
- Route-level error boundaries for page-specific errors
- Component-level error boundaries for isolated failures

### API Error Handling
- Standardized error response format
- User-friendly error messages
- Proper HTTP status codes
- Error logging and monitoring

### Database Error Handling
- RLS violation handling
- Constraint violation mapping
- Connection error retry logic
- Transaction rollback on failures

## Monitoring & Observability

### Logging Strategy
- Structured logging with context
- Error tracking with stack traces
- Performance monitoring
- User interaction analytics

### Health Checks
- Database connection monitoring
- API endpoint health checks
- External service dependency checks
- Performance metrics tracking

## Future Expansion Considerations

### Scalability
- Edge runtime for read-only endpoints
- Background jobs with Netlify Functions
- Database read replicas for heavy queries
- Microservice extraction for complex features

### Feature Additions
- Real-time updates with Supabase Realtime
- Advanced search with full-text search
- Image processing pipeline
- Mobile app with shared API

