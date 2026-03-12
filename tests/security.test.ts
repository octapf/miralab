import { createHmac } from 'node:crypto';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { verifyMetaSignature } from '@/lib/security';

describe('verifyMetaSignature', () => {
  it('accepts a valid signature', () => {
    const appSecret = 'test-secret';
    const rawBody = JSON.stringify({ hello: 'world' });
    const digest = createHmac('sha256', appSecret).update(rawBody).digest('hex');

    const valid = verifyMetaSignature({
      rawBody,
      appSecret,
      signatureHeader: `sha256=${digest}`,
    });

    assert.equal(valid, true);
  });

  it('rejects invalid signatures', () => {
    const valid = verifyMetaSignature({
      rawBody: '{"hello":"world"}',
      appSecret: 'test-secret',
      signatureHeader: 'sha256=invalid',
    });

    assert.equal(valid, false);
  });
});
