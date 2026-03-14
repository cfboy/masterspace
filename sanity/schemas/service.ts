import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Servicio',
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
      description: 'Identificador único (ej: "residential")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'iconPicker',
      options: {
        providers: ['lu'],
        outputFormat: 'react',
      },
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
      name: 'description_es',
      title: 'Descripción',
      type: 'text',
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
      name: 'description_en',
      title: 'Description',
      type: 'text',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),

    // --- Media ---
    defineField({
      name: 'media',
      title: 'Galería de Medios',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Imagen',
          options: { hotspot: true, accept: 'image/*' },
        },
        {
          type: 'file',
          title: 'Video',
          options: { accept: 'video/mp4,video/quicktime,video/webm' },
          fields: [
            defineField({
              name: 'alt',
              title: 'Descripción',
              type: 'string',
            }),
          ],
        },
      ],
      options: {
        sortable: true,
      },
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
    select: { title: 'title_es', subtitle: 'key' },
  },
});
