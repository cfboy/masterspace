import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Español', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'key',
      title: 'Clave',
      type: 'string',
      description: 'Identificador único (ej: "laFresqueria")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required(),
    }),

    // --- Español ---
    defineField({
      name: 'title_es',
      title: 'Título',
      type: 'string',
      fieldset: 'es',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location_es',
      title: 'Ubicación',
      type: 'string',
      fieldset: 'es',
      validation: (rule) => rule.required(),
    }),

    // --- English ---
    defineField({
      name: 'title_en',
      title: 'Title',
      type: 'string',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location_en',
      title: 'Location',
      type: 'string',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),

    // --- Media ---
    defineField({
      name: 'cover',
      title: 'Imagen de Portada',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'album',
      title: 'Álbum de Fotos y Videos',
      type: 'array',
      of: [
        { type: 'image', title: 'Imagen', options: { hotspot: true } },
        { type: 'file', title: 'Video' },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title_es', subtitle: 'location_es', media: 'cover' },
  },
});
