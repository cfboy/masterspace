import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-03-14',
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

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
  title_es: string;
  title_en: string;
  location_es: string;
  location_en: string;
  cover: SanityImageSource;
  album: SanityMediaItem[];
}

export interface SanityService {
  _id: string;
  key: string;
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
  name: string;
  project_es: string;
  project_en: string;
  quote_es: string;
  quote_en: string;
}

export interface SanityBusinessInfo {
  phone: string;
  email: string;
  location: string;
  instagram?: string;
  facebook?: string;
  founderName: string;
  founderRole_es: string;
  founderRole_en: string;
  founderImage?: SanityImageSource;
  yearsExperience: number;
  projectsCompleted: number;
}

// ---------- Defaults (fallback when CMS is empty) ----------

export const DEFAULT_BUSINESS_INFO: SanityBusinessInfo = {
  phone: '(787) 546-7168',
  email: 'masterspacellc@gmail.com',
  location: 'Puerto Rico',
  instagram: 'https://www.instagram.com/masterspacellc/',
  facebook: 'https://www.facebook.com/masterspacellc/',
  founderName: 'Benjamin Negrón',
  founderRole_es: 'Fundador & Director',
  founderRole_en: 'Founder & Director',
  yearsExperience: 10,
  projectsCompleted: 200,
};

// ---------- Queries ----------

const PROJECT_QUERY = `*[_type == "project"] | order(orderRank asc) {
  _id, key,
  title_es, title_en,
  location_es, location_en,
  cover,
  album[] {
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

const SERVICE_QUERY = `*[_type == "service"] | order(orderRank asc) {
  _id, key, icon,
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

const CERTIFICATION_QUERY = `*[_type == "certification"] | order(orderRank asc) {
  _id, key, icon, accent,
  title_es, title_en,
  institution_es, institution_en,
  description_es, description_en
}`;

const TESTIMONIAL_QUERY = `*[_type == "testimonial"] | order(orderRank asc) {
  _id, name,
  project_es, project_en,
  quote_es, quote_en
}`;

const BUSINESS_INFO_QUERY = `*[_type == "businessInfo" && _id == "businessInfo"][0] {
  phone, email, location,
  instagram, facebook,
  founderName, founderRole_es, founderRole_en, founderImage,
  yearsExperience, projectsCompleted,
  "certificationsCount": count(*[_type == "certification"])
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

export async function fetchBusinessInfo(): Promise<SanityBusinessInfo> {
  const result = await sanityClient.fetch<SanityBusinessInfo | null>(BUSINESS_INFO_QUERY);
  return result ?? DEFAULT_BUSINESS_INFO;
}
