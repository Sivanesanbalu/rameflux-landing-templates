import Link from 'next/link';
import { CategoryGrid, DesignList } from '@/components/catalog';
import { Icon } from '@/components/icon';
import { designCount, designs } from '@/lib/catalog';

export default function ExplorePage() {
  return (
    <>
      <section className="hero" aria-labelledby="intro">
        <div className="hero-copy">
          <p className="kicker"><Icon name="sparkle" size={15} /> THE DESIGN LIBRARY</p>
          <h1 id="intro">Find your next<br /><em>design direction.</em></h1>
          <p>Browse design ideas for websites, apps, and the smaller details that make them work.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/categories/">Browse categories <Icon name="arrow" size={17} /></Link>
            <Link className="button button-outline" href="/hot/"><Icon name="flame" size={17} /> Hot picks</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-top"><span>FRAMEFLUX</span><span>LIBRARY INDEX / 01</span></div>
          <svg viewBox="0 0 360 235" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29 49h302M29 111h302M29 173h302M55 25v185m61-185v185m62-185v185m62-185v185m63-185v185" stroke="#5e477f" strokeOpacity=".32" />
            <circle cx="178" cy="117" r="91" fill="#d1c4ff" />
            <path d="M90 162c44-90 101-81 170-39" stroke="#6148bb" strokeWidth="1.1" strokeDasharray="4 5" />
            <rect x="105" y="71" width="152" height="110" rx="9" transform="rotate(13 105 71)" fill="#fcf9ff" stroke="#4e368f" />
            <rect x="94" y="74" width="156" height="109" rx="8" transform="rotate(-10 94 74)" fill="#352265" />
            <path d="M175 76c0 23-14 38-38 38 24 0 38 14 38 38 0-24 15-38 38-38-23 0-38-15-38-38Z" fill="#f9deac" />
            <circle cx="175" cy="114" r="5" fill="#352265" />
            <circle cx="264" cy="57" r="14" fill="#eea983" />
            <path d="M257 57h14m-7-7v14M57 184h18m-9-9v18" stroke="#4e368f" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="art-bottom"><span>FORM STUDY</span><span>FIG. 01</span></div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="categories-title">
        <div className="section-heading">
          <div><p className="kicker">DISCOVER</p><h2 id="categories-title">Browse by category</h2></div>
          <Link className="text-link" href="/categories/">All categories <Icon name="arrow" size={16} /></Link>
        </div>
        <CategoryGrid />
      </section>

      <section className="page-section collection" id="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <div><p className="kicker">THE LIBRARY</p><h2 id="collection-title">Latest designs</h2></div>
          <span className="tag">{designCount(designs.length)}</span>
        </div>
        <DesignList items={designs} empty="New designs will appear here as they are published." />
      </section>
    </>
  );
}
