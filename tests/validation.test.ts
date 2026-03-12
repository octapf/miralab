import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { contactPayloadSchema, escapeHtml } from '@/lib/validation';

describe('contactPayloadSchema', () => {
  it('accepts valid payloads', () => {
    const result = contactPayloadSchema.safeParse({
      name: 'Octavio',
      email: 'octavio@example.com',
      message: 'Hola, necesito presupuesto para un sitio.',
    });

    assert.equal(result.success, true);
  });

  it('rejects invalid payloads', () => {
    const result = contactPayloadSchema.safeParse({
      name: 'A',
      email: 'not-an-email',
      message: '',
    });

    assert.equal(result.success, false);
  });
});

describe('escapeHtml', () => {
  it('escapes html metacharacters', () => {
    const escaped = escapeHtml(`<script>alert("x")</script>`);
    assert.equal(escaped, '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });
});
