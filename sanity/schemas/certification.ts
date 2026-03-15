import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Spanish', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    orderRankField({ type: 'certification' }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Unique identifier (e.g. "inimitez", "osha")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
      options: {
        providers: ['lu'],
        outputFormat: 'react',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent Color',
      type: 'string',
      description: 'Tailwind gradient class',
      options: {
        list: [
          { title: 'Gold', value: 'from-ms-gold/10 to-transparent' },
          { title: 'Pearl', value: 'from-ms-pearl/5 to-transparent' },
          { title: 'Soft Gold', value: 'from-ms-gold/8 to-transparent' },
        ],
      },
    }),

    // --- Spanish ---
    defineField({
      name: 'title_es',
      title: 'Title',
      type: 'string',
      fieldset: 'es',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution_es',
      title: 'Institution',
      type: 'string',
      fieldset: 'es',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description_es',
      title: 'Description',
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
