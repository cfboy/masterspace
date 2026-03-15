#!/usr/bin/env node

/**
 * Migration script: Seeds Sanity CMS with existing MasterSpace content.
 *
 * Prerequisites:
 *   1. Create a Sanity project at https://www.sanity.io/manage
 *   2. Set environment variables:
 *      - SANITY_PROJECT_ID
 *      - SANITY_DATASET (defaults to "production")
 *      - SANITY_TOKEN (API token with write access)
 *
 * Usage:
 *   node scripts/migrate-to-sanity.mjs
 */
import { createClient } from '@sanity/client';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function randomKey() {
  return crypto.randomBytes(6).toString('hex');
}

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_TOKEN environment variables.');
  console.error('Usage: SANITY_PROJECT_ID=xxx SANITY_TOKEN=xxx node scripts/migrate-to-sanity.mjs');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-03-14',
  useCdn: false,
});

const ASSETS_DIR = path.resolve('src/assets/projects');

// ---- Helper: upload an image file to Sanity ----
async function uploadImage(filePath) {
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  console.log(`  Uploading image: ${filename}`);
  const asset = await client.assets.upload('image', stream, { filename });
  return { _type: 'image', _key: randomKey(), asset: { _type: 'reference', _ref: asset._id } };
}

// ---- Helper: upload a video file to Sanity ----
async function uploadFile(filePath) {
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  console.log(`  Uploading video: ${filename}`);
  const asset = await client.assets.upload('file', stream, { filename, contentType: 'video/mp4' });
  return { _type: 'file', _key: randomKey(), asset: { _type: 'reference', _ref: asset._id } };
}

// ============================================================
// PROJECTS
// ============================================================
const projects = [
  {
    key: 'laFresqueria',
    order: 1,
    title_es: 'La Fresquería',
    title_en: 'La Fresquería',
    location_es: 'Mayagüez, PR',
    location_en: 'Mayagüez, PR',
    folder: 'la-fresqueria',
    images: [
      'la-fresqueria-01.jpeg',
      'la-fresqueria-02.jpeg',
      'la-fresqueria-03.jpeg',
      'la-fresqueria-04.jpeg',
      'la-fresqueria-05.jpeg',
      'la-fresqueria-06.jpeg',
      'la-fresqueria-07.jpeg',
    ],
    coverIndex: 0,
  },
  {
    key: 'vibra',
    order: 2,
    title_es: 'Vibra The Rooftop',
    title_en: 'Vibra The Rooftop',
    location_es: 'Mayagüez, PR',
    location_en: 'Mayagüez, PR',
    folder: 'vibra',
    images: ['vibra-01.jpeg', 'vibra-project.jpeg'],
    coverIndex: 0,
  },
  {
    key: 'tresMonos',
    order: 3,
    title_es: 'Tres Monos',
    title_en: 'Tres Monos',
    location_es: 'Puerto Rico',
    location_en: 'Puerto Rico',
    folder: 'tres-monos',
    images: [
      'tres-monos-01.jpeg',
      'tres-monos-02.jpeg',
      'tres-monos-03.jpeg',
      'tres-monos-04.jpeg',
      'tres-monos-05.jpeg',
      'tres-monos-06.jpeg',
      'tres-monos-07.jpeg',
      'tres-monos-08.jpeg',
      'tres-monos-09.jpeg',
    ],
    coverIndex: 0,
  },
  {
    key: 'glossStudio',
    order: 4,
    title_es: 'Gloss Studio',
    title_en: 'Gloss Studio',
    location_es: 'Puerto Rico',
    location_en: 'Puerto Rico',
    folder: 'gloss-studio',
    images: [
      'gloss-studio-01.jpeg',
      'gloss-studio-02.jpeg',
      'gloss-studio-03.jpeg',
      'gloss-studio-04.jpeg',
      'gloss-studio-05.jpeg',
      'gloss-studio-06.jpeg',
      'gloss-studio-07.jpeg',
      'gloss-studio-08.jpeg',
      'gloss-studio-09.jpeg',
      'gloss-studio-10.jpeg',
      'gloss-studio-11.jpeg',
      'gloss-studio-12.jpeg',
      'gloss-studio-13.jpeg',
      'gloss-studio-14.jpeg',
    ],
    coverIndex: 4, // gloss-studio-05 was the cover
  },
];

// ============================================================
// SERVICES
// ============================================================
const services = [
  {
    key: 'residential',
    order: 1,
    icon: { provider: 'lu', name: 'LuHome' },
    title_es: 'Remodelación Residencial',
    title_en: 'Residential Remodeling',
    description_es:
      'Demolición, hormigón, plomería, electricidad, cocinas y baños. Transformamos espacios residenciales con acabados de primera calidad.',
    description_en:
      'Demolition, concrete, plumbing, electrical, kitchens and bathrooms. We transform residential spaces with premium finishes.',
    folder: 'residential',
    media: [
      { file: 'residential-01.jpeg', type: 'image' },
      { file: 'residential-02.jpeg', type: 'image' },
      { file: 'residential-03.jpeg', type: 'image' },
      { file: 'residential-04.jpeg', type: 'image' },
      { file: 'residential-05.jpeg', type: 'image' },
      { file: 'residential-06.jpeg', type: 'image' },
      { file: 'residential-07.jpeg', type: 'image' },
      { file: 'residential-08.jpeg', type: 'image' },
      { file: 'residential-09.jpeg', type: 'image' },
    ],
  },
  {
    key: 'commercial',
    order: 2,
    icon: { provider: 'lu', name: 'LuBuilding2' },
    title_es: 'Remodelación Comercial',
    title_en: 'Commercial Remodeling',
    description_es:
      'Restaurantes, rooftops, oficinas y proyectos gubernamentales. Soluciones comerciales que elevan tu marca.',
    description_en:
      'Restaurants, rooftops, offices and government projects. Commercial solutions that elevate your brand.',
    media: [
      { folder: 'la-fresqueria', file: 'la-fresqueria-03.jpeg', type: 'image' },
      { folder: 'tres-monos', file: 'tres-monos-01.jpeg', type: 'image' },
      { folder: 'vibra', file: 'vibra-01.jpeg', type: 'image' },
    ],
  },
  {
    key: 'finishes',
    order: 3,
    icon: { provider: 'lu', name: 'LuLayers' },
    title_es: 'Acabados Arquitectónicos',
    title_en: 'Architectural Finishes',
    description_es:
      'Microcemento, estuco veneciano y recubrimientos especiales. Técnicas europeas de acabado para superficies únicas.',
    description_en:
      'Microcement, Venetian plaster and specialty coatings. European finishing techniques for unique surfaces.',
    folder: 'textures',
    media: [
      { file: 'textures-01.jpeg', type: 'image' },
      { file: 'textures-02.jpeg', type: 'image' },
      { file: 'textures-03.jpeg', type: 'image' },
      { file: 'textures-04.jpeg', type: 'image' },
      { file: 'textures-05.jpeg', type: 'image' },
      { file: 'textures-06.jpeg', type: 'image' },
    ],
  },
  {
    key: 'coatings',
    order: 4,
    icon: { provider: 'lu', name: 'LuPaintRoller' },
    title_es: 'Revestimientos Especiales',
    title_en: 'Specialty Coatings',
    description_es:
      'Paredes de roca y ladrillo con certificación Inimitez, texturas personalizadas y sistemas decorativos europeos.',
    description_en:
      'Rock and brick walls with Inimitez certification, custom textures and European decorative systems.',
    folder: 'specialty-coatings',
    media: [
      { file: 'specialty-coatings-01.jpeg', type: 'image' },
      { file: 'specialty-coatings-02.jpeg', type: 'image' },
      { file: 'specialty-coatings-01.mp4', type: 'video' },
      { file: 'specialty-coatings-02.mp4', type: 'video' },
    ],
  },
  {
    key: 'public',
    order: 5,
    icon: { provider: 'lu', name: 'LuLandmark' },
    title_es: 'Proyectos Públicos',
    title_en: 'Public Projects',
    description_es:
      'Cielos rasos acústicos, especificaciones gubernamentales y presupuestos por fases para proyectos de gran escala.',
    description_en:
      'Acoustic ceilings, government specifications and phased budgeting for large-scale projects.',
    folder: 'public-sector',
    media: [
      { file: 'public-sector-01.jpeg', type: 'image' },
      { file: 'public-sector-02.jpeg', type: 'image' },
      { file: 'public-sector-03.jpeg', type: 'image' },
      { file: 'public-sector-04.jpeg', type: 'image' },
    ],
  },
];

// ============================================================
// CERTIFICATIONS
// ============================================================
const certifications = [
  {
    key: 'inimitez',
    order: 1,
    icon: { provider: 'lu', name: 'LuSparkles' },
    accent: 'from-ms-gold/10 to-transparent',
    title_es: 'Inimitez Academy',
    title_en: 'Inimitez Academy',
    institution_es: 'España',
    institution_en: 'Spain',
    description_es:
      'Especialización en roca y ladrillo decorativo, sistemas decorativos europeos con técnicas avanzadas de aplicación.',
    description_en:
      'Specialization in decorative rock and brick, European decorative systems with advanced application techniques.',
  },
  {
    key: 'ambience',
    order: 2,
    icon: { provider: 'lu', name: 'LuPaintRoller' },
    accent: 'from-ms-pearl/5 to-transparent',
    title_es: 'Ambience Architectural Coatings',
    title_en: 'Ambience Architectural Coatings',
    institution_es: 'Recubrimientos Profesionales',
    institution_en: 'Professional Coatings',
    description_es:
      'Acabados profesionales, superficies continuas, primers y selladores. Certificación en sistemas de recubrimiento arquitectónico.',
    description_en:
      'Professional finishes, continuous surfaces, primers and sealers. Certified in architectural coating systems.',
  },
  {
    key: 'osha',
    order: 3,
    icon: { provider: 'lu', name: 'LuHardHat' },
    accent: 'from-ms-gold/8 to-transparent',
    title_es: 'OSHA 30 Horas',
    title_en: 'OSHA 30-Hour',
    institution_es: 'Seguridad en Construcción',
    institution_en: 'Construction Safety',
    description_es:
      'Estándares federales de seguridad, preparación para proyectos gubernamentales y cumplimiento normativo integral.',
    description_en:
      'Federal safety standards, government project readiness and comprehensive regulatory compliance.',
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
const testimonials = [
  {
    order: 1,
    name: 'María García',
    project_es: 'Remodelación Residencial — Guaynabo',
    project_en: 'Residential Remodel — Guaynabo',
    quote_es:
      'MasterSpace transformó completamente nuestra casa. El nivel de detalle y la calidad de los acabados superó todas nuestras expectativas.',
    quote_en:
      'MasterSpace completely transformed our home. The level of detail and quality of finishes exceeded all our expectations.',
  },
  {
    order: 2,
    name: 'Carlos Rivera',
    project_es: 'Restaurante — San Juan',
    project_en: 'Restaurant — San Juan',
    quote_es:
      'Profesionales de primera. El trabajo de estuco veneciano que realizaron en nuestro restaurante le dio un look completamente premium.',
    quote_en:
      'Top-notch professionals. The Venetian plaster work they did in our restaurant gave it a completely premium look.',
  },
  {
    order: 3,
    name: 'Ana Martínez',
    project_es: 'Revestimiento Comercial — Condado',
    project_en: 'Commercial Coating — Condado',
    quote_es:
      'Su conocimiento en técnicas europeas de acabados es impresionante. Entregaron a tiempo y con una calidad excepcional.',
    quote_en:
      'Their knowledge of European finishing techniques is impressive. They delivered on time and with exceptional quality.',
  },
];

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('Starting MasterSpace → Sanity migration...\n');

  // --- Migrate Projects ---
  console.log('=== PROJECTS ===');
  for (const proj of projects) {
    console.log(`\nProject: ${proj.key}`);
    const folder = path.join(ASSETS_DIR, proj.folder);

    // Upload album images
    const albumRefs = [];
    for (const img of proj.images) {
      const ref = await uploadImage(path.join(folder, img));
      albumRefs.push(ref);
    }

    const doc = {
      _type: 'project',
      _id: `project-${proj.key}`,
      key: proj.key,
      order: proj.order,
      title_es: proj.title_es,
      title_en: proj.title_en,
      location_es: proj.location_es,
      location_en: proj.location_en,
      cover: albumRefs[proj.coverIndex],
      album: albumRefs,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Created project: ${proj.key}`);
  }

  // --- Migrate Services ---
  console.log('\n=== SERVICES ===');
  for (const svc of services) {
    console.log(`\nService: ${svc.key}`);

    const mediaRefs = [];
    for (const m of svc.media) {
      const folder = m.folder ? path.join(ASSETS_DIR, m.folder) : path.join(ASSETS_DIR, svc.folder);
      const filePath = path.join(folder, m.file);
      if (m.type === 'video') {
        mediaRefs.push(await uploadFile(filePath));
      } else {
        mediaRefs.push(await uploadImage(filePath));
      }
    }

    const doc = {
      _type: 'service',
      _id: `service-${svc.key}`,
      key: svc.key,
      order: svc.order,
      icon: svc.icon,
      title_es: svc.title_es,
      title_en: svc.title_en,
      description_es: svc.description_es,
      description_en: svc.description_en,
      media: mediaRefs,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Created service: ${svc.key}`);
  }

  // --- Migrate Certifications ---
  console.log('\n=== CERTIFICATIONS ===');
  for (const cert of certifications) {
    const doc = {
      _type: 'certification',
      _id: `certification-${cert.key}`,
      ...cert,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Created certification: ${cert.key}`);
  }

  // --- Migrate Testimonials ---
  console.log('\n=== TESTIMONIALS ===');
  for (const test of testimonials) {
    const doc = {
      _type: 'testimonial',
      _id: `testimonial-${test.order}`,
      ...test,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Created testimonial: ${test.name}`);
  }

  console.log('\n✅ Migration complete!');
  console.log('Next steps:');
  console.log('  1. Verify content at https://your-project.sanity.studio');
  console.log('  2. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in your .env');
  console.log('  3. Run pnpm dev to test the site');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
