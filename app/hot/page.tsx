import type { Metadata } from 'next';
import Link from 'next/link';
import { DesignList, EmptyState } from '@/components/catalog';
import { Icon } from '@/components/icon';
import { designs } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Hot picks' };

export default function HotPage() {
  const featured = designs.filter(design => design.featured);

  return (
    <>
      <header className="page-head">
        <span className="tile-icon tone-coral"><Icon name="flame" size={23} /></span>
        <h1>Hot picks</h1>
        <p>Featured designs selected from the FrameFlux library.</p>
      </header>
      {featured.length ? <DesignList items={featured} empty="" /> :
        <EmptyState icon="flame" title="No featured designs yet" text="Look here for featured picks as the collection grows." />}
      <Link className="text-link after-section" href="/categories/">Explore categories <Icon name="arrow" size={16} /></Link>
    </>
  );
}
