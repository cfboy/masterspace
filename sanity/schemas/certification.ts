import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Certificación',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Español', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    orderRankField({ type: 'certification' }),
    defineField({
      name: 'key',
      title: 'Clave',
      type: 'string',
      description: 'Identificador único (ej: "inimitez", "osha")',
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
    defineField({
      name: 'accent',
      title: 'Color de Acento',
      type: 'string',
      description: 'Clase de gradiente Tailwind',
      options: {
        list: [
          { title: 'Dorado', value: 'from-ms-gold/10 to-transparent' },
          { title: 'Perla', value: 'from-ms-pearl/5 to-transparent' },
          { title: 'Dorado suave', value: 'from-ms-gold/8 to-transparent' },
        ],
      },
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
      name: 'institution_es',
      title: 'Institución',
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
      name: 'institution_en',
      title: 'Institution',
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
  ],
  preview: {
    select: { title: 'title_es', subtitle: 'institution_es' },
  },
});
