# Glloria Portfolio

Glloria is a bilingual, full-stack editorial portfolio for interior designer **Heba El Damarany**. The public experience is intentionally image-led and quiet: original project photography, Arabic/English RTL-LTR switching, dark mode, consultation booking, WhatsApp handoff, and a protected content and booking console.

The live site is available at [glloriaport-marmsbvo.manus.space](https://glloriaport-marmsbvo.manus.space/). The source repository is private at [Fatoomnoour/glloria-portfolio](https://github.com/Fatoomnoour/glloria-portfolio).

## Product surface

| Area | Route | Purpose |
|---|---|---|
| Home | `/` | Editorial introduction, About, selected work, services, process, FAQ, and truthful testimonials behavior |
| Project archive | `/projects` | Public archive with interior/architectural filtering |
| Project detail | `/projects/interior`, `/projects/boska` | Managed original gallery, provenance label, optional approved case-study sections, sharing actions, and consultation CTA |
| Booking | `/booking` | Five-step bilingual consultation wizard with validation, privacy consent, persistence, owner notification, and WhatsApp follow-up |
| Contact | `/contact` | Direct WhatsApp, email, social links, and inquiry form |
| Legal | `/privacy`, `/terms` | Privacy and terms pages linked from the booking flow |
| Admin | `/admin` | Manus OAuth-protected project, testimonial, booking, export, and analytics management |

The public project records currently use only the approved labels **Private Residence** and **Boska Café & Restaurant**. The site does not invent city, year, area, client, scope, materials, or execution claims when those facts have not been supplied. Optional case-study fields and before/after comparisons are private until explicitly approved by an administrator. Public testimonials are suppressed unless they are real, consented, verified, and explicitly approved by an administrator; approved stories render through a small accessible carousel.

## Technology

| Layer | Implementation |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Wouter |
| UI and motion | Warm Editorial CSS system, asymmetric lookbook treatment, Lucide icons, Intersection Observer, requestAnimationFrame parallax, reduced-motion fallbacks |
| Server | Express 4, tRPC 11, Manus WebDev runtime |
| Data | Drizzle ORM, MySQL/TiDB-compatible schema, schema-first migrations |
| Authentication | Manus OAuth with server-side session validation and role-aware procedures |
| Storage | Permanent WebDev/S3-backed storage references for original image assets |
| Analytics | Protected tRPC timeline endpoint and Recharts admin charts |
| Quality | Vitest, TypeScript checks, production Vite/esbuild build, responsive and cross-browser QA |

## Local development

Use Node.js 22 or later and the pinned pnpm 10.31.0 toolchain. Install dependencies, then run the development server:

```bash
pnpm install
pnpm dev
```

The development server is started by the full-stack Express entry point and serves the Vite client through the managed runtime. Production output is created with:

```bash
pnpm build
pnpm start
```

The repository intentionally does not contain `.env` files, media bytes, database credentials, or generated deployment metadata. In WebDev, the platform injects the configured environment values. For another environment, provide the equivalent values for `DATABASE_URL`, `JWT_SECRET`, Manus OAuth (`VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`), owner identity (`OWNER_OPEN_ID`, `OWNER_NAME`), and the built-in Forge API variables used by the template. Never commit their values.

## Verification commands

The project uses a short, reproducible validation loop:

```bash
pnpm test
pnpm check
pnpm build
```

The current reviewed source passes **26 Vitest tests**, the TypeScript check, and the production build. The build deliberately keeps an application entry chunk above Vite's advisory 500 kB threshold because the shared public shell still contains the editorial runtime and UI dependencies; heavy page routes, vendor code, and Recharts are split into dedicated chunks.

## Data and migration workflow

The schema lives in `drizzle/schema.ts`, query helpers live in `server/db.ts`, and the tRPC contract is defined in `server/routers.ts`. For a local database, `pnpm db:push` runs the Drizzle generation/migration script. In the managed WebDev environment, review generated SQL before applying it through the managed database workflow; do not use destructive SQL against production data.

Project images are referenced through permanent storage URLs rather than committed into the repository. The admin project editor stores gallery metadata as JSON containing a URL, descriptive alt text, and display order. It also supports nullable case-study copy, optional before/after image metadata, and an explicit approval gate. Booking requests include an optional aesthetic preference that remains protected in admin detail and CSV export. The public detail route is fail-closed: it waits for the managed record and renders the branded 404 when no published record exists, rather than falling back to unapproved reference imagery.

## Hosting and domain

The intended hosting target is the managed Manus WebDev deployment with autoscale hosting and custom-domain support. `DOMAIN_SETUP.md` documents DNS, HTTPS, canonical URL, social metadata, and post-cutover checks. The current public domain is the generated `manus.space` domain above; changing to a custom domain requires updating the canonical URL, structured data, Open Graph image URL, and social previews together.

## Repository hygiene

`.gitignore` excludes dependencies, build output, local environment files, logs, databases, and platform-generated metadata. Before exporting or sharing the repository, check `git status --ignored` and confirm that no `.env`, `dist`, `node_modules`, log, or local media path is staged. The private GitHub repository is the source export; production publishing remains managed through WebDev checkpoints.
