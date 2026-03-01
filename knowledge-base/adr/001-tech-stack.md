# ADR-001: Tech Stack

## Status
Accepted

## Context
Harbor needs a marketing and support website at `harbor.refactory.co.za`. Requirements:
- Landing page with product showcase, features, download CTA
- Feedback form (authenticated via HMAC tokens from the macOS app)
- Privacy policy page
- Fast, lightweight, no SSR needed

## Decision
- **React 19** + **Vite** — fast dev/build, minimal config
- **Tailwind CSS v4** — utility-first styling, consistent with r:labs design
- **Framer Motion** — scroll-triggered animations, hover interactions, spring physics
- **Supabase JS client** — for feedback form submission
- **Firebase Hosting** — same infrastructure as other r:labs apps, custom domain support
- **SPA with client-side routing** — path-based routing in `App.tsx` (`/`, `/privacy`, `/feedback`)

## Consequences
- No SEO concerns (product page, not content site)
- Firebase Hosting SPA rewrite (`**` → `/index.html`) handles all routes
- Supabase credentials exposed client-side (anon key only, Edge Function validates server-side)
- Build output is static files — no server required
