import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fieldsets: [
    { name: 'es', title: 'Español', options: { collapsible: true, collapsed: false } },
    { name: 'en', title: 'English', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // --- Español ---
    defineField({
      name: 'project_es',
      title: 'Proyecto',
      type: 'string',
      fieldset: 'es',
      description: 'Ej: "Remodelación Residencial — Guaynabo"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote_es',
      title: 'Testimonio',
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
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'project_es' },
  },
});
