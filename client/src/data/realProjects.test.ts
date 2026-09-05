import { describe, expect, it } from "vitest";
import { missingFacts, realProjects } from "./realProjects";

/**
 * The repository's stated content rule is that the site never invents a city,
 * year, area, client, scope or execution claim that the studio has not
 * supplied. These tests keep that rule enforceable rather than aspirational.
 */
describe("real project records", () => {
  it("covers the six supplied projects with unique slugs", () => {
    expect(realProjects).toHaveLength(6);
    const slugs = realProjects.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url-safe slugs and image basenames", () => {
    for (const p of realProjects) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.imageSlug).toMatch(/^project-[a-z0-9-]+$/);
    }
  });

  it("carries bilingual copy for every text field", () => {
    for (const p of realProjects) {
      for (const field of [
        "name",
        "intro",
        "statement",
        "description",
        "materials",
        "provenance",
        "sector",
      ] as const) {
        expect(
          p[field].ar.trim().length,
          `${p.slug}.${field}.ar`
        ).toBeGreaterThan(0);
        expect(
          p[field].en.trim().length,
          `${p.slug}.${field}.en`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("never claims a fact the studio has not supplied", () => {
    for (const p of realProjects) {
      expect(p.location).toBeNull();
      expect(p.year).toBeNull();
      expect(p.area).toBeNull();
      expect(p.serviceScope).toBeNull();
      expect(missingFacts(p)).toEqual([
        "location",
        "year",
        "area",
        "serviceScope",
      ]);
    }
  });

  it("labels the villa set as a visualisation, not executed work", () => {
    const villa = realProjects.find(p => p.slug === "private-villa");
    expect(villa?.assetKind).toBe("visualisation");
    expect(villa?.provenance.ar).toContain("ليست صور تنفيذ فعلي");
    expect(villa?.provenance.en).toContain("not executed-project photography");
  });

  it("labels Boska as mixed, since it pairs a render with site photography", () => {
    const boska = realProjects.find(p => p.slug === "boska");
    expect(boska?.assetKind).toBe("mixed");
  });

  it("marks every other project as executed photography", () => {
    const executed = realProjects.filter(p => p.assetKind === "executed");
    expect(executed.map(p => p.slug).sort()).toEqual([
      "classic-white-clinic",
      "elite",
      "private-residence",
      "sara-alaa",
    ]);
  });

  it("accounts for all 31 supplied images", () => {
    const total = realProjects.reduce((sum, p) => sum + p.imageCount, 0);
    expect(total).toBe(25); // 31 sent, minus 1 duplicate and 5 excluded people/branding assets
  });
});
