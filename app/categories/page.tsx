import type { Metadata } from 'next';
import { CategoryGrid } from '@/components/catalog';
import { Icon } from '@/components/icon';

export const metadata: Metadata = { title: 'Categories' };

export default function CategoriesPage() {
  return (
    <>
      <header className="page-head">
        <span className="tile-icon tone-blue"><Icon name="grid" size={23} /></span>
        <h1>Categories</h1>
        <p>Browse the library by the kind of design you’re looking for.</p>
      </header>
      <CategoryGrid />
    </>
  );
}
