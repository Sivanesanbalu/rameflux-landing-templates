import Link from 'next/link';
import { Icon, type IconName } from '@/components/icon';
import { categories, categoryUrl, type Design } from '@/lib/catalog';

export function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map(category => (
        <Link className="category-card" href={categoryUrl(category.slug)} key={category.slug}>
          <span className={'tile-icon tone-' + category.tone}><Icon name={category.icon} size={21} /></span>
          <span className="category-text"><strong>{category.title}</strong><span>{category.summary}</span></span>
          <Icon name="arrow" size={17} />
        </Link>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="empty-state">
      <span className={'tile-icon ' + (icon === 'flame' ? 'tone-coral' : 'tone-violet')}><Icon name={icon} size={21} /></span>
      <div><h3>{title}</h3><p>{text}</p></div>
    </div>
  );
}

export function DesignList({ items, empty }: { items: readonly Design[]; empty: string }) {
  if (!items.length) return <EmptyState icon="layers" title="The collection is open" text={empty} />;
  return (
    <div className="category-grid">
      {items.map(item => (
        <Link className="category-card" key={item.slug} href={item.href}>
          <span className="tile-icon tone-violet"><Icon name="window" /></span>
          <span className="category-text"><strong>{item.title}</strong><span>{item.description}</span></span>
          <Icon name="diagonal" size={16} />
        </Link>
      ))}
    </div>
  );
}
