'use client';

// Same reasoning as every previews/*.tsx file: deep-import straight at each
// component's own file (never through design-system's barrel) to avoid
// dragging every other component - including ones lacking 'use client' -
// into Next's server compile graph.
import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Search } from 'design-system/src/components/Search/Search';
import { Navigation } from 'design-system/src/components/Navigation/Navigation';
import { Chip } from 'design-system/src/components/Chip/Chip';
import { Typography } from 'design-system/src/components/Typography/Typography';
import type { NavigationItem } from 'design-system/src/components/Navigation/Navigation.types';
import { COMPONENTS } from '@/lib/registry';

const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export function Sidebar() {
  const [query, setQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Real data, not a hardcoded A-Z list of "which letters exist" - computed
  // from the actual 44 component names, so it stays correct if components
  // are added/renamed.
  const lettersWithComponents = useMemo(
    () => new Set(COMPONENTS.map((c) => c.name[0]?.toUpperCase())),
    []
  );

  const filtered = COMPONENTS.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
    const matchesLetter = !activeLetter || c.name.toUpperCase().startsWith(activeLetter);
    return matchesQuery && matchesLetter;
  });

  const items: NavigationItem[] = filtered.map((c) => ({
    key: c.slug,
    label: c.name,
    disabled: !c.wired,
  }));

  const activeKey = pathname.startsWith('/components/') ? pathname.replace('/components/', '') : undefined;

  return (
    <>
      <button
        type="button"
        className="sidebar__toggle"
        aria-label={isOpen ? 'Close components menu' : 'Open components menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sidebar__toggleBar" />
        <span className="sidebar__toggleBar" />
        <span className="sidebar__toggleBar" />
      </button>

      {isOpen && <div className="sidebar__overlay" onClick={() => setIsOpen(false)} />}

      <nav className={`sidebar${isOpen ? ' sidebar--open' : ''}`} aria-label="Components menu">
        <Search placeholder="Search components..." value={query} onChange={setQuery} onClear={() => setQuery('')} />

        <div>
          <Typography as="span" variant="caption" color="var(--neutral-500)">
            {filtered.length} of {COMPONENTS.length}
          </Typography>
          <div className="alphabet-strip">
            {ALPHABET.map((letter) => {
              const hasComponents = lettersWithComponents.has(letter);
              return (
                <Chip
                  key={letter}
                  selected={activeLetter === letter}
                  disabled={!hasComponents}
                  onClick={
                    hasComponents ? () => setActiveLetter((prev) => (prev === letter ? null : letter)) : undefined
                  }
                  className="alphabet-strip__chip"
                >
                  {letter}
                </Chip>
              );
            })}
          </div>
        </div>

        <div className="sidebar__nav">
          <Navigation
            mode="vertical"
            items={items}
            activeKey={activeKey}
            onSelect={(key) => {
              setIsOpen(false);
              // All components now live on one scrollable page - navigate
              // there and jump straight to that component's anchor (#slug),
              // whether we're already on /components or coming from elsewhere.
              router.push(`/components#${key}`);
            }}
          />
        </div>
      </nav>
    </>
  );
}
