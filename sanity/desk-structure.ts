import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { HomeIcon, CogIcon, StarIcon, UsersIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';
import type { ConfigContext } from 'sanity';

export const structure = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('MasterSpace CMS')
    .items([
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Proyectos',
        icon: HomeIcon,
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
