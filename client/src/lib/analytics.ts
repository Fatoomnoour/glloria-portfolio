/**
 * Privacy-friendly page analytics (Umami), loaded at runtime instead of from
 * index.html.
 *
 * WHY NOT IN index.html
 * ---------------------
 * The markup previously used Vite's `%VITE_ANALYTICS_ENDPOINT%` HTML env
 * substitution. When those variables are not defined at build time Vite leaves
 * the placeholder verbatim, so production shipped a literal
 * `<script src="%VITE_ANALYTICS_ENDPOINT%/umami">` tag. Every visitor fired a
 * guaranteed 404 and no analytics were ever recorded.
 *
 * Loading it from here makes the integration fail-safe: if the endpoint or the
 * website id is missing, nothing is injected at all.
 *
 * TO ENABLE
 * ---------
 * Set both variables in Vercel (Project Settings -> Environment Variables):
 *   VITE_ANALYTICS_ENDPOINT   e.g. https://analytics.example.com
 *   VITE_ANALYTICS_WEBSITE_ID e.g. 0f8c...  (the Umami site UUID)
 */
export function initAnalytics() {
  if (typeof document === "undefined") return;

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

  if (!endpoint || !websiteId) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint.replace(/\/+$/, "")}/script.js`;
  script.dataset.websiteId = websiteId;
  document.head.appendChild(script);
}
