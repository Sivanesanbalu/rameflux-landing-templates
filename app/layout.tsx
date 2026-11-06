import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteShell } from '@/components/site-shell';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'FrameFlux — Design Library', template: '%s | FrameFlux' },
  description: 'A design library for websites, apps, sections, and creative concepts.',
  icons: { icon: '/mark.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
