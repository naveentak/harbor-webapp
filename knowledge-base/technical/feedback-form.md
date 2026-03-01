# Feedback Form

## Overview
`FeedbackForm.tsx` handles bug reports and feature requests from Harbor macOS app users. It validates HMAC-signed tokens from the URL to ensure only actual app users can submit.

## Token Flow

1. User clicks "Report a Bug" / "Request a Feature" in Harbor macOS app (Preferences)
2. `FeedbackTokenManager` generates HMAC-signed URL: `harbor.refactory.co.za/feedback?did=...&ts=...&sig=...&app=harbor&type=bug&v=...&os=...`
3. Browser opens → `FeedbackForm` parses and validates tokens
4. User fills out form → POST to Supabase Edge Function
5. Edge Function validates HMAC server-side, stores in `tickets` table

## URL Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `did` | string | Yes | Device UUID |
| `ts` | string | Yes | Unix timestamp |
| `sig` | string | Yes | HMAC-SHA256 signature |
| `app` | string | Yes | App ID (`harbor`) |
| `type` | `bug` \| `feature` | Yes | Feedback type |
| `v` | string | No | App version |
| `os` | string | No | macOS version |

## States

| State | Behavior |
|-------|----------|
| No valid tokens | Shows "Submit Feedback from the App" with link back to home |
| Valid tokens | Shows form with type toggle, title, description, email, app info badges |
| Submitting | Spinner on submit button, form disabled |
| Success | "We're on it." confirmation with back-to-home link |
| Error | Red error banner with message from Edge Function or network error |

## Supabase Edge Function

- Endpoint: `VITE_SUPABASE_FUNCTION_URL` (env var)
- Method: POST with JSON body
- Validates: HMAC signature, timestamp window (1 hour), rate limit (5/device/hour)
- Stores in: `tickets` table with `app_id` FK to `apps` table

## Shared Dashboard
All r:labs apps (rclip, Harbor) submit to the same `tickets` table. The `app_id` column distinguishes between apps. The `apps` table must have a row for each app:

| id | display_name |
|----|-------------|
| rclip | r:clip |
| harbor | Harbor |
