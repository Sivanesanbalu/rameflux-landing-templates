'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Icon } from '@/components/icon';

export type SearchEntry = { label: string; href: string; group: string };

export function Search({ entries }: { entries: SearchEntry[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const matches = entries.filter(({ label, group }) => (label + ' ' + group).toLowerCase().includes(term));

  function open() {
    setQuery('');
    dialog.current?.showModal();
  }

  return (
    <>
      <button className="search-trigger" type="button" aria-label="Search library" onClick={open}>
        <Icon name="search" size={18} /> <span>Search library</span>
      </button>
      <dialog className="search-dialog" ref={dialog} aria-labelledby="search-title">
        <div className="search-head">
          <h2 id="search-title">Search library</h2>
          <button type="button" className="icon-button" aria-label="Close search" onClick={() => dialog.current?.close()}>
            <Icon name="close" />
          </button>
        </div>
        <label className="search-input">
          <Icon name="search" />
          <input autoFocus type="search" aria-label="Search categories and designs"
            placeholder="Try “landing pages”" value={query} onChange={event => setQuery(event.target.value)} />
        </label>
        {matches.length ? (
          <ul className="search-results">
            {matches.map(entry => (
              <li key={entry.href}>
                <Link href={entry.href} onClick={() => dialog.current?.close()}>
                  <strong>{entry.label}</strong><span>{entry.group}</span><Icon name="arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className="search-empty" role="status">No results for “{query}”.</p>}
      </dialog>
    </>
  );
}
