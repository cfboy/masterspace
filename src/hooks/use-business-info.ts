import { useCallback } from 'react';

import { useSanity } from './use-sanity';
import { fetchBusinessInfo, DEFAULT_BUSINESS_INFO, type SanityBusinessInfo } from '@/lib/sanity';

export function useBusinessInfo(): SanityBusinessInfo {
  const { data } = useSanity(useCallback(() => fetchBusinessInfo(), []), 'businessInfo');
  return data ?? DEFAULT_BUSINESS_INFO;
}
