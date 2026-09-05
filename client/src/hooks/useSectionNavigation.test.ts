import { describe, expect, it } from "vitest";
import { isNavItemActive, parseNavHref } from "./useSectionNavigation";

/**
 * The header used to render every menu entry as a plain <a href>, which forced
 * a full document reload on each click and left the active-state comparison
 * (`location === item.href`) permanently false for "/#section" entries.
 * These tests pin the parsing and active-state rules that replaced it.
 */
describe("parseNavHref", () => {
  it("splits a section link into path and hash", () => {
    expect(parseNavHref("/#about")).toEqual({ path: "/", hash: "about" });
  });

  it("treats a plain route as having no hash", () => {
    expect(parseNavHref("/projects")).toEqual({
      path: "/projects",
      hash: null,
    });
  });

  it("defaults an empty path to the home route", () => {
    expect(parseNavHref("#services")).toEqual({ path: "/", hash: "services" });
  });

  it("keeps nested routes intact", () => {
    expect(parseNavHref("/projects/boska")).toEqual({
      path: "/projects/boska",
      hash: null,
    });
  });
});

describe("isNavItemActive", () => {
  it("marks home active only on the exact home route", () => {
    expect(isNavItemActive("/", "/")).toBe(true);
    expect(isNavItemActive("/", "/projects")).toBe(false);
  });

  it("marks a section route active on its own page and its children", () => {
    expect(isNavItemActive("/projects", "/projects")).toBe(true);
    expect(isNavItemActive("/projects", "/projects/boska")).toBe(true);
  });

  it("does not mark a sibling route active on a prefix collision", () => {
    expect(isNavItemActive("/contact", "/contacts-archive")).toBe(false);
  });

  it("never marks in-page section links as the current page", () => {
    expect(isNavItemActive("/#about", "/")).toBe(false);
    expect(isNavItemActive("/#services", "/")).toBe(false);
  });
});
