import { createHmac, timingSafeEqual } from 'node:crypto';
import twilio from 'twilio';

function safeCompare(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyMetaSignature(params: {
  rawBody: string;
  signatureHeader: string | null;
  appSecret: string;
}): boolean {
  if (!params.signatureHeader?.startsWith('sha256=')) return false;

  const expected = createHmac('sha256', params.appSecret).update(params.rawBody).digest('hex');
  const received = params.signatureHeader.slice('sha256='.length);
  return safeCompare(expected, received);
}

function buildPublicUrl(request: Request): string {
  const requestUrl = new URL(request.url);
  const proto = request.headers.get('x-forwarded-proto') || requestUrl.protocol.replace(':', '');
  const host =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || requestUrl.host;
  return `${proto}://${host}${requestUrl.pathname}${requestUrl.search}`;
}

export function verifyTwilioRequest(params: {
  request: Request;
  rawBody: string;
  authToken: string;
}): boolean {
  const signature = params.request.headers.get('x-twilio-signature');
  if (!signature) return false;

  const twilioParams = Object.fromEntries(new URLSearchParams(params.rawBody).entries());
  const url = buildPublicUrl(params.request);
  return twilio.validateRequest(params.authToken, signature, url, twilioParams);
}
