export const NAV_LINKS = [
  { key: 'nav.home', href: '#inicio' },
  { key: 'nav.services', href: '#servicios' },
  { key: 'nav.about', href: '#nosotros' },
  { key: 'nav.portfolio', href: '#portafolio' },
  { key: 'nav.certifications', href: '#certificaciones' },
  { key: 'nav.testimonials', href: '#testimonios' },
  { key: 'nav.contact', href: '#contacto' },
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/masterspacellc/',
  facebook: 'https://www.facebook.com/masterspacellc/',
} as const;

export const CONTACT_INFO = {
  phone: '(787) 546-7168',
  phoneHref: 'tel:+17875467168',
  email: 'masterspacellc@gmail.com',
  emailHref: 'mailto:masterspacellc@gmail.com',
  location: 'Puerto Rico',
} as const;
