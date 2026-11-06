import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/icon';
import { NavItem } from '@/components/nav-item';
import { Search } from '@/components/search';
import { categories, categoryUrl, designs } from '@/lib/catalog';

const discover = [
  { href: '/', label: 'Explore', icon: 'compass' },
  { href: '/hot/', label: 'Hot', icon: 'flame' },
  { href: '/categories/', label: 'Categories', icon: 'grid' },
] as const;

const account = [
  { href: '/membership/', label: 'Membership', icon: 'crown' },
  { href: '/billing/', label: 'Billing', icon: 'card' },
] as const;

const searchEntries = [
  ...categories.map(category => ({ label: category.title, href: categoryUrl(category.slug), group: 'Category' })),
  ...designs.map(design => ({ label: design.title, href: design.href, group: 'Design' })),
  ...account.map(item => ({ label: item.label, href: item.href, group: 'FrameFlux' })),
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <div className="masthead-inner">
          <Link className="brand" href="/" aria-label="FrameFlux home">
            <img src="/mark.svg" alt="" width="32" height="32" />FrameFlux<span>.</span>
          </Link>
          <Search entries={searchEntries} />
          <Link className="button button-dark header-member" href="/membership/"><Icon name="crown" size={16} /> Membership</Link>
        </div>
      </header>
      <div className="app-shell">
        <aside className="rail">
          <nav aria-label="Library navigation">
            <div className="rail-section">
              <p className="rail-label">DISCOVER</p>
              {discover.map(item => <NavItem key={item.href} {...item} />)}
            </div>
            <div className="rail-section">
              <p className="rail-label">DESIGN TYPES</p>
              {categories.map(category => <NavItem key={category.slug} href={categoryUrl(category.slug)} label={category.title} icon={category.icon} />)}
            </div>
            <div className="rail-section">
              <p className="rail-label">MEMBERSHIP</p>
              {account.map(item => <NavItem key={item.href} {...item} />)}
            </div>
          </nav>
        </aside>
        <div className="content-column">
          <main className="main" id="main">{children}</main>
          <footer className="footer"><span>FrameFlux Design Library</span><a href="https://github.com/Sivanesanbalu/rameflux-landing-templates">GitHub <Icon name="diagonal" size={13} /></a></footer>
        </div>
      </div>
    </>
  );
}
