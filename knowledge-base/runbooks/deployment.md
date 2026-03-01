# Deployment

## Hosting
- **Provider**: Firebase Hosting
- **Project**: `rlabs-app`
- **Site**: `rlabs-app-harbor`
- **Domain**: `harbor.refactory.co.za`

## Manual Deploy

```bash
npm run build
npx firebase deploy --only hosting --project rlabs-app
```

## CI/CD (GitHub Actions)

Automated deploy on push to `main` via `.github/workflows/firebase-deploy.yml`.

### Pipeline Steps
1. Checkout repo
2. Setup Node.js 20
3. `npm ci`
4. `npm run build` (with env vars from secrets)
5. `npx firebase-tools deploy --only hosting --project rlabs-app`

### Required GitHub Secrets

| Secret | Purpose |
|--------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_SUPABASE_FUNCTION_URL` | Edge Function URL for feedback submission |
| `VITE_DMG_DOWNLOAD_URL` | Firebase Storage URL for DMG download |
| `FIREBASE_TOKEN` | Firebase CLI auth token (`firebase login:ci`) |

### Getting Firebase Token
```bash
npx firebase login:ci
```
Copy the token and add as `FIREBASE_TOKEN` in GitHub repo Settings → Secrets.

## Firebase Config

`firebase.json`:
- Build output: `dist/`
- SPA rewrite: `**` → `/index.html`
- Asset caching: 1 year immutable for `/assets/**`
- Download caching: 1 hour for `/downloads/**` with `Content-Disposition: attachment`

## Post-Deploy Verification

1. Visit `harbor.refactory.co.za` — landing page loads
2. Click "Download for macOS" — DMG downloads
3. Visit `/privacy` — privacy policy renders
4. Visit `/feedback` (no tokens) — shows "Submit Feedback from the App"
5. Visit `/feedback?did=...&ts=...&sig=...&app=harbor&type=bug` (valid tokens) — form renders
