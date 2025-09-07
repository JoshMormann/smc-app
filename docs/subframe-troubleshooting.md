# Subframe + Tailwind Troubleshooting (SMC)

Purpose
- Capture lessons learned integrating Subframe with Tailwind and Next.js so styling remains consistent and recoverable.

Symptoms you might see
- “Everything looks unstyled” or Subframe components render with plain HTML.
- Dark mode looks odd or a gradient background overrides the UI.
- Module not found errors for @subframe/core/dist/index.css.

Primary root causes (from recent incident)
1) Tailwind v4 vs Subframe v3-style config mismatch
   - Using Tailwind v4 plugin (@tailwindcss/postcss v4) while relying on a Tailwind v3-style theme (from Subframe) prevents utility generation.
2) tailwind.config.js replaced with a raw theme export
   - Missing content globs and plugins => Tailwind JIT generates almost nothing.
3) Duplicate app directories (app/ and src/app/)
   - Next uses only one app root; the other’s globals.css isn’t applied, causing unexpected base styles.
4) Incorrect CSS import from @subframe/core
   - The installed @subframe/core version doesn’t ship dist/index.css. Importing it breaks the app.
5) Turbopack during troubleshooting
   - Adds variability while validating the CSS pipeline; safer to disable until styling is verified.

Known-good recovery (Tailwind v3 alignment)
Use this when Subframe exports are Tailwind v3-style (current default for this project).

1) Dependencies (devDependencies)
- tailwindcss: ^3.4.13
- postcss: ^8.4.47
- autoprefixer: ^10.4.20

2) PostCSS config (postcss.config.*)
- Use classic pipeline:
  plugins: ["tailwindcss", "autoprefixer"]

3) Tailwind wrapper config (tailwind.config.js)
- Import Subframe’s theme export and add content globs + plugins:

  const subframeConfig = require('./src/ui/tailwind.config.js')

  /** @type {import('tailwindcss').Config} */
  module.exports = {
    darkMode: 'media',
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      ...subframeConfig.theme,
      extend: {
        ...subframeConfig.theme?.extend,
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  }

4) Global CSS (app/globals.css)
- Keep neutral base; avoid starter gradients/overrides while validating:

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

- Do NOT import @subframe/core/dist/index.css unless your installed version provides it (current package does not).

5) Single app root
- Keep only app/ as the app directory. Remove or relocate src/app to avoid confusion.

6) Temporarily disable Turbopack while validating
- package.json scripts:
  - dev: next dev
  - build: next build

Verification checklist
- Restart dev server (npm run dev).
- Add a quick test element with classes such as: bg-brand-primary-600 text-white text-heading-4 — confirm expected colors, fonts, and sizes.
- Inspect compiled CSS (if needed) to see Subframe tokens (brand-primary, neutral, font-heading-*, etc.).

When to resync Subframe
- Only after the CSS pipeline is healthy and utilities generate.
- Ensure .subframe/sync.json is correct:
  - directory: ./src/ui
  - importAlias: @/ui/*
  - cssType: tailwind
- Then run a Subframe sync to refresh components/tokens if they’re outdated.

Dark mode policy
- darkMode: 'media' follows the system preference (recommended here).
- You can switch to 'class' later for app-level control without impacting Subframe token generation.

Future migration note (Tailwind v4)
- If/when migrating to Tailwind v4, you must port theme tokens into CSS via @theme in globals and stop relying on tailwind.config.js for tokens. Until then, stay on v3 for reliable Subframe class generation.

Netlify (deployment preference)
- Add a netlify.toml when ready:

  [build]
    command = "npm run build"
    publish = ".next"

  [plugins]
    package = "@netlify/plugin-nextjs"

This ensures push-to-main deploys with the official Netlify Next.js runtime, independent of the local Tailwind setup.

