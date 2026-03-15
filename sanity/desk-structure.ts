import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { HomeIcon, CogIcon, StarIcon, UsersIcon, ImagesIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';
import type { ConfigContext } from 'sanity';

import StudioHome from './components/StudioHome';

export const structure = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('MasterSpace CMS')
    .items([
      S.listItem()
        .title('Inicio')
        .id('home')
        .icon(HomeIcon)
        .child(
          S.component(StudioHome).id('home').title('Inicio')
        ),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Proyectos',
        icon: ImagesIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'service',
        title: 'Servicios',
        icon: CogIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'certification',
        title: 'Certificaciones',
        icon: StarIcon,
        S,
        context,
      }),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'Testimonios',
        icon: UsersIcon,
        S,
        context,
      }),
    ]);
