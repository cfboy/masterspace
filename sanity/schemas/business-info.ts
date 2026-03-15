import { defineField, defineType } from 'sanity';

export const businessInfo = defineType({
  name: 'businessInfo',
  title: 'Business Info',
  type: 'document',
  fieldsets: [
    { name: 'contact', title: 'Contact', options: { collapsible: true, collapsed: false } },
    { name: 'social', title: 'Social Media', options: { collapsible: true, collapsed: true } },
    { name: 'founder', title: 'Founder', options: { collapsible: true, collapsed: true } },
    { name: 'stats', title: 'Stats', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- Contact ---
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'E.g. (787) 546-7168',
      fieldset: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'contact',
      validation: (rule) => rule.required(),
    }),

    // --- Social Media ---
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      fieldset: 'social',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      fieldset: 'social',
    }),

    // --- Founder ---
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      fieldset: 'founder',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'founderRole_es',
      title: 'Role (Spanish)',
      type: 'string',
      fieldset: 'founder',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'founderRole_en',
      title: 'Role (English)',
      type: 'string',
      fieldset: 'founder',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Photo',
      type: 'image',
      fieldset: 'founder',
      options: { hotspot: true },
    }),

    // --- Stats ---
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      fieldset: 'stats',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed',
      type: 'number',
      fieldset: 'stats',
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Business Info' }),
  },
});
