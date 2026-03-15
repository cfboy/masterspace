import { useEffect, useState } from 'react';

interface UseSanityResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

export function useSanity<T>(fetcher: () => Promise<T>, cacheKey: string): UseSanityResult<T> {
  const [data, setData] = useState<T | null>(() => getCached<T>(cacheKey));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (getCached(cacheKey) !== null) return;

    let cancelled = false;

    fetcher()
      .then((result) => {
        if (cancelled) return;
        cache.set(cacheKey, { data: result, timestamp: Date.now() });
        setData(result);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, cacheKey]);

  return { data, loading: data === null && error === null, error };
}
