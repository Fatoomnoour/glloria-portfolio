/**
 * Per-route document metadata for a client-rendered site.
 *
 * THE PROBLEM THIS SOLVES
 * -----------------------
 * Everything lived in index.html, which means every route shipped the same
 * <title>, the same description, and — worst of all — a canonical hardcoded to
 * the homepage. Google treats a canonical as an instruction, so /projects,
 * /booking, /contact and every project page were all telling it "the real page
 * is the homepage", which is an effective request to drop them from the index.
 * Social previews were broken too: og:image was a root-relative path, and
 * Facebook, WhatsApp and LinkedIn all require an absolute URL.
 *
 * WHAT IT DOES
 * ------------
 * Sets title, description, canonical, Open Graph, Twitter card and hreflang
 * alternates per route, and restores nothing on unmount — the next route's
 * effect overwrites the same nodes, which avoids a flash of stale metadata.
 *
 * LIMITS — READ BEFORE RELYING ON THIS
 * ------------------------------------
 * This runs in the browser. Googlebot renders JavaScript and will pick these
 * up, but many crawlers do not, and social scrapers (Facebook, WhatsApp,
 * Twitter) never execute JS — they read the raw HTML only. So link previews
 * still fall back to the index.html defaults. The real fix is prerendering
 * each route to static HTML at build time; this module is the correct data
 * layer for that step and was written so it can be reused unchanged.
 */

const FALLBACK_ORIGIN = "https://glloria-portfolio.vercel.app";

/**
 * Canonical origin. Set VITE_SITE_URL in Vercel the moment a custom domain is
 * attached — canonical, og:url, hreflang and the OG image all derive from it.
 */
export function siteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  return (configured || FALLBACK_ORIGIN).replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

export type SeoInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/projects". Query and hash are intentionally dropped. */
  path: string;
  /** Root-relative or absolute; converted to absolute for the meta tags. */
  image?: string;
  imageAlt?: string;
  /** "website" for listings, "article" for a project case study. */
  type?: "website" | "article";
  locale?: "ar" | "en";
  /** Set true for pages that must never be indexed (e.g. the admin console). */
  noIndex?: boolean;
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string | null
) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);

  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Strips query and hash so two URLs for one page cannot both be canonical. */
export function canonicalPath(path: string): string {
  const clean = path.split(/[?#]/)[0] || "/";
  if (clean === "/") return "/";
  return clean.replace(/\/+$/, "") || "/";
}

export function applySeo(input: SeoInput) {
  const path = canonicalPath(input.path);
  const url = absoluteUrl(path);
  const locale = input.locale ?? "ar";
  const image = absoluteUrl(
    input.image ?? "/images/hero-living-room-1920w.webp"
  );

  document.title = input.title;

  upsertMeta("name", "description", input.description);
  upsertLink("canonical", url);

  upsertMeta("property", "og:title", input.title);
  upsertMeta("property", "og:description", input.description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:type", input.type ?? "website");
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:locale", locale === "ar" ? "ar_EG" : "en_US");
  if (input.imageAlt) upsertMeta("property", "og:image:alt", input.imageAlt);

  upsertMeta("name", "twitter:title", input.title);
  upsertMeta("name", "twitter:description", input.description);
  upsertMeta("name", "twitter:image", image);

  // The site serves both languages from one URL, so every route is its own
  // alternate. Once /ar and /en prefixes exist these become distinct hrefs.
  upsertLink("alternate", url, "ar");
  upsertLink("alternate", url, "en");
  upsertLink("alternate", url, "x-default");

  upsertMeta(
    "name",
    "robots",
    input.noIndex ? "noindex, nofollow" : "index, follow"
  );
}
