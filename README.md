# Glloria Portfolio

Glloria is a bilingual, full-stack editorial portfolio for interior designer **Heba El Damarany**. The public experience is intentionally image-led and quiet: original project photography, Arabic/English RTL-LTR switching, dark mode, consultation booking, WhatsApp handoff, and a protected content and booking console.

Production URL: configure the final custom domain in Vercel after deployment. The source repository is private at [Fatoomnoour/glloria-portfolio](https://github.com/Fatoomnoour/glloria-portfolio).

## Product surface

| Area            | Route                                   | Purpose                                                                                                                                                           |
| --------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home            | `/`                                     | Editorial introduction, About, selected work, services, process, FAQ, and truthful testimonials behavior                                                          |
| Project archive | `/projects`                             | Public archive with interior/architectural filtering                                                                                                              |
| Project detail  | `/projects/interior`, `/projects/boska` | Managed original gallery, provenance label, optional approved case-study sections, sharing actions, consultation CTA, and accessible lightbox                     |
| Booking         | `/booking`                              | Three perceived consultation stages implemented across five validated/persisted steps, with privacy consent, recovery, owner notification, and WhatsApp follow-up |
| Contact         | `/contact`                              | Direct WhatsApp, email, social links, and inquiry form                                                                                                            |
| Legal           | `/privacy`, `/terms`                    | Privacy and terms pages linked from the booking flow                                                                                                              |
| Admin           | `/admin`                                | OAuth-protected project, testimonial, booking, export, and analytics management                                                                                   |

The public project records currently use only the approved labels **Private Residence** and **Boska Café & Restaurant**. The site does not invent city, year, area, client, scope, materials, or execution claims when those facts have not been supplied. Optional case-study fields and before/after comparisons are private until explicitly approved by an administrator. Public testimonials are suppressed unless they are real, consented, verified, and explicitly approved by an administrator; approved stories render through a small accessible carousel.

## Technology

| Layer          | Implementation                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend       | React 19, TypeScript, Vite, Tailwind CSS 4, Wouter                                                                                                      |
| UI and motion  | Warm Editorial CSS system, asymmetric lookbook treatment, Lucide icons, Intersection Observer, requestAnimationFrame parallax, reduced-motion fallbacks |
| Server         | Express 4, tRPC 11, managed Express runtime                                                                                                             |
| Data           | Drizzle ORM, MySQL/TiDB-compatible schema, schema-first migrations                                                                                      |
| Authentication | OAuth with server-side session validation and role-aware procedures                                                                                     |
| Storage        | Permanent S3-compatible storage references for original image assets                                                                                    |
| Analytics      | Protected tRPC timeline endpoint and Recharts admin charts                                                                                              |
| Quality        | Vitest, TypeScript checks, production Vite/esbuild build, Lighthouse, responsive and cross-browser QA                                                   |

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

The repository intentionally does not contain `.env` files, media bytes, database credentials, or generated deployment metadata. For local or Vercel deployment, provide the environment values listed in [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md), including database, session, OAuth, owner, storage-proxy, and optional analytics names. Never commit their values.

## Verification commands

The project uses a short, reproducible validation loop:

```bash
pnpm test
pnpm check
pnpm build
```

The current reviewed source passes **32 Vitest tests**, the TypeScript check, formatting verification, and the production build. Route components, testimonials, icons, and the data layer are split into dedicated chunks. The primary bundle decreased from **562.59 kB** to **438.04 kB** raw in the comparable production build; admin charts remain an admin-only lazy dependency. Local Lighthouse evidence and its runtime limitations are recorded in [attachment-13-audit.md](./attachment-13-audit.md).

## Data and migration workflow

The schema lives in `drizzle/schema.ts`, query helpers live in `server/db.ts`, and the tRPC contract is defined in `server/routers.ts`. For a local database, `pnpm db:push` runs the Drizzle generation/migration script. In the managed WebDev environment, review generated SQL before applying it through the managed database workflow; do not use destructive SQL against production data.

Project images are referenced through permanent storage URLs rather than committed into the repository. The admin project editor stores gallery metadata as JSON containing a URL, descriptive alt text, and display order. It also supports nullable case-study copy, optional before/after image metadata, and an explicit approval gate. Booking requests include an optional aesthetic preference that remains protected in admin detail and CSV export. The public detail route is fail-closed: it waits for the managed record and renders the branded 404 when no published record exists, rather than falling back to unapproved reference imagery.

## Hosting and domain

The current Manus review host is [glloriaport-marmsbvo.manus.space](https://glloriaport-marmsbvo.manus.space/). The intended free external target is Vercel; [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) documents the private-repository import, required variable **names**, OAuth callback registration, and post-deploy checks. `DOMAIN_SETUP.md` documents custom-domain, HTTPS, canonical URL, social metadata, and cutover checks. No `*.vercel.app` URL is claimed until an enabled Vercel connection completes a deployment successfully.

## Project referral and campaign attribution

Project-detail CTAs may pass a published project slug into the consultation flow. The server repeats the public-project check before storing its title with the protected booking record. Booking attribution retains only bounded URL values for `utm_source`, `utm_medium`, and `utm_campaign`; it does not retain referrers, IP addresses, click identifiers, browser fingerprints, or third-party tracking payloads. The visitor's name, phone, email, and project description are never written to browser storage; only non-sensitive space preferences may be kept in `sessionStorage` until the current tab/session ends.

## Repository hygiene

`.gitignore` excludes dependencies, build output, local environment files, logs, databases, and platform-generated metadata. Before exporting or sharing the repository, check `git status --ignored` and confirm that no `.env`, `dist`, `node_modules`, log, or local media path is staged. The private GitHub repository is the source of truth; production publishing should run from the `main` branch through Vercel.
