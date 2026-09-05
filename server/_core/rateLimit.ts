import { TRPCError } from "@trpc/server";

/**
 * In-memory sliding-window rate limiter for public write endpoints.
 *
 * WHY
 * ---
 * `consultations.create` is a publicProcedure whose only protection was a
 * honeypot field. A honeypot stops naive bots; it does nothing against a
 * two-line script, which could fill the studio's booking table with thousands
 * of fake requests and bury the real leads.
 *
 * SCOPE AND LIMITS — READ THIS
 * ----------------------------
 * State lives in module memory. On Vercel each serverless instance keeps its
 * own counters and they reset on cold start, so this raises the cost of casual
 * abuse rather than guaranteeing a global ceiling. That is the correct
 * trade-off for now: it needs no new infrastructure and cannot take the site
 * down. If real abuse appears, swap `hit()` for Vercel KV or Upstash Redis —
 * the call site does not change.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

/** Stops the map growing without bound on a long-lived server process. */
const MAX_TRACKED_KEYS = 10_000;

export type RateLimitOptions = {
  /** Requests permitted inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export const CONSULTATION_RATE_LIMIT: RateLimitOptions = {
  limit: 5,
  windowMs: 60 * 60 * 1000, // 5 booking requests per hour per IP
};

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
  now: number = Date.now()
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const cutoff = now - options.windowMs;
  const bucket = buckets.get(key) ?? { timestamps: [] };

  // Drop anything that has aged out of the window.
  bucket.timestamps = bucket.timestamps.filter(ts => ts > cutoff);

  if (bucket.timestamps.length >= options.limit) {
    const oldest = bucket.timestamps[0];
    buckets.set(key, bucket);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, oldest + options.windowMs - now),
    };
  }

  bucket.timestamps.push(now);

  if (!buckets.has(key) && buckets.size >= MAX_TRACKED_KEYS) {
    // Evict the least recently touched key rather than refusing to track.
    const oldestKey = buckets.keys().next().value;
    if (oldestKey !== undefined) buckets.delete(oldestKey);
  }
  buckets.set(key, bucket);

  return {
    allowed: true,
    remaining: options.limit - bucket.timestamps.length,
    retryAfterMs: 0,
  };
}

/** Throws TOO_MANY_REQUESTS when the caller is over the limit. */
export function enforceRateLimit(
  key: string,
  options: RateLimitOptions,
  message: string
) {
  const result = checkRateLimit(key, options);
  if (result.allowed) return;

  const minutes = Math.ceil(result.retryAfterMs / 60_000);
  throw new TRPCError({
    code: "TOO_MANY_REQUESTS",
    message: `${message} (${minutes} دقيقة)`,
  });
}

/**
 * Best-effort client identity. Behind Vercel the original address arrives in
 * x-forwarded-for; the left-most entry is the client, the rest are proxies.
 */
export function clientKey(
  headers: Record<string, string | string[] | undefined>,
  fallback = "unknown"
): string {
  const forwarded = headers["x-forwarded-for"] ?? headers["X-Forwarded-For"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(",")[0]?.trim();
  return first || fallback;
}

/** Test seam. */
export function __resetRateLimits() {
  buckets.clear();
}
