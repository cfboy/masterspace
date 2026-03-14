import { useEffect, useState } from 'react';

interface UseSanityResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useSanity<T>(
  fetcher: () => Promise<T>,
  cacheKey: string
): UseSanityResult<T> {
  const [data, setData] = useState<T | null>(() => {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T;
    }
    return null;
  });
  const [loading, setLoading] = useState(data === null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setData(cached.data as T);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetcher()
      .then((result) => {
        if (cancelled) return;
        cache.set(cacheKey, { data: result, timestamp: Date.now() });
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, cacheKey]);

  return { data, loading, error };
}
