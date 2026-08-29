import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

export const REVEAL_SELECTOR = [
  ".home-page > section",
  ".archive-page > *",
  ".detail-page > *",
  ".contact-page > *",
  ".booking-page > *",
].join(", ");

/**
 * Fixes three related bugs that made whole pages (or parts of them) appear
 * permanently blank, stuck at the CSS default of `opacity: 0` set in
 * index.css for `.archive-page > *` / `.detail-page > *` / etc. until a
 * `.is-revealed` class is added:
 *
 * 1. This component used to run its setup effect exactly once (on the very
 *    first mount, e.g. when the Home page loads). It never re-ran when the
 *    visitor navigated to another route via the SPA router (wouter), so the
 *    IntersectionObserver never learned about the new page's sections and
 *    they stayed invisible forever.
 *    Fix: depend the effect on the current `location` so it tears down and
 *    re-initializes on every navigation.
 *
 * 2. Pages whose content is fetched asynchronously (e.g. ProjectDetail /
 *    Projects waiting on a tRPC query) render their real sections *after*
 *    the initial `querySelectorAll` scan already ran, so those elements
 *    were never observed and also stayed invisible even on a fresh full
 *    page load.
 *    Fix: watch the page with a MutationObserver (childList/subtree) and
 *    observe any newly added matching elements as they appear.
 *
 * 3. Even once an element was correctly revealed (had `.is-revealed` added
 *    to its `classList`), a *later* React re-render of that same element
 *    could blow the class away again. This isn't hypothetical: Projects.tsx
 *    sets `isFiltering` true on mount and flips it back to false ~280ms
 *    later via a timer, which re-renders `#project-archive` with a fresh
 *    `className="archive-results "` string — silently dropping the
 *    `is-revealed` class that was added imperatively by this observer.
 *    Since the IntersectionObserver had already `unobserve()`d that element
 *    (one-shot reveal), it was never re-added, and the whole results grid
 *    stayed invisible permanently, even after scrolling.
 *    Fix: also watch `attributes`/`attributeFilter: ["class"]` mutations;
 *    if a previously-revealed element loses the `is-revealed` class, put it
 *    right back.
 */
export default function RevealObserver() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("motion-ready");

    const observed = new WeakSet<Element>();
    const revealed = new WeakSet<Element>();
    let delayIndex = 0;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealed.add(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    const observeElement = (element: HTMLElement) => {
      if (observed.has(element)) return;
      observed.add(element);
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(delayIndex * 35, 210)}ms`
      );
      delayIndex += 1;
      observer.observe(element);
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach(observeElement);
    };

    // Initial scan for content that is already in the DOM (static pages,
    // or async pages on a second render after data has already arrived).
    scan();

    // Catch content that mounts later — e.g. a tRPC-backed page that
    // renders its loading state first and swaps in the real sections
    // once the query resolves. Also re-checks elements whose `class`
    // attribute changed, to guard against a re-render silently dropping
    // an already-applied `is-revealed` class (see bug #3 above).
    let scanScheduled = false;
    const scheduleScan = () => {
      if (scanScheduled) return;
      scanScheduled = true;
      window.requestAnimationFrame(() => {
        scanScheduled = false;
        scan();
      });
    };
    const root = document.querySelector("main") ?? document.body;
    const mutationObserver = new MutationObserver(mutations => {
      scheduleScan();
      for (const mutation of mutations) {
        if (mutation.type !== "attributes") continue;
        const target = mutation.target as HTMLElement;
        if (
          revealed.has(target) &&
          !target.classList.contains("is-revealed")
        ) {
          target.classList.add("is-revealed");
        }
      }
    });
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    const heroImage = document.querySelector<HTMLElement>(
      ".hero-parallax-image"
    );
    let frame = 0;
    const updateParallax = () => {
      if (!heroImage || frame) return;
      frame = window.requestAnimationFrame(() => {
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (window.innerHeight / 2 - heroImage.getBoundingClientRect().top) /
              (window.innerHeight + heroImage.offsetHeight)
          )
        );
        heroImage.style.setProperty("--parallax-y", `${progress * 10}px`);
        frame = 0;
      });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", updateParallax);
      if (frame) window.cancelAnimationFrame(frame);
      heroImage?.style.removeProperty("--parallax-y");
    };
  }, [location]);

  return null;
}
