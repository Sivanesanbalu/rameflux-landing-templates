import type { IconName } from '@/components/icon';

export const categories = [
  { slug: 'landing-pages', title: 'Landing pages', summary: 'Product launches and conversion pages.', icon: 'window', tone: 'violet' },
  { slug: 'apps', title: 'Apps & dashboards', summary: 'SaaS products and workspaces.', icon: 'panels', tone: 'blue' },
  { slug: 'portfolios', title: 'Portfolios', summary: 'Personal sites and studio work.', icon: 'user', tone: 'coral' },
  { slug: 'sections', title: 'Sections & components', summary: 'Heroes, navigation, and reusable UI.', icon: 'layers', tone: 'green' },
  { slug: 'ecommerce', title: 'E-commerce', summary: 'Storefronts and product pages.', icon: 'bag', tone: 'sand' },
  { slug: 'motion', title: 'Motion concepts', summary: 'Still references for motion design.', icon: 'wave', tone: 'rose' },
] as const satisfies readonly { slug: string; title: string; summary: string; icon: IconName; tone: string }[];

type Category = (typeof categories)[number];

export type Design = {
  slug: string;
  title: string;
  description: string;
  category: Category['slug'];
  href: string;
  featured?: boolean;
};

export const designs: readonly Design[] = [];

export function categoryUrl(slug: Category['slug']) {
  return '/categories/' + slug + '/';
}

export function designCount(count: number) {
  return count + (count === 1 ? ' design' : ' designs');
}
