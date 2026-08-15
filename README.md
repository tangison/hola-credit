# Hola Credit

Cash-flow underwriting platform for Namibian microlenders and retailers.

**Live:** [hola.tangison.com](https://hola.tangison.com)  
**Status:** Production planning and implementation handoff  
**Visibility:** Public

## What this is

The full Hola Credit product: a marketing surface, an authenticated application covering borrowers, applications, consents and audit logging, an admin area for model runs, review queue and system health, and a Clerk-backed onboarding and auth flow. Route groups separate marketing, auth and app concerns.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Radix UI primitives
- lucide-react icons
- Prisma ORM
- Anthropic SDK
- sharp image pipeline

## Getting started

```bash
git clone https://github.com/tangison/hola-credit.git
cd hola-credit
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npm run db:push` | Push the Prisma schema to the database. |
| `npm run db:generate` | Generate the Prisma client. |
| `npm run db:migrate` | Run Prisma migrations. |
| `npm run db:reset` | Drop and recreate the database. |

## Routes

40 page routes.

```
/
/about
/access-denied
/access-pending
/admin/model-runs
/admin/review-queue
/admin/system-health
/applications
/applications/[applicationId]
/applications/new
/audit-log
/borrowers
/borrowers/[borrowerId]
/brand
/consent
/consents
/contact
/faq
/for-microlenders
/for-retailers
/how-scoring-works
/onboarding/compliance
/onboarding/organisation
/onboarding/team
/privacy
/product
/resources
/resources/guides
/resources/responsible-credit
/resources/statement-readiness
/security
/session-expired
/settings/api
/settings/organisation
/settings/security
/sign-in/[[...sign-in]]
/sign-up/[[...sign-up]]
/sitemap
/team
/terms
```

## Environment

Copy `.env.example` to `.env.local` and fill in the values. Never commit a populated env file.

## Deployment

Deployed on Vercel. Production domains:

- `hola.tangison.com`

## Maintainer

Built and maintained by **Tangison Technologies**, Windhoek, Namibia.

| | |
|---|---|
| Main line | [+264 83 411 522](tel:+264813411522) (`083411522`) |
| Email | contact@tangison.com |
| Web | https://tangison.com |

## Licence

Proprietary. Copyright Tangison Technologies. All rights reserved.
