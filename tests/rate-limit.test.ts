import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { checkRateLimit } from '@/lib/rate-limit';

describe('checkRateLimit', () => {
  it('blocks requests above limit', () => {
    const key = `test:${Date.now()}`;

    const first = checkRateLimit({ key, limit: 2, windowMs: 60_000 });
    const second = checkRateLimit({ key, limit: 2, windowMs: 60_000 });
    const third = checkRateLimit({ key, limit: 2, windowMs: 60_000 });

    assert.equal(first.ok, true);
    assert.equal(second.ok, true);
    assert.equal(third.ok, false);
    assert.ok(third.retryAfterSeconds > 0);
  });
});
