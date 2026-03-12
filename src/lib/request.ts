export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp?.trim()) return realIp.trim();

  return 'unknown';
}

export function getRequestId(request: Request): string {
  return request.headers.get('x-request-id') || crypto.randomUUID();
}
