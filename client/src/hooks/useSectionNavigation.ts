import { useCallback } from "react";
import { useLocation } from "wouter";

/**
 * Section-aware navigation for the primary menu.
 *
 * WHY THIS EXISTS
 * ---------------
 * The header used to render every menu entry as a plain `<a href>`. In a wouter
 * SPA that triggers a full document navigation on every click: the whole JS,
 * CSS and image payload is re-downloaded and the route-level code splitting in
 * vite.config.ts buys nothing. It also meant `location === item.href` never
 * matched the "/#about" style entries, so the active-state underline was dead
 * for three of the six links.
 *
 * This hook resolves a menu href into the right behaviour:
 *   "/projects"  -> client-side route change
 *   "/#about"    -> scroll to #about, first routing home if we are elsewhere
 *
 * Anchors that point at a section which is not currently rendered (for example
 * #testimonials while no approved testimonials exist) degrade to landing on the
 * home page instead of leaving the visitor on a dead link.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  // Move keyboard focus with the viewport, otherwise the next Tab press jumps
  // back to the header and the scroll is meaningless to keyboard users.
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}

export type NavTarget = { path: string; hash: string | null };

export function parseNavHref(href: string): NavTarget {
  const [rawPath, hash] = href.split("#");
  return { path: rawPath || "/", hash: hash || null };
}

export function useSectionNavigation() {
  const [location, setLocation] = useLocation();

  return useCallback(
    (href: string) => {
      const { path, hash } = parseNavHref(href);

      if (!hash) {
        if (location !== path) setLocation(path);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (location === path) {
        scrollToSection(hash);
        return;
      }

      setLocation(path);
      // The target section only exists after the new route paints. Two frames
      // is enough for the synchronously-imported Home page; the optional chain
      // means a missing section simply leaves the visitor at the top of it.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(hash));
      });
    },
    [location, setLocation]
  );
}

/** True when a menu entry should render its active underline. */
export function isNavItemActive(href: string, location: string) {
  const { path, hash } = parseNavHref(href);
  if (hash) return false; // section links are never a "current page"
  if (path === "/") return location === "/";
  return location === path || location.startsWith(`${path}/`);
}
