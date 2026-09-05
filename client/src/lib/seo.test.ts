/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, beforeEach } from "vitest";
import { absoluteUrl, applySeo, canonicalPath, siteOrigin } from "./seo";
import { seoCopy } from "../hooks/useSeo";

/**
 * Guards the two SEO defects that were actively costing indexation:
 * a canonical hardcoded to the homepage on every route, and a root-relative
 * og:image that social scrapers reject.
 */
describe("canonicalPath", () => {
  it("keeps the root as a bare slash", () => {
    expect(canonicalPath("/")).toBe("/");
  });

  it("drops query strings and hashes so one page has one canonical", () => {
    expect(canonicalPath("/projects?utm_source=fb")).toBe("/projects");
    expect(canonicalPath("/projects#gallery")).toBe("/projects");
    expect(canonicalPath("/booking?a=1#top")).toBe("/booking");
  });

  it("normalises a trailing slash", () => {
    expect(canonicalPath("/projects/")).toBe("/projects");
  });
});

describe("absoluteUrl", () => {
  it("makes root-relative paths absolute, which social scrapers require", () => {
    expect(absoluteUrl("/images/hero.webp")).toBe(
      `${siteOrigin()}/images/hero.webp`
    );
  });

  it("leaves an already-absolute url untouched", () => {
    expect(absoluteUrl("https://cdn.example.com/a.jpg")).toBe(
      "https://cdn.example.com/a.jpg"
    );
  });

  it("never produces a double slash", () => {
    expect(absoluteUrl("images/a.webp")).not.toMatch(/[^:]\/\//);
  });
});

describe("applySeo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  const read = (selector: string, attr = "content") =>
    document.head.querySelector(selector)?.getAttribute(attr);

  it("sets a per-page canonical rather than the homepage", () => {
    applySeo({ title: "T", description: "D", path: "/projects" });
    expect(read('link[rel="canonical"]', "href")).toBe(
      `${siteOrigin()}/projects`
    );
  });

  it("emits an absolute og:image", () => {
    applySeo({
      title: "T",
      description: "D",
      path: "/projects/boska",
      image: "/images/boska.webp",
    });
    expect(read('meta[property="og:image"]')).toMatch(/^https?:\/\//);
  });

  it("does not duplicate tags when applied twice", () => {
    applySeo({ title: "A", description: "1", path: "/" });
    applySeo({ title: "B", description: "2", path: "/contact" });
    expect(
      document.head.querySelectorAll('link[rel="canonical"]')
    ).toHaveLength(1);
    expect(
      document.head.querySelectorAll('meta[property="og:title"]')
    ).toHaveLength(1);
    expect(document.title).toBe("B");
    expect(read('meta[name="description"]')).toBe("2");
  });

  it("declares hreflang alternates for both languages plus x-default", () => {
    applySeo({ title: "T", description: "D", path: "/" });
    const langs = [...document.head.querySelectorAll("link[rel='alternate']")]
      .map(el => el.getAttribute("hreflang"))
      .sort();
    expect(langs).toEqual(["ar", "en", "x-default"]);
  });

  it("marks noIndex pages so a 404 never competes with real pages", () => {
    applySeo({ title: "T", description: "D", path: "/nope", noIndex: true });
    expect(read('meta[name="robots"]')).toBe("noindex, nofollow");
  });
});

describe("seo copy", () => {
  it("provides both languages for every page", () => {
    for (const [page, copy] of Object.entries(seoCopy)) {
      for (const locale of ["ar", "en"] as const) {
        expect(copy[locale].title.trim(), `${page}.${locale}`).not.toBe("");
        expect(copy[locale].description.trim(), `${page}.${locale}`).not.toBe(
          ""
        );
      }
    }
  });

  it("keeps descriptions within the length Google renders", () => {
    for (const [page, copy] of Object.entries(seoCopy)) {
      for (const locale of ["ar", "en"] as const) {
        expect(
          copy[locale].description.length,
          `${page}.${locale} description too long`
        ).toBeLessThanOrEqual(175);
      }
    }
  });

  it("gives every page a distinct title", () => {
    const titles = Object.values(seoCopy).map(c => c.ar.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
