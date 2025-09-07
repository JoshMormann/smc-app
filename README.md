This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Quick styling check (Subframe + Tailwind)

This project uses the Subframe design system with Tailwind v3. If the UI looks unstyled or “off,” verify:

- Tailwind v3 toolchain is installed (tailwindcss v3, postcss v8, autoprefixer)
- postcss.config.* uses the classic pipeline: ["tailwindcss", "autoprefixer"]
- tailwind.config.js is a wrapper that:
  - Scans project files via content globs
  - Imports the Subframe theme from `src/ui/tailwind.config.js`
  - Loads `@tailwindcss/forms` and `@tailwindcss/typography`
- Only one Next.js app root (keep `app/`; avoid `src/app/` conflicts)
- Do not import `@subframe/core/dist/index.css` (not shipped in the current package)
- Restart dev server after changes: `npm run dev`

See docs/subframe-troubleshooting.md for detailed steps and recovery.
