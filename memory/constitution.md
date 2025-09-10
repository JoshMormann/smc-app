# SMC App (SREF Mining Company) Constitution

## Core Principles

### I. Subframe-First Design System
Every component starts with Subframe's design system; Custom components are exceptions, not the rule; When Subframe limitations are reached, create minimal wrapper components that preserve Subframe benefits; Protect Subframe components with `// @subframe/sync-disable` only when absolutely necessary.

### II. Authentication-Aware Architecture (NON-NEGOTIABLE)
All components must gracefully handle both authenticated and unauthenticated states; Use wrapper pattern for adding auth logic to Subframe components; Never assume user authentication state - always check explicitly; Authentication context must be available throughout the component tree.

### III. Hybrid Component Strategy
99% Subframe components, 1% custom where necessary; Custom components only when Subframe cannot provide required functionality (e.g., masonry layouts, complex data flows); Custom wrappers preferred over direct Subframe modifications; Reusable patterns must be documented and systematized.

### IV. Data-Driven Development
All SREF codes, user data, and metadata flow from Supabase; Components receive data via props, not direct database calls; Real data used in development, not placeholder content; Database schema changes require migration scripts.

### V. MVP-First, Polish Later
Core functionality before visual perfection; Working features over pixel-perfect design; Iterate quickly on user value; Performance and accessibility improvements in dedicated passes.

## Technical Architecture

### Technology Stack (NON-NEGOTIABLE)
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Design System**: Subframe components with Tailwind CSS
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with email/password and OAuth
- **Deployment**: Vercel (preferred) or Netlify

### Component Architecture
- **Protected Components**: `src/ui/components/` (Subframe-synced, minimal edits)
- **Custom Components**: `src/components/` (full control, spec-kit driven)
- **Page Views**: `app/` directory (Next.js App Router)
- **Staging Pages**: `src/staging/` (Subframe page views)

### File Organization
- Wrapper components follow naming: `AuthAware[ComponentName]`, `Dynamic[ComponentName]`
- Custom galleries/layouts in `src/components/galleries/`
- Navigation wrappers in `src/components/navigation/`
- Auth context and utilities in `src/lib/auth/`

## Development Workflow

### Feature Development Process
1. Assess if Subframe components can handle the requirement
2. If yes: Use Subframe directly or create minimal wrapper
3. If no: Create spec using spec-kit (`/specify` command)
4. Generate implementation plan (`/plan` command)  
5. Implement following hybrid architecture principles
6. Test with real user authentication states

### Quality Gates
- All custom components must handle auth state appropriately
- Build must pass without warnings (except img element warnings)
- Real data integration required before feature completion
- Subframe sync protection verified for custom components

## User Experience Principles

### SREF Mining Workflow
- Users discover community SREF codes easily
- Authenticated users can save favorites and create libraries
- Copy functionality works for both auth states (redirect vs immediate)
- Visual feedback for all user actions

### Progressive Enhancement
- Core functionality works without authentication
- Enhanced features unlock with authentication
- Graceful fallbacks for all authentication-dependent features

## Governance

The Constitution supersedes all other development practices; Changes require documentation and approval; Complexity must be justified against MVP goals; Spec-kit specifications take precedence over ad-hoc feature requests.

All feature development must verify compliance with hybrid architecture; Authentication state handling is mandatory for all user-facing components; Real data integration cannot be postponed or mocked.

**Version**: 1.0.0 | **Ratified**: 2025-01-10 | **Last Amended**: 2025-01-10