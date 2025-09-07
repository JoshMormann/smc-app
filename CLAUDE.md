# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Core Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Environment Setup
- Copy `env.example` to `.env.local` and configure Supabase credentials
- Required environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only)

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **UI Framework**: Subframe Design System + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Netlify (primary)

### Directory Structure
```
app/                    # Next.js App Router pages
├── api/               # API routes (server-side operations)
├── discover/          # Main discover page
└── globals.css        # Global styles

src/
├── components/
│   ├── pages/         # Page components
│   └── ui/            # Subframe components (DO NOT MODIFY)
├── lib/
│   └── supabase/      # Database client configuration
└── staging/           # Subframe page views (agent modifiable)

docs/                  # Comprehensive architecture documentation
supabase/              # Database schema and migrations
```

### Key Architectural Patterns

#### Component Architecture
- **Subframe Components**: Never modify files in `src/ui/components/` - these are auto-generated
- **Component Extension**: Use wrapper components and composition patterns instead of modifying Subframe exports
- **Layout Hierarchy**: `DefaultPageLayout` → `SideBarNavigation` + `MainNavigation` → Page Content

#### Data Flow
- **Server Components**: For initial data loading from Supabase
- **Client Components**: For interactivity only
- **Route Handlers**: For server-side mutations (`app/api/*`)
- **State Management**: React Context for auth, URL params for search/filters

#### Database & Auth
- **RLS Policies**: Public read for `sref_codes`, ownership-based writes
- **Auth Model**: Supabase Auth with user profiles keyed to `auth.uid()`
- **Key Tables**: `sref_codes`, `code_images`, `code_tags`, `saved_codes`, `code_votes`

### Development Guidelines

#### Subframe Design System Rules
- **NEVER modify** components in `src/ui/components/` - they are auto-synced from Subframe
- For component changes, request updates in Subframe design tool, then resync
- Use wrapper components for extending functionality
- Files can be marked `// @subframe/sync-disable` for exceptional custom code

#### Path Aliases
- `@/*` maps to `./src/*`
- `@/ui/*` maps to `./src/ui/*`

#### Code Quality
- ESLint configured with Next.js and TypeScript rules
- Strict TypeScript configuration enabled
- Follow existing patterns for component naming and file organization

#### Database Operations
- Use Server Components for queries, Route Handlers for mutations
- Never expose service role key to client
- Implement proper RLS policies for data access control
- Use `lib/supabase/server.ts` for server-side operations, `lib/supabase/client.ts` for client-side

### Performance Considerations
- Server Components for initial data loading
- Lazy loading for heavy components
- Image optimization with Next.js Image component
- Proper bundle splitting for optimal loading

### Testing and Deployment
- No specific test framework configured - check existing patterns before adding tests
- Primary deployment target is Netlify
- Environment variables required for Supabase integration

## Important Notes

### Styling
- Uses Tailwind CSS v3 with Subframe theme configuration
- Global styles in `app/globals.css` and `src/app/globals.css`
- Tailwind config extends Subframe's design tokens from `src/ui/tailwind.config.js`

### Authentication
- Supabase Auth handles user management
- User profiles stored in `users` table with RLS policies
- Auth context available through React Context patterns

### Documentation
See `docs/` directory for comprehensive guides:
- `architecture.md` - Detailed system architecture
- `component-architecture.md` - Component patterns and guidelines  
- `supabase-guide.md` - Database schema and RLS patterns
- `subframe-ds-guide.md` - Design system integration rules