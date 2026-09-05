import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

/**
 * Regression guard for the highest-impact production bug found in the
 * September 2026 audit.
 *
 * `notifyOwner` used to THROW a TRPCError when BUILT_IN_FORGE_API_URL /
 * BUILT_IN_FORGE_API_KEY were unset — which is exactly the state of the Vercel
 * deployment. Because `consultations.create` awaits it AFTER persisting the
 * request, every single booking:
 *   1. was written to the database, then
 *   2. blew up with a 500, so
 *   3. the visitor saw "we could not send your request", resubmitted, and
 *      created duplicate rows — while the studio owner was never notified.
 *
 * Notifications are a side channel. They must never invalidate the business
 * action that triggered them.
 */
describe("notifyOwner resilience", () => {
  const originalUrl = process.env.BUILT_IN_FORGE_API_URL;
  const originalKey = process.env.BUILT_IN_FORGE_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.BUILT_IN_FORGE_API_URL = originalUrl;
    process.env.BUILT_IN_FORGE_API_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it("returns false instead of throwing when the service is not configured", async () => {
    process.env.BUILT_IN_FORGE_API_URL = "";
    process.env.BUILT_IN_FORGE_API_KEY = "";

    const { notifyOwner } = await import("./_core/notification");

    await expect(
      notifyOwner({ title: "طلب استشارة جديد — تجربة", content: "تفاصيل" })
    ).resolves.toBe(false);
  });

  it("returns false when only the API key is missing", async () => {
    process.env.BUILT_IN_FORGE_API_URL = "https://forge.example.com";
    process.env.BUILT_IN_FORGE_API_KEY = "";

    const { notifyOwner } = await import("./_core/notification");

    await expect(
      notifyOwner({ title: "طلب استشارة جديد", content: "تفاصيل" })
    ).resolves.toBe(false);
  });

  it("returns false when the upstream service errors, without throwing", async () => {
    process.env.BUILT_IN_FORGE_API_URL = "https://forge.example.com";
    process.env.BUILT_IN_FORGE_API_KEY = "secret";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network unreachable"))
    );

    const { notifyOwner } = await import("./_core/notification");

    await expect(
      notifyOwner({ title: "طلب استشارة جديد", content: "تفاصيل" })
    ).resolves.toBe(false);

    vi.unstubAllGlobals();
  });

  it("still rejects genuinely invalid payloads so callers fix them", async () => {
    process.env.BUILT_IN_FORGE_API_URL = "https://forge.example.com";
    process.env.BUILT_IN_FORGE_API_KEY = "secret";

    const { notifyOwner } = await import("./_core/notification");

    await expect(
      notifyOwner({ title: "   ", content: "تفاصيل" })
    ).rejects.toThrow();
  });
});
