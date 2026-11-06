import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-head">
      <p className="kicker">404</p>
      <h1>Page unavailable</h1>
      <p>Find your way back to the FrameFlux library.</p>
      <Link className="button button-primary after-section" href="/">Explore FrameFlux</Link>
    </section>
  );
}
