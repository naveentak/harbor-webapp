# Harbor Web App Architecture

## Pages (client-side routing in App.tsx)

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Landing page | Hero, ServerDemo, Features, HowItWorks, DownloadCTA, BuiltByCare, Footer |
| `/privacy` | `PrivacyPolicy` | Privacy policy page |
| `/feedback` | `FeedbackForm` | HMAC-authenticated bug report / feature request form |

## Components

```
App.tsx                   — Router + landing page layout
├── Navbar.tsx            — Sticky nav with "Download Free" CTA
├── Hero.tsx              — Hero section with tagline
├── ServerDemo.tsx        — Interactive demo showing Harbor's UI
├── Features.tsx          — Feature grid
├── HowItWorks.tsx        — Step-by-step explanation
├── DownloadCTA.tsx       — Pricing card + download button (DMG)
├── BuiltByCare.tsx       — Support commitment + bug/feature links
├── Footer.tsx            — Product/Support/Supported links
├── Logo.tsx              — Harbor logo component
├── PrivacyPolicy.tsx     — Full privacy policy
└── FeedbackForm.tsx      — Token-validated feedback form
```

## Key Integrations

### Download (DownloadCTA.tsx)
- DMG URL from `VITE_DMG_DOWNLOAD_URL` env var, fallback `/downloads/Harbor.dmg`
- Points to Firebase Cloud Storage or Firebase Hosting

### Feedback (FeedbackForm.tsx)
- Parses HMAC token params from URL (`did`, `ts`, `sig`, `app`, `type`, `v`, `os`)
- Shows "use the app" message if tokens missing/invalid
- POSTs to Supabase Edge Function at `VITE_SUPABASE_FUNCTION_URL`
- Shares backend with rclip for combined r:labs support dashboard

### Support Links (BuiltByCare.tsx, Footer.tsx)
- "Report a Bug" → `/feedback?type=bug`
- "Request a Feature" → `/feedback?type=feature`
- Footer includes "(requires app)" label since tokens are needed

## Hosting

| Setting | Value |
|---------|-------|
| Provider | Firebase Hosting |
| Project | `rlabs-app` |
| Site | `rlabs-app-harbor` |
| Domain | `harbor.refactory.co.za` |
| Build output | `dist/` |
| SPA rewrite | `**` → `/index.html` |

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (feedback form) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Yes (feedback form) |
| `VITE_SUPABASE_FUNCTION_URL` | Edge Function URL for ticket submission | Yes (feedback form) |
| `VITE_DMG_DOWNLOAD_URL` | DMG download URL (Firebase Storage) | No (fallback: `/downloads/Harbor.dmg`) |
