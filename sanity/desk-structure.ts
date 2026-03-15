import { CogIcon, HomeIcon, ImagesIcon, InfoOutlineIcon, StarIcon, UsersIcon } from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { ConfigContext } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';

import StudioHome from './components/StudioHome';

export const structure = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('MasterSpace CMS')
    .items([
      S.listItem()
        .title('Home')
        .id('home')
        .icon(HomeIcon)
        .child(S.component(StudioHome).id('home').title('Home')),

      S.listItem()
        .title('Business Info')
        .id('businessInfo')
        .icon(InfoOutlineIcon)
        .child(
          S.document().schemaType('businessInfo').documentId('businessInfo').title('Business Info')
        ),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        icon: ImagesIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'service',
        title: 'Services',
        icon: CogIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'certification',
        title: 'Certifications',
        icon: StarIcon,
        S,
        context,
      }),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'Testimonials',
        icon: UsersIcon,
        S,
        context,
      }),
    ]);
