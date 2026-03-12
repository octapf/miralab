export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function fetchWithRetry(
  input: string,
  init: RequestInit,
  options?: { attempts?: number; timeoutMs?: number; retryDelayMs?: number }
): Promise<Response> {
  const attempts = options?.attempts ?? 2;
  const timeoutMs = options?.timeoutMs ?? 9000;
  const retryDelayMs = options?.retryDelayMs ?? 250;

  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await withTimeout(
        fetch(input, init),
        timeoutMs,
        `Request timeout after ${timeoutMs}ms`
      );
      if (response.ok || attempt === attempts) {
        return response;
      }

      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        throw error;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
  }

  throw lastError instanceof Error ? lastError : new Error('Request failed');
}
