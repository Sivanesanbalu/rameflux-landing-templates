import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';

export const metadata: Metadata = { title: 'Membership' };

export default function MembershipPage() {
  return (
    <>
      <header className="page-head">
        <span className="tile-icon tone-sand"><Icon name="crown" size={23} /></span>
        <h1>Membership</h1>
        <p>Explore the library for free. Plus membership is in development.</p>
      </header>
      <div className="plan-grid">
        <article className="plan">
          <div className="plan-heading"><h2>Free</h2><span className="tag tag-green">Available</span></div>
          <p className="price">₹0 <small>/ public access</small></p>
          <p>Public access to the FrameFlux library.</p>
          <ul className="plan-features">
            <li><Icon name="check" size={17} /> Browse the design categories</li>
            <li><Icon name="check" size={17} /> Discover featured picks as they’re published</li>
          </ul>
          <Link className="button button-primary" href="/">Explore FrameFlux <Icon name="arrow" size={17} /></Link>
        </article>
        <article className="plan plan-plus">
          <div className="plan-heading"><h2>Plus</h2><span className="tag tag-violet">Planned</span></div>
          <p className="plan-status">In development</p>
          <p>Membership details and pricing will be shared when Plus is ready.</p>
          <Link className="text-link after-section" href="/billing/">View billing status <Icon name="arrow" size={16} /></Link>
        </article>
      </div>
    </>
  );
}
