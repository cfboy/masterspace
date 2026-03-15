import { HomeIcon, CogIcon, StarIcon, UsersIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('MasterSpace CMS')
    .items([
      S.listItem()
        .title('Proyectos')
        .icon(HomeIcon)
        .child(S.documentTypeList('project').title('Proyectos')),

      S.listItem()
        .title('Servicios')
        .icon(CogIcon)
        .child(S.documentTypeList('service').title('Servicios')),

      S.listItem()
        .title('Certificaciones')
        .icon(StarIcon)
        .child(
          S.documentTypeList('certification').title('Certificaciones'),
        ),

      S.divider(),

      S.listItem()
        .title('Testimonios')
        .icon(UsersIcon)
        .child(S.documentTypeList('testimonial').title('Testimonios')),
    ]);
