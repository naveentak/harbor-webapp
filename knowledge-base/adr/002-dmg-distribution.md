# ADR-002: DMG Distribution via Firebase

## Status
Accepted

## Context
Harbor's macOS app repo is private (will be a paid product). GitHub release asset URLs return 404 for unauthenticated users. Need a public download endpoint.

Options considered:
1. Make repo public — exposes source code
2. GitHub releases (private) — 404 for anonymous users
3. Firebase Hosting (`/downloads/Harbor.dmg`) — simple, same infrastructure
4. Firebase Cloud Storage — CDN-backed, configurable via env var

## Decision
Use Firebase Cloud Storage URL configured via `VITE_DMG_DOWNLOAD_URL` env var, with fallback to `/downloads/Harbor.dmg` on Firebase Hosting.

```typescript
const dmgUrl = import.meta.env.VITE_DMG_DOWNLOAD_URL || '/downloads/Harbor.dmg'
```

This gives flexibility to switch between Hosting and Storage without code changes.

## Consequences
- Repo stays private, source code protected
- DMG download is publicly accessible via Firebase
- CI/CD pipeline needs `VITE_DMG_DOWNLOAD_URL` secret
- New releases require uploading DMG to Firebase (Storage or `public/downloads/`)
- GitHub releases still created as backup/archive
