#!/usr/bin/env node
/**
 * Generates client/public/sitemap.xml and robots.txt from one source of truth.
 *
 * WHY
 * ---
 * Both files were hand-maintained. The sitemap listed exactly two project URLs,
 * carried no <lastmod>, and hardcoded the vercel.app host — so any project the
 * studio adds would never be discovered, and every URL would point at the wrong
 * domain the day a custom domain is attached.
 *
 * USAGE
 *   node scripts/generate-sitemap.mjs
 *   SITE_URL=https://glloria.studio node scripts/generate-sitemap.mjs
 *
 * Runs as part of `pnpm build` so the sitemap can never drift from the routes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://glloria-portfolio.vercel.app"
).replace(/\/+$/, "");

/** Static routes, with the priority each deserves for a lead-generating site. */
const staticRoutes = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/projects", changefreq: "monthly", priority: "0.9" },
  { path: "/booking", changefreq: "yearly", priority: "0.9" },
  { path: "/contact", changefreq: "yearly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.2" },
  { path: "/terms", changefreq: "yearly", priority: "0.2" },
];

/**
 * Project slugs are read out of the real-project records rather than retyped,
 * so adding a project to that file publishes it to search engines too.
 * /admin is deliberately absent — it is disallowed in robots.txt.
 */
function projectSlugs() {
  const source = readFileSync(
    join(root, "client/src/data/realProjects.ts"),
    "utf8"
  );
  return [...source.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map(m => m[1]);
}

const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  ...staticRoutes,
  ...projectSlugs().map(slug => ({
    path: `/projects/${slug}`,
    changefreq: "yearly",
    priority: "0.7",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}" />
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(root, "client/public/sitemap.xml"), sitemap);
writeFileSync(join(root, "client/public/robots.txt"), robots);

console.log(`sitemap: ${urls.length} urls @ ${SITE_URL}`);
for (const u of urls) console.log(`  ${SITE_URL}${u.path}`);
