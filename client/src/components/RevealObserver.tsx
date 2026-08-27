import { useLayoutEffect } from "react";

export const REVEAL_SELECTOR = [
  ".home-page > section",
  ".archive-page > *",
  ".detail-page > *",
  ".contact-page > *",
  ".booking-page > *",
].join(", ");

export default function RevealObserver() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("motion-ready");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index * 35, 210)}ms`);
      observer.observe(element);
    });

    const heroImage = document.querySelector<HTMLElement>(".hero-visual-frame img");
    let frame = 0;
    const updateParallax = () => {
      if (!heroImage || frame) return;
      frame = window.requestAnimationFrame(() => {
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - heroImage.getBoundingClientRect().top) / (window.innerHeight + heroImage.offsetHeight)));
        heroImage.style.setProperty("--parallax-y", `${progress * 10}px`);
        frame = 0;
      });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateParallax);
      if (frame) window.cancelAnimationFrame(frame);
      heroImage?.style.removeProperty("--parallax-y");
    };
  }, []);

  return null;
}
