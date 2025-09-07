# SREF Mining Co - Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Copy `env.example` to `.env.local`
   - Fill in your Supabase credentials:
     ```bash
     cp env.example .env.local
     ```

3. **Supabase Configuration**
   - Get your project URL and anon key from your Supabase dashboard
   - Update `.env.local` with your credentials

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - You'll be redirected to `/discover`

## Project Structure

```
app/
├── discover/          # Discover page (home)
├── favorites/         # Favorites page (auth required)
├── library/           # Library page (auth required)
├── api/               # API routes
└── layout.tsx         # Root layout

components/
├── pages/             # Page components
├── ui/                # Subframe components (DO NOT MODIFY)
└── common/            # Shared components

lib/
├── supabase/          # Supabase client setup
└── utils/             # Utility functions

src/
└── staging/           # Page views from Subframe (Agent modifiable)
```

## Development Workflow

1. **Subframe Components**: Never modify files in `src/ui/components/`
2. **Staging Files**: Can be freely modified in `src/staging/`
3. **Page Implementation**: Use staging files as reference, implement in `app/` and `components/`

## Next Steps

- [ ] Set up Supabase environment variables
- [ ] Test the Discover page
- [ ] Implement authentication flow
- [ ] Add Favorites and Library pages
- [ ] Implement search and filtering
