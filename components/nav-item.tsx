'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from '@/components/icon';

export function NavItem({ href, label, icon }: { href: string; label: string; icon: IconName }) {
  const pathname = usePathname();
  const current = pathname?.replace(/\/$/, '') === href.replace(/\/$/, '');

  return (
    <Link className={'rail-link' + (icon === 'flame' ? ' rail-hot' : '')}
      href={href} aria-current={current ? 'page' : undefined}>
      <Icon name={icon} size={18} /><span>{label}</span>
    </Link>
  );
}
