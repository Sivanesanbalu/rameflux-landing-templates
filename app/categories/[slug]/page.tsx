import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DesignList } from '@/components/catalog';
import { Icon } from '@/components/icon';
import { categories, designs, designCount } from '@/lib/catalog';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find(item => item.slug === slug);
  return { title: category?.title ?? 'Category' };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find(item => item.slug === slug);
  if (!category) notFound();
  const items = designs.filter(design => design.category === slug);

  return (
    <>
      <Link className="text-link breadcrumb" href="/categories/">← All categories</Link>
      <header className="page-head">
        <span className={'tile-icon tone-' + category.tone}><Icon name={category.icon} size={23} /></span>
        <h1>{category.title}</h1>
        <p>{category.summary} · {designCount(items.length)}</p>
      </header>
      <DesignList items={items} empty="Designs will appear here when they’re added to this category." />
    </>
  );
}
