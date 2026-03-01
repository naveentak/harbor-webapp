# Development

## Prerequisites
- Node.js 20+
- npm

## Setup

```bash
cd harbor-web-app
npm install
```

## Local Dev

```bash
npm run dev
```

Opens at `http://localhost:5173`. Hot reloads on file changes.

## Environment Variables

Create `.env.local` for local development:
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_SUPABASE_FUNCTION_URL=https://xxx.supabase.co/functions/v1/submit-ticket
VITE_DMG_DOWNLOAD_URL=/downloads/Harbor.dmg
```

## Build

```bash
npm run build
```

Output: `dist/` directory. Vite copies `public/` into `dist/` (including `downloads/Harbor.dmg` if present).

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Project Structure

```
src/
  App.tsx              — Router + landing page layout
  main.tsx             — React entry point
  index.css            — Tailwind imports + custom styles
  lib/
    supabase.ts        — Supabase client init
  components/
    Navbar.tsx
    Hero.tsx
    ServerDemo.tsx
    Features.tsx
    HowItWorks.tsx
    DownloadCTA.tsx
    BuiltByCare.tsx
    Footer.tsx
    Logo.tsx
    PrivacyPolicy.tsx
    FeedbackForm.tsx
    AlternativeParade.tsx
public/
  harbor-icon.png
  harbor-icon.svg
  downloads/           — Harbor.dmg (gitignored, served by Firebase)
```
