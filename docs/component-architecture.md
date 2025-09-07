# Component Architecture Guide

## Component Hierarchy

### Layout Components
- `DefaultPageLayout` - Main page wrapper with sidebar + header
- `DialogLayout` - Modal/dialog wrapper
- `DrawerLayout` - Side drawer wrapper

### Navigation Components
- `SideBarNavigation` - Left sidebar with icon navigation
- `MainNavigation` - Top header with contextual content
- `Breadcrumbs` - Page navigation breadcrumbs

### SREF-Specific Components
- `SrefCard` - Individual SREF code display
- `SrefGrid` - Masonry/bento box layout container
- `SrefSearch` - Search and filter interface
- `SrefForm` - Create/edit SREF modal

### UI Building Blocks (Subframe)
- All components in `src/ui/components/` are Subframe exports
- Never modify these directly
- Use composition and wrapper patterns for extensions

## State Management Patterns

### Server State (Supabase)
- Use Server Components for initial data loading
- Route Handlers for mutations
- RLS policies handle authorization

### Client State
- React Context for auth state
- Local state for UI interactions (modals, forms)
- URL state for search/filter parameters

## Data Flow Patterns

### Public Data (Discover Page)
```
Server Component → Supabase Query → Render Cards
```

### Authenticated Actions
```
Client Action → Route Handler → Supabase Mutation → RLS Check → Response
```

### Real-time Updates
- Consider Supabase Realtime for live updates
- Implement optimistic updates for better UX

## Component Composition Patterns

### Wrapper Components
```typescript
// Example: Extending Subframe Button with SREF-specific logic
import { Button } from '@/ui/components/Button'

export function SrefActionButton({ srefId, action, ...props }) {
  const handleAction = async () => {
    // SREF-specific logic here
    await performSrefAction(srefId, action)
  }
  
  return <Button onClick={handleAction} {...props} />
}
```

### Higher-Order Components
```typescript
// Example: Adding auth requirements to components
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { user } = useAuth()
    
    if (!user) {
      return <AuthPrompt />
    }
    
    return <Component {...props} />
  }
}
```

## File Organization

### Component Structure
```
src/
├── components/
│   ├── ui/ (Subframe exports - DO NOT MODIFY)
│   ├── layout/ (Layout components)
│   ├── navigation/ (Navigation components)
│   ├── sref/ (SREF-specific components)
│   └── common/ (Shared utility components)
├── app/ (Next.js App Router pages)
└── lib/ (Utilities, hooks, types)
```

### Naming Conventions
- Components: PascalCase (`SrefCard.tsx`)
- Hooks: camelCase starting with 'use' (`useSrefData.ts`)
- Utilities: camelCase (`formatSrefCode.ts`)
- Types: PascalCase (`SrefCode.ts`)

## Performance Considerations

### Component Optimization
- Use `React.memo` for expensive components
- Implement `useMemo` for complex calculations
- Use `useCallback` for event handlers passed to children

### Lazy Loading
```typescript
// Lazy load heavy components
const SrefForm = lazy(() => import('./SrefForm'))

// Use Suspense for loading states
<Suspense fallback={<SrefFormSkeleton />}>
  <SrefForm />
</Suspense>
```

### Bundle Optimization
- Dynamic imports for route-specific components
- Code splitting for large feature sets
- Tree shaking for unused Subframe components

## Testing Strategy

### Component Testing
- Unit tests for business logic
- Integration tests for component interactions
- Visual regression tests for UI components

### Testing Patterns
```typescript
// Example component test
import { render, screen } from '@testing-library/react'
import { SrefCard } from './SrefCard'

test('displays SREF code and tags', () => {
  const mockSref = {
    id: '1',
    code: '--sref abc123',
    title: 'Test Style',
    tags: ['minimal', 'modern']
  }
  
  render(<SrefCard sref={mockSref} />)
  
  expect(screen.getByText('Test Style')).toBeInTheDocument()
  expect(screen.getByText('minimal')).toBeInTheDocument()
})
```

## Accessibility Guidelines

### ARIA Patterns
- Use semantic HTML elements
- Provide proper ARIA labels
- Implement keyboard navigation
- Ensure color contrast compliance

### Screen Reader Support
- Descriptive alt text for images
- Proper heading hierarchy
- Focus management for modals
- Announce dynamic content changes

## Future Considerations

### Scalability
- Component library expansion
- Micro-frontend architecture potential
- Design system evolution
- Performance monitoring

### Maintenance
- Component documentation
- Version control for Subframe syncs
- Breaking change management
- Migration strategies
