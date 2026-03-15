import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Spanish', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    orderRankField({ type: 'testimonial' }),
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // --- Spanish ---
    defineField({
      name: 'project_es',
      title: 'Project',
      type: 'string',
      fieldset: 'es',
      description: 'E.g. "Residential Remodel — Guaynabo"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote_es',
      title: 'Testimonial',
      type: 'text',
      fieldset: 'es',
      validation: (rule) => rule.required(),
    }),

    // --- English ---
    defineField({
      name: 'project_en',
      title: 'Project',
      type: 'string',
      fieldset: 'en',
      description: 'E.g. "Residential Remodel — Guaynabo"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote_en',
      title: 'Testimonial',
      type: 'text',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'project_es' },
  },
});
