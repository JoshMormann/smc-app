# Development Workflow

## Adding a New Feature

### 1. Check for Existing Specs
```bash
# Look for existing specs
ls .kiro/specs/
```

### 2. Create Spec if Needed
1. **Requirements Phase**
   - Create `.kiro/specs/{feature-name}/requirements.md`
   - Write user stories and acceptance criteria in EARS format
   - Get user approval before proceeding

2. **Design Phase**
   - Create `.kiro/specs/{feature-name}/design.md`
   - Include architecture, components, data models
   - Get user approval before proceeding

3. **Tasks Phase**
   - Create `.kiro/specs/{feature-name}/tasks.md`
   - Break down into discrete coding tasks
   - Reference specific requirements
   - Get user approval before implementation

### 3. Implementation
1. **Execute tasks one at a time**
2. **Update task status** as you progress
3. **Test each task** before moving to next
4. **Stop after each task** for user review

## Database Changes

### 1. Create Migration
```bash
# If using Supabase CLI
supabase migration new descriptive_name

# Or manually create file
touch supabase/migrations/$(date +%Y%m%d%H%M%S)_descriptive_name.sql
```

### 2. Write Migration
```sql
-- Example migration structure
-- Add new column
ALTER TABLE sref_codes ADD COLUMN new_field TEXT;

-- Create new table
CREATE TABLE new_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own records" ON new_table
FOR SELECT USING (auth.uid() = user_id);
```

### 3. Update Documentation
- Update `docs/data-model.md` if schema changes
- Update API documentation if endpoints change
- Test locally before deploying

### 4. Test Migration
```bash
# Apply locally
supabase db reset

# Or if using remote
supabase db push
```

## Component Development

### 1. Check if Subframe Component Needs Updating
- Does the existing Subframe component support what you need?
- Can you achieve the goal with props/variants?

### 2. If Subframe Update Needed
1. **Update in Subframe design system**
2. **Resync to codebase**
3. **Test the updated component**
4. **Never modify** `src/ui/components/` directly

### 3. If Extending Functionality
```typescript
// Create wrapper component
import { Button } from '@/ui/components/Button'

export function SrefActionButton({ srefId, action, ...props }) {
  const handleAction = async () => {
    // Custom logic here
    await performSrefAction(srefId, action)
  }
  
  return <Button onClick={handleAction} {...props} />
}
```

### 4. Component Organization
```
components/
├── ui/ (Subframe exports - DO NOT MODIFY)
├── layout/ (Layout components)
├── navigation/ (Navigation components)
├── sref/ (SREF-specific components)
└── common/ (Shared utility components)
```

## API Development

### 1. Route Handler Pattern
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Auth check if needed
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Database operation
    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json(
        { ok: false, error: 'Database error' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 2. Error Handling
- Use standardized error format
- Include proper HTTP status codes
- Log errors but don't expose sensitive info
- Handle RLS violations gracefully

## Testing Workflow

### 1. Manual Testing Checklist
- [ ] Feature works as expected
- [ ] Error states handled gracefully
- [ ] Authentication flows work
- [ ] RLS policies enforced
- [ ] UI responsive on different screen sizes
- [ ] No console errors

### 2. Database Testing
```sql
-- Test RLS policies
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "test-user-id"}';

-- Test your queries
SELECT * FROM your_table;
```

### 3. API Testing
```bash
# Test with curl
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## Deployment Workflow

### 1. Pre-deployment Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Build succeeds locally

### 2. Netlify Deployment
```bash
# Build locally first
npm run build

# Deploy via git push (if connected)
git push origin main

# Or manual deploy
netlify deploy --prod
```

### 3. Post-deployment Verification
- [ ] Site loads correctly
- [ ] Authentication works
- [ ] Database connections work
- [ ] API endpoints respond
- [ ] No 404s on navigation

## Troubleshooting Workflow

### 1. Build Issues
1. Check TypeScript errors
2. Verify imports are correct
3. Check environment variables
4. Clear `.next` cache: `rm -rf .next`

### 2. Runtime Issues
1. Check browser console
2. Check server logs
3. Verify database connection
4. Check RLS policies

### 3. Supabase Issues
1. Verify environment variables
2. Check project status in dashboard
3. Test with simple query
4. Check RLS policies and auth context

## Code Review Checklist

### Before Submitting
- [ ] Code follows project conventions
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] RLS context included where needed
- [ ] Components use Subframe patterns
- [ ] Documentation updated if needed

### Security Checklist
- [ ] No service role key in client code
- [ ] RLS policies protect user data
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS prevention in user content