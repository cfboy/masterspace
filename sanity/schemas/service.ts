import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Spanish', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    orderRankField({ type: 'service' }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Unique identifier (e.g. "residential")',
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

    // --- Spanish ---
    defineField({
      name: 'title_es',
      title: 'Title',
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
      name: 'description_en',
      title: 'Description',
      type: 'text',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),

    // --- Media ---
    defineField({
      name: 'media',
      title: 'Media Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
        },
        {
          type: 'file',
          title: 'Video',
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title_es', subtitle: 'key' },
  },
});
