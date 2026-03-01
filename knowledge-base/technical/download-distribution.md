# Download Distribution

## Overview
Harbor's notarized DMG is served via Firebase (Hosting or Cloud Storage). The macOS app repo is private, so GitHub release assets are not publicly accessible.

## Architecture

```
harbor-macos-app repo (private)
  └── scripts/build-and-notarize.sh → build/Harbor.dmg
        ├── gh release create (backup/archive)
        └── Upload to Firebase Storage or copy to harbor-web-app/public/downloads/

harbor-web-app
  └── DownloadCTA.tsx
        └── href={VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'}
```

## Download URL Resolution

```typescript
const dmgUrl = import.meta.env.VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'
```

- **Production (CI)**: `VITE_DMG_DOWNLOAD_URL` secret set in GitHub Actions → points to Firebase Storage URL
- **Fallback**: `/downloads/Harbor.dmg` served from Firebase Hosting (if DMG is in `public/downloads/`)

## Firebase Hosting Headers

Configured in `firebase.json`:
```json
{
  "source": "/downloads/**",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=3600" },
    { "key": "Content-Disposition", "value": "attachment" }
  ]
}
```

- 1-hour cache (allows quick updates when new versions ship)
- `Content-Disposition: attachment` forces download instead of browser rendering

## Release Process

1. Build + notarize DMG: `./scripts/build-and-notarize.sh` (in macOS app repo)
2. Create GitHub release: `gh release create v1.x.x build/Harbor.dmg`
3. Upload to Firebase Storage (or copy to `public/downloads/`)
4. Deploy web app: `npx firebase deploy --only hosting --project rlabs-app`

See: [harbor-macos-app/knowledge-base/runbooks/github-release.md](../../harbor-macos-app/knowledge-base/runbooks/github-release.md)
