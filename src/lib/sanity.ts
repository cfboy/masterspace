import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-03-14',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ---------- i18n helper ----------

type Lang = 'es' | 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localized(doc: any, field: string, lang: Lang): string {
  return (doc[`${field}_${lang}`] as string) || (doc[`${field}_es`] as string) || '';
}

// ---------- Types ----------

export interface SanityProject {
  _id: string;
  key: string;
  order: number;
  title_es: string;
  title_en: string;
  location_es: string;
  location_en: string;
  cover: SanityImageSource;
  album: SanityImageSource[];
}

export interface SanityService {
  _id: string;
  key: string;
  order: number;
  icon: SanityIconPicker;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  media: SanityMediaItem[];
}

export interface SanityIconPicker {
  provider: string;
  name: string;
}

export interface SanityMediaItem {
  _type: 'image' | 'file';
  asset: {
    _ref: string;
    url?: string;
    mimeType?: string;
  };
}

export interface SanityCertification {
  _id: string;
  key: string;
  order: number;
  icon: SanityIconPicker;
  accent: string;
  title_es: string;
  title_en: string;
  institution_es: string;
  institution_en: string;
  description_es: string;
  description_en: string;
}

export interface SanityTestimonial {
  _id: string;
  order: number;
  name: string;
  project_es: string;
  project_en: string;
  quote_es: string;
  quote_en: string;
}

// ---------- Queries ----------

const PROJECT_QUERY = `*[_type == "project"] | order(order asc) {
  _id, key, order,
  title_es, title_en,
  location_es, location_en,
  cover, album
}`;

const SERVICE_QUERY = `*[_type == "service"] | order(order asc) {
  _id, key, order, icon,
  title_es, title_en,
  description_es, description_en,
  media[] {
    _type,
    _type == "image" => {
      asset->,
      hotspot, crop
    },
    _type == "file" => {
      asset-> { _ref, url, mimeType }
    }
  }
}`;

const CERTIFICATION_QUERY = `*[_type == "certification"] | order(order asc) {
  _id, key, order, icon, accent,
  title_es, title_en,
  institution_es, institution_en,
  description_es, description_en
}`;

const TESTIMONIAL_QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id, order, name,
  project_es, project_en,
  quote_es, quote_en
}`;

// ---------- Fetchers ----------

export async function fetchProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch(PROJECT_QUERY);
}

export async function fetchServices(): Promise<SanityService[]> {
  return sanityClient.fetch(SERVICE_QUERY);
}

export async function fetchCertifications(): Promise<SanityCertification[]> {
  return sanityClient.fetch(CERTIFICATION_QUERY);
}

export async function fetchTestimonials(): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(TESTIMONIAL_QUERY);
}
