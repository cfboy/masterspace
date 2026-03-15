import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Spanish', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    orderRankField({ type: 'project' }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Unique identifier (e.g. "laFresqueria")',
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
      name: 'location_es',
      title: 'Location',
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
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'album',
      title: 'Photo & Video Album',
      type: 'array',
      of: [
        { type: 'image', title: 'Image', options: { hotspot: true } },
        { type: 'file', title: 'Video' },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title_es', subtitle: 'location_es', media: 'cover' },
  },
});
