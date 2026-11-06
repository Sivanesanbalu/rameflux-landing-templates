import type { Metadata } from 'next';
import Link from 'next/link';
import { EmptyState } from '@/components/catalog';
import { Icon } from '@/components/icon';

export const metadata: Metadata = { title: 'Billing' };

export default function BillingPage() {
  return (
    <>
      <header className="page-head">
        <span className="tile-icon tone-green"><Icon name="card" size={23} /></span>
        <h1>Billing</h1>
        <p>The public library is free. Payments and invoices are currently inactive.</p>
      </header>
      <dl className="billing-grid">
        <div className="summary-card"><dt>Library access</dt><dd>Free</dd></div>
        <div className="summary-card"><dt>Payment method</dt><dd>None required</dd></div>
        <div className="summary-card"><dt>Upcoming charge</dt><dd>None</dd></div>
      </dl>
      <section className="page-section" aria-labelledby="invoice-title">
        <div className="section-heading"><h2 id="invoice-title">Invoices</h2></div>
        <EmptyState icon="receipt" title="No invoices" text="Invoices will be available when paid memberships are supported." />
      </section>
      <Link className="text-link after-section" href="/membership/">Back to membership <Icon name="arrow" size={16} /></Link>
    </>
  );
}
