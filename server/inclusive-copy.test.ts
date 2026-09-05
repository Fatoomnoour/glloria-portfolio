import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Keeps the site's Arabic copy addressable by every client.
 *
 * The original copy addressed a female reader throughout — "احجزي", "شاهدي",
 * "تواصلي", "ما الذي تتخيلينه". For a studio whose archive includes
 * restaurants, cafés and clinics, the decision-maker is frequently male and on
 * residential work the decision is usually shared, so feminine-only imperatives
 * quietly tell half the market the site is not for them. This test fails the
 * build if any of them reappear.
 *
 * It matches whole words only, so legitimate feminine words elsewhere (for
 * example the studio owner's own bio) are unaffected.
 */

const FEMININE_IMPERATIVES = [
  "احجزي",
  "شاهدي",
  "تواصلي",
  "تابعينا",
  "اختاري",
  "راجعي",
  "راجعيها",
  "أرسلي",
  "اكتشفي",
  "حاولي",
  "تتخيلينه",
  "إليكِ",
  "لكِ",
  "بكِ",
  "مشروعكِ",
  "مساحتكِ",
];

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "ui") continue; // vendored shadcn primitives, English only
      sourceFiles(full, acc);
    } else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

describe("Arabic copy is gender-neutral", () => {
  const files = [...sourceFiles("client/src"), ...sourceFiles("shared")];

  it("scans a meaningful number of source files", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it.each(FEMININE_IMPERATIVES)("does not address the reader with %s", word => {
    // \p{L} keeps "احجزي" from matching inside a longer unrelated word.
    const pattern = new RegExp(`(?<!\\p{L})${word}(?!\\p{L})`, "u");
    const offenders = files
      .filter(file => pattern.test(readFileSync(file, "utf8")))
      .map(file => file.replace(/\\/g, "/"));

    expect(
      offenders,
      `"${word}" addresses only female readers; use the neutral form instead`
    ).toEqual([]);
  });
});
