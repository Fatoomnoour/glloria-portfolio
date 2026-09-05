import { beforeEach, describe, expect, it } from "vitest";
import {
  CONSULTATION_RATE_LIMIT,
  __resetRateLimits,
  checkRateLimit,
  clientKey,
  enforceRateLimit,
} from "./_core/rateLimit";

/**
 * `consultations.create` is public and was protected only by a honeypot, which
 * stops naive bots and nothing else. These tests pin the sliding window that
 * now sits in front of it.
 */
describe("rate limiter", () => {
  beforeEach(() => __resetRateLimits());

  const opts = { limit: 3, windowMs: 1000 };

  it("allows requests up to the limit", () => {
    for (let i = 0; i < opts.limit; i++) {
      expect(checkRateLimit("ip-a", opts).allowed, `request ${i + 1}`).toBe(
        true
      );
    }
  });

  it("blocks the request after the limit", () => {
    for (let i = 0; i < opts.limit; i++) checkRateLimit("ip-a", opts);
    const blocked = checkRateLimit("ip-a", opts);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });

  it("keeps separate callers independent", () => {
    for (let i = 0; i < opts.limit; i++) checkRateLimit("ip-a", opts);
    expect(checkRateLimit("ip-a", opts).allowed).toBe(false);
    expect(checkRateLimit("ip-b", opts).allowed).toBe(true);
  });

  it("lets the window slide so a caller recovers", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < opts.limit; i++) checkRateLimit("ip-c", opts, t0);
    expect(checkRateLimit("ip-c", opts, t0).allowed).toBe(false);
    // One millisecond past the window, the earliest hits have aged out.
    expect(checkRateLimit("ip-c", opts, t0 + opts.windowMs + 1).allowed).toBe(
      true
    );
  });

  it("reports remaining capacity", () => {
    expect(checkRateLimit("ip-d", opts).remaining).toBe(2);
    expect(checkRateLimit("ip-d", opts).remaining).toBe(1);
    expect(checkRateLimit("ip-d", opts).remaining).toBe(0);
  });

  it("throws TOO_MANY_REQUESTS once exhausted", () => {
    for (let i = 0; i < CONSULTATION_RATE_LIMIT.limit; i++) {
      enforceRateLimit("ip-e", CONSULTATION_RATE_LIMIT, "slow down");
    }
    expect(() =>
      enforceRateLimit("ip-e", CONSULTATION_RATE_LIMIT, "slow down")
    ).toThrowError(/slow down/);
  });

  it("permits five consultation requests per hour", () => {
    expect(CONSULTATION_RATE_LIMIT.limit).toBe(5);
    expect(CONSULTATION_RATE_LIMIT.windowMs).toBe(3_600_000);
  });
});

describe("clientKey", () => {
  it("takes the left-most x-forwarded-for entry, which is the client", () => {
    expect(
      clientKey({
        "x-forwarded-for": "203.0.113.7, 70.41.3.18, 150.172.238.178",
      })
    ).toBe("203.0.113.7");
  });

  it("handles a header delivered as an array", () => {
    expect(clientKey({ "x-forwarded-for": ["198.51.100.4"] })).toBe(
      "198.51.100.4"
    );
  });

  it("falls back when the header is absent, so limiting still applies", () => {
    expect(clientKey({})).toBe("unknown");
  });

  it("ignores an empty header rather than keying on an empty string", () => {
    expect(clientKey({ "x-forwarded-for": "" })).toBe("unknown");
  });
});
