/**
 * Provider-independent rate-limiting interface for Vercel serverless routes.
 *
 * Uses Upstash Redis REST API when UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are configured. When unconfigured, returns
 * `configured: false` rather than relying on an unreliable in-memory Map
 * across ephemeral serverless instances.
 */

export interface RateLimitResult {
  allowed: boolean;
  configured: boolean;
  limit: number;
  remaining: number;
  resetAtEpochSeconds: number;
  retryAfterSeconds: number;
}

export interface RateLimiter {
  check(identifier: string): Promise<RateLimitResult>;
}

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_SECONDS = 600; // 10 minutes

export class UpstashRestRateLimiter implements RateLimiter {
  private readonly url: string;
  private readonly token: string;
  private readonly limit: number;
  private readonly windowSeconds: number;

  constructor(
    url: string,
    token: string,
    limit = DEFAULT_LIMIT,
    windowSeconds = DEFAULT_WINDOW_SECONDS
  ) {
    this.url = url.replace(/\/$/, "");
    this.token = token;
    this.limit = limit;
    this.windowSeconds = windowSeconds;
  }

  async check(identifier: string): Promise<RateLimitResult> {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const windowBucket = Math.floor(nowSeconds / this.windowSeconds);
    const resetAtEpochSeconds = (windowBucket + 1) * this.windowSeconds;
    const retryAfterSeconds = Math.max(1, resetAtEpochSeconds - nowSeconds);
    const key = `ratelimit:contact:${identifier}:${windowBucket}`;

    const response = await fetch(`${this.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, this.windowSeconds, "NX"],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Upstash rate limit request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as Array<{ result?: number }>;
    const count = typeof payload?.[0]?.result === "number" ? payload[0].result : 1;
    const remaining = Math.max(0, this.limit - count);

    return {
      allowed: count <= this.limit,
      configured: true,
      limit: this.limit,
      remaining,
      resetAtEpochSeconds,
      retryAfterSeconds,
    };
  }
}

class UnconfiguredRateLimiter implements RateLimiter {
  async check(): Promise<RateLimitResult> {
    const nowSeconds = Math.floor(Date.now() / 1000);
    return {
      allowed: true,
      configured: false,
      limit: DEFAULT_LIMIT,
      remaining: DEFAULT_LIMIT,
      resetAtEpochSeconds: nowSeconds + DEFAULT_WINDOW_SECONDS,
      retryAfterSeconds: 0,
    };
  }
}

export function createContactRateLimiter(): RateLimiter {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (url && token) {
    return new UpstashRestRateLimiter(url, token);
  }

  return new UnconfiguredRateLimiter();
}

/**
 * Extracts client IP safely, prioritizing Vercel's trusted edge header.
 */
export function getClientIp(request: Request): string {
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) {
    return vercelIp.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

export function buildRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  if (!result.configured) {
    return {
      "X-RateLimit-Status": "unconfigured",
    };
  }

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAtEpochSeconds),
  };

  if (!result.allowed) {
    headers["Retry-After"] = String(result.retryAfterSeconds);
  }

  return headers;
}
