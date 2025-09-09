# Environment Setup

## Required Environment Variables

### Production Environment Variables
Create a `.env.local` file in your project root with these variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: For local Supabase development
# NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
# NEXT_PUBLIC_SUPABASE_ANON_KEY=local_anon_key
# SUPABASE_SERVICE_ROLE_KEY=local_service_role_key
```

### Environment Variable Descriptions

**NEXT_PUBLIC_SUPABASE_URL**
- Your Supabase project URL
- Found in Supabase Dashboard → Settings → API
- Publicly accessible (included in client bundle)

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
- Anonymous/public key for client-side operations
- Found in Supabase Dashboard → Settings → API
- Publicly accessible (included in client bundle)
- Used for public reads and authenticated operations

**SUPABASE_SERVICE_ROLE_KEY**
- Service role key for server-side operations
- Found in Supabase Dashboard → Settings → API
- **NEVER expose to client** - server-only
- Bypasses RLS policies - use with caution

## Local Development Setup

### Quick Start
```bash
# 1. Clone the repository
git clone [repository-url]
cd smc-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Start development server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

### Detailed Setup Steps

#### 1. Node.js Requirements
- **Node.js**: 18.17 or later
- **npm**: 9.0 or later (or yarn/pnpm equivalent)

Check your versions:
```bash
node --version  # Should be 18.17+
npm --version   # Should be 9.0+
```

#### 2. Project Dependencies
```bash
# Install all dependencies
npm install

# Or with specific package managers
yarn install
pnpm install
```

#### 3. Environment Configuration
```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your actual values
nano .env.local  # or use your preferred editor
```

#### 4. Supabase Setup
Get your Supabase credentials:
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your project
3. Navigate to Settings → API
4. Copy the URL and keys to your `.env.local`

#### 5. Verify Setup
```bash
# Start development server
npm run dev

# Check for errors in terminal
# Open http://localhost:3000 in browser
# Check browser console for errors
```

## Supabase Local Development (Optional)

### Benefits of Local Supabase
- Faster development cycle
- Work offline
- Test migrations safely
- Consistent development environment

### Setup Local Supabase
```bash
# 1. Install Supabase CLI
npm install -g @supabase/cli

# 2. Initialize Supabase (if not already done)
supabase init

# 3. Start local Supabase stack
supabase start

# 4. Get local credentials
supabase status
```

### Local Environment Variables
When using local Supabase, update your `.env.local`:
```env
# Local Supabase (when running supabase start)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Sync with Remote
```bash
# Link to remote project (one-time setup)
supabase link --project-ref your-project-ref

# Pull remote schema to local
supabase db pull

# Push local changes to remote
supabase db push
```

## Development Server Options

### Standard Next.js Development
```bash
# Start Next.js dev server
npm run dev

# Custom port
npm run dev -- -p 3001

# Turbo mode (faster builds)
npm run dev -- --turbo
```

### Netlify Development (Recommended)
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Start with Netlify functions support
netlify dev

# Start with live tunnel (for testing)
netlify dev --live
```

### Development URLs
- **Local**: http://localhost:3000
- **Netlify Dev**: http://localhost:8888
- **Custom Port**: http://localhost:[port]

## IDE Setup

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "supabase.supabase-vscode"
  ]
}
```

### VS Code Settings
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Troubleshooting Setup Issues

### Common Environment Issues

#### Missing Environment Variables
**Error**: "Supabase URL is required"
**Solution**: 
1. Check `.env.local` exists
2. Verify variable names are exact (case-sensitive)
3. Restart dev server after changes

#### Invalid Supabase Credentials
**Error**: "Invalid API key" or connection errors
**Solution**:
1. Verify credentials in Supabase dashboard
2. Check for extra spaces or characters
3. Ensure using correct project credentials

#### Port Already in Use
**Error**: "Port 3000 is already in use"
**Solution**:
```bash
# Find and kill process using port
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Build Issues

#### TypeScript Errors
**Error**: Type errors during build
**Solution**:
1. Check all imports are correct
2. Update `@types/*` packages
3. Clear TypeScript cache: `rm -rf .next`

#### Missing Dependencies
**Error**: "Module not found"
**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Tailwind/Subframe Issues
**Error**: Styles not loading correctly
**Solution**:
1. Check `tailwind.config.js` imports Subframe theme
2. Verify PostCSS configuration
3. Restart dev server
4. Clear `.next` cache

### Database Connection Issues

#### Can't Connect to Supabase
**Symptoms**: Database queries fail
**Solutions**:
1. Check Supabase project status
2. Verify environment variables
3. Test with simple query
4. Check network connectivity

#### RLS Policy Errors
**Symptoms**: "Permission denied" errors
**Solutions**:
1. Check if user is authenticated
2. Verify RLS policies exist
3. Test policies in Supabase dashboard
4. Check auth context in queries

## Production Deployment Setup

### Netlify Configuration
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

### Environment Variables in Production
Set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Deployment Checklist
- [ ] Environment variables set in deployment platform
- [ ] Build succeeds locally: `npm run build`
- [ ] Database migrations applied
- [ ] Supabase project configured for production domain
- [ ] SSL certificate configured
- [ ] Custom domain configured (if applicable)

## Security Considerations

### Environment Variable Security
- **Never commit** `.env.local` to version control
- **Never expose** service role key to client
- **Use different keys** for development and production
- **Rotate keys** regularly

### Local Development Security
- Use local Supabase for sensitive development
- Don't use production data in development
- Keep local environment isolated
- Use test data for development

## Getting Help

### When Setup Fails
1. Check this troubleshooting guide
2. Review error messages carefully
3. Check project documentation
4. Verify all prerequisites are met
5. Ask for help with specific error messages

### Useful Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

### Support Channels
- Project documentation in `docs/` folder
- GitHub issues for project-specific problems
- Community forums for framework-specific issues