# Task: Build Loading, Error, and Waitlist Systems

## Summary

Created the complete loading system, error system, and waitlist flow for the Hola Credit MVP demo.

## Loading System (13 files)

All loading files use skeleton geometry matching final content (no generic spinners), prevent layout shift, respect `prefers-reduced-motion`, and include `aria-busy` and `aria-label="Loading"`.

1. **Root `/src/app/loading.tsx`** — Branded global moment using `SymbolMark` from `@/components/shared/logo` with `animate-pulse`
2. **Marketing `/src/app/(marketing)/loading.tsx`** — Header skeleton + hero content + card grid
3. **Auth `/src/app/(auth)/loading.tsx`** — Centered form skeleton with logo placeholder
4. **Onboarding `/src/app/(auth)/onboarding/loading.tsx`** — Step indicator + form skeleton
5. **App Dashboard `/src/app/(app)/app/loading.tsx`** — Stats cards + table rows + quick actions
6. **Applications `/src/app/(app)/app/applications/loading.tsx`** — Table with 8 row skeletons + mobile cards
7. **New Application `/src/app/(app)/app/applications/new/loading.tsx`** — Step indicator + form fields
8. **Borrowers `/src/app/(app)/app/borrowers/loading.tsx`** — Table with 6 row skeletons + mobile cards
9. **Consents `/src/app/(app)/app/consents/loading.tsx`** — Table with filter + rows
10. **Team `/src/app/(app)/app/team/loading.tsx`** — Table with avatar circles + role descriptions
11. **Audit Log `/src/app/(app)/app/audit-log/loading.tsx`** — Table with 8 rows + filter chips
12. **Settings `/src/app/(app)/app/settings/loading.tsx`** — Status card + form fields + compliance profile
13. **Admin `/src/app/(app)/app/admin/loading.tsx`** — Stats + table rows

## Error System (5 files)

All error boundaries use `Logo` component, explain in plain language, offer one clear recovery action, avoid stack traces, work on mobile + keyboard navigation.

1. **Root `/src/app/error.tsx`** — "Something went wrong" + Try again / Go home
2. **404 `/src/app/not-found.tsx`** — "Page not found" + Go home / Try the demo
3. **Marketing `/src/app/(marketing)/error.tsx`** — "This page didn't load" + Try again / Go home
4. **Auth `/src/app/(auth)/error.tsx`** — "Something went wrong" + Try again / Explore the demo
5. **App `/src/app/(app)/app/error.tsx`** — "This section didn't load" + Try again / Back to dashboard

## Waitlist Flow (2 files)

1. **`/src/components/shared/waiting-list-form.tsx`** — Full multi-step flow:
   - Step 1: Math captcha (random +, −, ×)
   - Step 2: Full form (organisation name, business type, contact name, work email, role, estimated assessments, intended use, consent checkbox)
   - Field validation with error states
   - Submission pending state (button disabled, "Submitting…")
   - Success state with confirmation
   - Duplicate email response
   - Server-failure response with localStorage save for retry
   - Offline response with localStorage save
   - Draft auto-save to localStorage
   - Never fakes a successful submission

2. **`/src/app/api/waitlist/route.ts`** — API endpoint for waitlist submission with validation

## Auth Pages (5 files updated)

1. **Sign-in** — "No sign-in needed" + "Explore the demo" + "Join the waitlist"
2. **Sign-up** — Waitlist redirect using WaitingListForm
3. **Access-pending** — Waitlist status with "Explore the demo" + "View waitlist status"
4. **Access-denied** — Demo redirect with "Explore the demo" + "Join the waitlist"
5. **Session-expired** — No session needed with "Go to the demo" + "Join the waitlist"

## Waitlist Page (1 file updated)

- `/src/app/waitlist/page.tsx` — Standalone page with new WaitingListForm

## Verification

- All 26 files created/updated
- Lint passes with zero errors
- All pages compile and serve 200 responses
- API endpoint responds correctly
