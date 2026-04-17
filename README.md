# Halo Studio

Halo Studio is a production-structured creator platform inspired by premium social-commerce tools. It includes a React + SCSS frontend, an Express + MongoDB API, creator dashboard modules, public landing pages, product selling flows, Instagram CRM scaffolding, scheduling, automations, analytics, Cloudflare R2 upload abstraction, and admin-ready structure.

## Architecture Overview

- `client/`: React app built with JSX, React Router, SCSS partial architecture, reusable components, and API-backed authenticated state.
- `server/`: Express REST API with Mongoose models, JWT auth, role support, provider-based Instagram integration architecture, Cloudflare R2 abstraction, and seed data.
- Public experience: marketing pages, creator profile page, product detail page, checkout UI.
- Creator dashboard: landing page builder, links, Instagram connection, CRM, scheduler, calendar, automations, products, orders, analytics, audience, media, settings, profile.
- Admin-ready structure: user listing, creator detail, moderation surface, platform analytics.

## Folder Structure

```text
client/
  src/
    api/
    components/
      common/
      layout/
    context/
    data/
    hooks/
    pages/
      admin/
      dashboard/
    routes/
    styles/
      abstracts/
      base/
      components/
      pages/
    utils/
    App.jsx
    main.jsx
server/
  src/
    config/
    controllers/
    integrations/
      instagram/
      payments/
      storage/
    jobs/
    middleware/
    models/
    routes/
    seeds/
    services/
    utils/
    validations/
    app.js
    server.js
```

## Database Schema Summary

Core models in `server/src/models`:

- `User`: auth account, role, password hash, refresh token state.
- `CreatorProfile`: creator identity, slug, theme preset, featured products.
- `LandingPage` and `LandingBlock`: modular public page system.
- `SocialLink` and `AffiliateLink`: outbound links and affiliate tracking structure.
- `InstagramConnection`: provider metadata and connection status.
- `CrmLead` and `CrmActivity`: lead records, notes, status, campaign attribution.
- `ScheduledPost`: post queue and future publisher job support.
- `Automation` and `AutomationLog`: comment-trigger DM rules and execution logs.
- `Product`: digital, course, affiliate, and physical-placeholder product types.
- `Order`: order and fulfillment record structure.
- `AnalyticsEvent`: page, click, purchase, lead, and automation events.
- `MediaAsset`: Cloudflare R2-backed media metadata.
- `CreatorSetting`: creator workspace, locale, notification, and billing-ready settings.

## API Route Summary

- `/api/auth`: signup, login, refresh, logout, current user.
- `/api/users`: admin user listing.
- `/api/creators`: current creator profile, public creator view.
- `/api/landing-pages`: creator landing config and public landing data.
- `/api/links`: social links, affiliate links, redirect tracking.
- `/api/instagram`: connection state and connect action.
- `/api/crm`: lead listing, creation, detail, notes, updates.
- `/api/scheduler`: scheduled post CRUD-lite, duplicate, publish-now placeholder.
- `/api/automations`: automation list/create/update/test run.
- `/api/products`: creator product management and public product detail.
- `/api/orders`: creator order listing and checkout session placeholder.
- `/api/uploads`: authenticated media upload endpoint.
- `/api/analytics`: dashboard analytics and event tracking.
- `/api/settings`: workspace settings and media library.
- `/api/admin`: overview, users, creator detail.

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally
- npm

### Install

```bash
npm install
```

### Configure Environment

Copy:

- `client/.env.example` to `client/.env`
- `server/.env.example` to `server/.env`

### MongoDB

Default local connection:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/creator_platform
```

Use MongoDB Atlas later by replacing the connection string only.

### Cloudflare R2

Server env keys:

```env
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
R2_REGION=auto
```

If R2 variables are missing, uploads now fail clearly so production misconfiguration is visible immediately.

### Bootstrap Admin Account / Remove Old Demo Records

```bash
npm run seed
```

What this script does now:

- ensures the admin account exists
- removes the old demo creator account if it was inserted earlier
- does not create sample products, leads, orders, or creator pages

### Run Development Servers

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Deployment Notes

- Build frontend:

```bash
npm run build
```

- Deploy `client/dist` as a static frontend or behind a Node reverse proxy.
- Deploy `server/` as a Node service with MongoDB and Cloudflare R2 environment variables.
- Set `CLIENT_URL` on the server to the deployed frontend origin.
- Use secure cookie settings and HTTPS in production.
- Configure Meta and Cloudflare R2 environment variables before using Instagram connect or uploads in production.

## Instagram Integration Notes and Caveats

This repo intentionally separates UI completeness from external API reality.

- Implemented now:
  - real Meta OAuth-ready connection flow structure
  - CRM models and lead flows
  - scheduled content model and publish job structure
  - automation builder and execution log structure
  - provider-based adapter layer
- Not silently faked:
  - real publishing to Instagram
  - real comment webhooks
  - real DM sends
  - real Meta OAuth app review flow
- Integration points:
  - `server/src/integrations/instagram/providerFactory.js`
  - `server/src/integrations/instagram/metaInstagramProvider.js`
  - `server/src/services/schedulerService.js`
  - `server/src/services/automationService.js`
  - `server/src/controllers/instagramController.js`

## Production Caveats

- Payment processing is mocked behind `server/src/integrations/payments/mockPaymentService.js`.
- Frontend auth is wired to the backend JWT flow and refresh endpoint.
- Backend auth is fully scaffolded with JWT access/refresh tokens and Mongo-backed session state.
- Before production launch, set secure cookies behind HTTPS and configure Meta app + webhook permissions for the Instagram modules.
