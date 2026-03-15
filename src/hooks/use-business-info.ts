import { useCallback } from 'react';

import { DEFAULT_BUSINESS_INFO, type SanityBusinessInfo, fetchBusinessInfo } from '@/lib/sanity';

import { useSanity } from './use-sanity';

export function useBusinessInfo(): SanityBusinessInfo {
  const { data } = useSanity(
    useCallback(() => fetchBusinessInfo(), []),
    'businessInfo'
  );
  return data ?? DEFAULT_BUSINESS_INFO;
}
