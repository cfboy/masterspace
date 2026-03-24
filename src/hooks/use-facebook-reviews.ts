import { useEffect, useState } from 'react';

export interface FacebookReview {
  reviewer: {
    name: string;
    picture?: { data?: { url: string } };
  };
  rating: number;
  review_text?: string;
  created_time: string;
}

interface UseFacebookReviewsResult {
  reviews: FacebookReview[];
  loading: boolean;
  error: Error | null;
}

const CACHE_KEY = 'fb-reviews';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCached(): FacebookReview[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw) as {
      data: FacebookReview[];
      timestamp: number;
    };
    if (Date.now() - timestamp < CACHE_TTL) return data;
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
  return null;
}

function setCache(data: FacebookReview[]) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // ignore quota errors
  }
}

export function useFacebookReviews(): UseFacebookReviewsResult {
  const [reviews, setReviews] = useState<FacebookReview[]>(() => getCached() ?? []);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(() => getCached() === null);

  useEffect(() => {
    if (getCached() !== null) return;

    const pageId = import.meta.env.VITE_FACEBOOK_PAGE_ID;
    const token = import.meta.env.VITE_FACEBOOK_PAGE_TOKEN;

    if (!pageId || !token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const url = `https://graph.facebook.com/v21.0/${pageId}/ratings?fields=reviewer{name,picture.width(100).height(100)},rating,review_text,created_time&limit=25&access_token=${token}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Facebook API error: ${res.status}`);
        return res.json() as Promise<{ data: FacebookReview[] }>;
      })
      .then(({ data }) => {
        if (cancelled) return;
        // Only keep reviews that have text
        const filtered = data.filter((r) => r.review_text && r.review_text.trim().length > 0);
        setCache(filtered);
        setReviews(filtered);
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
  }, []);

  return { reviews, loading, error };
}
