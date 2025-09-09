# Common Issues & Solutions

## Subframe Issues

### UI Looks Unstyled or "Off"
**Symptoms**: Components appear broken, missing styles, or don't match design
**Solutions**:
1. Check `tailwind.config.js` imports Subframe theme:
   ```javascript
   const subframeConfig = require('./src/ui/tailwind.config.js')
   ```
2. Verify Tailwind v3 toolchain installed
3. Check `postcss.config.*` uses classic pipeline: `["tailwindcss", "autoprefixer"]`
4. Restart dev server: `npm run dev`
5. Clear `.next` cache: `rm -rf .next`

### Component Import Errors
**Symptoms**: TypeScript errors on Subframe component imports
**Solutions**:
1. Check component exists in `src/ui/components/`
2. Verify import path: `import { Button } from '@/ui/components/Button'`
3. Resync from Subframe if component missing
4. Check for naming conflicts

### Subframe Sync Issues
**Symptoms**: Components out of date or missing new features
**Solutions**:
1. Update components in Subframe design system
2. Export/sync to codebase
3. Never modify `src/ui/components/` directly
4. Use wrapper components for extensions

## Authentication Issues

### User Not Persisting
**Symptoms**: User gets logged out on page refresh
**Solutions**:
1. Check environment variables are set correctly:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
2. Verify Supabase client configuration
3. Check for auth state management in app
4. Ensure cookies/localStorage not being cleared

### "JWT Expired" Errors
**Symptoms**: Random authentication failures
**Solutions**:
1. Implement token refresh logic
2. Check token expiration settings in Supabase
3. Handle auth state changes properly:
   ```typescript
   supabase.auth.onAuthStateChange((event, session) => {
     if (event === 'SIGNED_OUT') {
       // Handle sign out
     }
   })
   ```

### Authentication Required Errors
**Symptoms**: API calls fail with 401 errors
**Solutions**:
1. Ensure auth context passed to server:
   ```typescript
   const { data: { user } } = await supabase.auth.getUser()
   ```
2. Check RLS policies allow the operation
3. Verify user is actually authenticated
4. Check middleware auth handling

## Database/RLS Issues

### "Permission Denied" Errors
**Symptoms**: Database queries fail with permission errors
**Solutions**:
1. Check RLS policies exist for the operation:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'your_table';
   ```
2. Ensure auth context included:
   ```typescript
   .eq('user_id', user.id) // For user-scoped data
   ```
3. Verify user has proper permissions
4. Check if RLS is enabled on table

### "New Row Violates RLS Policy"
**Symptoms**: Insert/update operations fail
**Solutions**:
1. Check insert policy allows the operation
2. Ensure `user_id` matches `auth.uid()`
3. Verify all required fields provided
4. Check policy conditions are met

### Connection Errors
**Symptoms**: Database queries timeout or fail to connect
**Solutions**:
1. Verify Supabase project is active
2. Check environment variables
3. Test with simple query first
4. Check network connectivity
5. Verify connection limits not exceeded

## Build Issues

### TypeScript Errors
**Symptoms**: Build fails with type errors
**Solutions**:
1. Check all imports are correct
2. Verify type definitions exist
3. Update `@types/*` packages if needed
4. Check for circular dependencies
5. Clear TypeScript cache: `rm -rf .next`

### Missing Environment Variables
**Symptoms**: Build fails or runtime errors about missing env vars
**Solutions**:
1. Check `.env.local` exists and has required variables
2. Verify variable names match exactly (case-sensitive)
3. Restart dev server after adding variables
4. Check Netlify environment variables for production

### Import/Module Errors
**Symptoms**: "Module not found" or import errors
**Solutions**:
1. Check file paths are correct
2. Verify `tsconfig.json` path mapping
3. Check for typos in import statements
4. Ensure files exist and are exported properly

## Runtime Issues

### Hydration Errors
**Symptoms**: "Hydration failed" errors in console
**Solutions**:
1. Ensure server and client render same content
2. Check for browser-only code in server components
3. Use `useEffect` for client-only logic
4. Verify no conditional rendering based on client state

### Infinite Re-renders
**Symptoms**: Page becomes unresponsive, console shows many renders
**Solutions**:
1. Check `useEffect` dependencies
2. Ensure state updates don't cause loops
3. Use `useCallback` for event handlers
4. Check for objects/arrays in dependencies

### API Route Errors
**Symptoms**: API calls return 500 errors or unexpected responses
**Solutions**:
1. Check server logs for detailed errors
2. Verify request format matches expected
3. Test API routes directly with curl/Postman
4. Check error handling in route handlers

## Performance Issues

### Slow Page Loads
**Symptoms**: Pages take long time to load
**Solutions**:
1. Check for large bundle sizes
2. Implement code splitting
3. Optimize images with Next.js Image component
4. Use lazy loading for heavy components
5. Check database query performance

### Memory Leaks
**Symptoms**: Browser becomes slow over time
**Solutions**:
1. Clean up event listeners in `useEffect`
2. Cancel pending requests on unmount
3. Check for circular references
4. Use React DevTools Profiler

### Large Bundle Size
**Symptoms**: Slow initial page load, large JavaScript files
**Solutions**:
1. Use dynamic imports for large components
2. Check for unused dependencies
3. Implement tree shaking
4. Split code by routes

## Development Environment Issues

### Hot Reload Not Working
**Symptoms**: Changes don't reflect without manual refresh
**Solutions**:
1. Check file watcher limits (especially on Linux)
2. Restart dev server
3. Check for syntax errors preventing compilation
4. Verify file is in watched directory

### Port Already in Use
**Symptoms**: Dev server won't start, port 3000 busy
**Solutions**:
1. Kill existing process: `lsof -ti:3000 | xargs kill -9`
2. Use different port: `npm run dev -- -p 3001`
3. Check for other Next.js instances running

### Netlify Dev Issues
**Symptoms**: `netlify dev` not working properly
**Solutions**:
1. Check `netlify.toml` configuration
2. Verify Netlify CLI is up to date: `npm i -g netlify-cli`
3. Check environment variables in Netlify dashboard
4. Try `netlify dev --live` for debugging

## Debugging Strategies

### RLS Debugging
```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'your_table';

-- Test policies manually
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid"}';
SELECT * FROM your_table;
```

### API Debugging
```typescript
// Add detailed logging
console.log('Request body:', await request.json())
console.log('User:', user)
console.log('Database result:', { data, error })
```

### Client-Side Debugging
```typescript
// Check auth state
const { data: { user } } = await supabase.auth.getUser()
console.log('Current user:', user)

// Check local storage
console.log('Supabase session:', localStorage.getItem('sb-project-auth-token'))
```

## When to Ask for Help

### Escalate to User When:
- Subframe components need design system updates
- Business logic decisions needed
- Database schema changes required
- Environment/deployment configuration issues
- Security policy decisions

### Continue Debugging When:
- TypeScript/build errors
- Component implementation issues
- API route problems
- Styling/layout issues
- Performance optimization

## Prevention Tips

### Code Quality
- Use TypeScript strict mode
- Implement proper error boundaries
- Add input validation
- Use proper error handling patterns
- Follow component composition patterns

### Testing
- Test auth flows manually
- Verify RLS policies work
- Test error states
- Check responsive design
- Validate API endpoints

### Documentation
- Update docs when making changes
- Document complex business logic
- Keep environment setup current
- Maintain troubleshooting notes