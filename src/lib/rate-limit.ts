type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

function purgeExpired(now: number) {
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function checkRateLimit(params: { key: string; limit: number; windowMs: number }): {
  ok: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();

  if (store.size > 5000) {
    purgeExpired(now);
  }

  const current = store.get(params.key);
  if (!current || current.resetAt <= now) {
    store.set(params.key, { count: 1, resetAt: now + params.windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  current.count += 1;
  store.set(params.key, current);

  if (current.count > params.limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  return { ok: true, retryAfterSeconds: 0 };
}
