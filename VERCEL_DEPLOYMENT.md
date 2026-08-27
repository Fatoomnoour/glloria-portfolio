# Glloria — Free Vercel Deployment Runbook

This runbook prepares the existing React/Vite + Express/tRPC project for a **free `*.vercel.app` deployment**. It does not replace the architecture with Next.js and it does not disclose or store any secret values in source control.

> A Vercel deployment is not yet confirmed for this repository. Follow the steps below after enabling an authorised Vercel connection or signing in to Vercel directly.

## 1. Create the project from the private repository

Import the private repository at [Fatoomnoour/glloria-portfolio](https://github.com/Fatoomnoour/glloria-portfolio). Keep the repository private. Use the repository root as the root directory and select **Other** as the framework preset if Vercel does not infer the Vite build.

| Setting          | Required value                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Install command  | `pnpm install --frozen-lockfile`                                                                 |
| Build command    | `pnpm build`                                                                                     |
| Output directory | `dist/public`                                                                                    |
| Node runtime     | Use the version compatible with the project’s `packageManager` setting and current dependencies. |
| Function entry   | `api/[...route].ts` is discovered from the repository `api/` directory.                          |

The committed `vercel.json` defines the build output, a 30-second API function duration, safe response headers, a `/manus-storage/*` proxy rewrite, and SPA fallback rewrites for public routes. Vercel’s official configuration reference recognises these project-level settings. [1]

## 2. Set environment variables in Vercel

Add the following names through **Project Settings → Environment Variables**. Supply values separately and never commit an `.env` file. Apply the required secrets to Production and Preview only when their corresponding OAuth redirect URIs are registered.

| Variable                    |                                 Required | Purpose                                                                                                        |
| --------------------------- | ---------------------------------------: | -------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`              |                                      Yes | MySQL/TiDB database connection for projects, bookings, testimonials, and users.                                |
| `JWT_SECRET`                |                                      Yes | Signs session cookies.                                                                                         |
| `VITE_APP_ID`               |                                      Yes | Public Manus OAuth application identifier compiled into the client.                                            |
| `VITE_OAUTH_PORTAL_URL`     |                                      Yes | Public OAuth portal base used to start sign-in.                                                                |
| `OAUTH_SERVER_URL`          |                                      Yes | Server-side OAuth exchange endpoint.                                                                           |
| `OWNER_OPEN_ID`             |                                      Yes | Identifies the project owner for protected owner notification flows.                                           |
| `OWNER_NAME`                |                              Recommended | Owner display name used by existing platform-level configuration.                                              |
| `BUILT_IN_FORGE_API_URL`    | Yes for existing `/manus-storage` assets | Server-side storage proxy base URL.                                                                            |
| `BUILT_IN_FORGE_API_KEY`    | Yes for existing `/manus-storage` assets | Server-side credential used only by the storage proxy.                                                         |
| `VITE_ANALYTICS_ENDPOINT`   |                                 Optional | Existing client analytics script endpoint. Omit only if that script is also intentionally removed or replaced. |
| `VITE_ANALYTICS_WEBSITE_ID` |                                 Optional | Existing client analytics site identifier.                                                                     |

The `VITE_` prefix makes a value available to the browser bundle. Do **not** put secrets, database URLs, signing keys, or storage credentials in variables with that prefix.

## 3. Register the exact OAuth callback

After the first successful Vercel build yields its actual host, register this callback with the OAuth provider:

```text
https://YOUR-VERCEL-HOST.vercel.app/api/oauth/callback
```

If Preview deployments are used for real sign-in testing, their distinct preview hosts must also be allowed by the OAuth provider. Do not treat a local or Manus callback registration as automatically valid for Vercel.

## 4. Verify the deployment before treating it as live

Confirm the chosen `*.vercel.app` host returns a successful static homepage, valid API requests under `/api/trpc`, and original project images under `/manus-storage/*`. Then test refresh/direct navigation to `/projects/interior`, `/projects/boska`, `/booking`, `/privacy`, `/terms`, and `/admin`.

Confirm unauthenticated `/admin` remains protected; confirm a completed booking persists; and verify that the booking success path merely opens a user-initiated, prefilled WhatsApp message. It must never send WhatsApp automatically from the server.

Once a canonical Vercel host is confirmed, update **all** of the following in one small source change: `client/index.html` canonical/Open Graph/structured-data URL fields, `client/public/robots.txt`, `client/public/sitemap.xml`, `DOMAIN_SETUP.md`, and this guide. Do not pre-emptively point production SEO metadata to an unverified Vercel domain.

## References

[1] [Vercel, “Static Configuration with vercel.json”](https://vercel.com/docs/project-configuration/vercel-json).
