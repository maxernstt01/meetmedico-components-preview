'use client';

// Same reasoning as every previews/*.tsx file: deep-import straight at each
// component's own file (never through design-system's barrel) to avoid
// dragging every other component - including ones lacking 'use client' -
// into Next's server compile graph.
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'design-system/src/components/Search/Search';
import { Navigation } from 'design-system/src/components/Navigation/Navigation';
import { Chip } from 'design-system/src/components/Chip/Chip';
import { Tabs } from 'design-system/src/components/Tabs/Tabs';
import { Typography } from 'design-system/src/components/Typography/Typography';
import type { NavigationItem } from 'design-system/src/components/Navigation/Navigation.types';
import type { TabItem } from 'design-system/src/components/Tabs/Tabs.types';
import { COMPONENTS } from '@/lib/registry';
import { cardsForPlatform } from '@/lib/cardsRegistry';

const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const MAIN_VIEW_TABS: TabItem[] = [
  { value: 'components', label: 'Components' },
  { value: 'cards-web', label: 'Web' },
  { value: 'cards-mobile', label: 'Apps' },
];

const MAIN_VIEW_ROUTES: Record<string, string> = {
  components: '/components',
  'cards-web': '/cards/web',
  'cards-mobile': '/cards/mobile',
};

const SEARCH_PLACEHOLDERS: Record<string, string> = {
  components: 'Search components...',
  'cards-web': 'Search web cards...',
  'cards-mobile': 'Search app cards...',
};

interface ListEntry {
  slug: string;
  name: string;
  disabled?: boolean;
}

export function Sidebar() {
  const [query, setQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activeMainView = pathname.startsWith('/cards/web')
    ? 'cards-web'
    : pathname.startsWith('/cards/mobile')
      ? 'cards-mobile'
      : 'components';
  const basePath = MAIN_VIEW_ROUTES[activeMainView];

  // Clears a leftover query/letter from one tab when switching to another -
  // Sidebar stays mounted across the route change, so state would otherwise
  // carry over (e.g. a "log" search typed on Components silently filtering
  // Web down to nothing).
  useEffect(() => {
    setQuery('');
    setActiveLetter(null);
  }, [activeMainView]);

  // The searchable/filterable list backing whichever tab is active - real
  // data in all three cases: COMPONENTS for "Components", the cards
  // registry (filtered by platform) for "Web"/"Apps". Same shape (slug/name)
  // so one search + alphabet-shortener + menu block below serves all three.
  const allEntries: ListEntry[] = useMemo(() => {
    if (activeMainView === 'components') {
      return COMPONENTS.map((c) => ({ slug: c.slug, name: c.name, disabled: !c.wired }));
    }
    const platform = activeMainView === 'cards-web' ? 'web' : 'mobile';
    return cardsForPlatform(platform).map((c) => ({ slug: c.slug, name: c.name }));
  }, [activeMainView]);

  const lettersWithEntries = useMemo(
    () => new Set(allEntries.map((c) => c.name[0]?.toUpperCase())),
    [allEntries]
  );

  const filtered = allEntries.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
    const matchesLetter = !activeLetter || c.name.toUpperCase().startsWith(activeLetter);
    return matchesQuery && matchesLetter;
  });

  const items: NavigationItem[] = filtered.map((c) => ({
    key: c.slug,
    label: c.name,
    disabled: c.disabled,
  }));

  const activeKey =
    activeMainView === 'components' && pathname.startsWith('/components/')
      ? pathname.replace('/components/', '')
      : undefined;

  function handleSelect(key: string) {
    setIsOpen(false);
    // Every tab is now a single scrollable page (one section per
    // component/card) - when we're already there, scroll to the anchor
    // ourselves. Next's own hash-scroll-on-navigation isn't guaranteed to
    // respect the `scroll-behavior: smooth` CSS, so relying on it can
    // silently snap instantly depending on the Next.js version. Doing it by
    // hand with scrollIntoView guarantees the smooth animation.
    if (pathname === basePath) {
      const target = document.getElementById(key);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `${basePath}#${key}`);
        return;
      }
    }
    router.push(`${basePath}#${key}`);
  }

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
        <Tabs
          variant="segment"
          items={MAIN_VIEW_TABS}
          value={activeMainView}
          onChange={(value) => {
            setIsOpen(false);
            router.push(MAIN_VIEW_ROUTES[value]);
          }}
          className="sidebar__viewTabs"
        />

        {allEntries.length === 0 ? (
          <Typography as="span" variant="caption" color="var(--neutral-500)">
            No cards yet.
          </Typography>
        ) : (
          <>
            <Search
              placeholder={SEARCH_PLACEHOLDERS[activeMainView]}
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
            />

            <div>
              <Typography as="span" variant="caption" color="var(--neutral-500)">
                {filtered.length} of {allEntries.length}
              </Typography>
              <div className="alphabet-strip">
                {ALPHABET.map((letter) => {
                  const hasEntries = lettersWithEntries.has(letter);
                  return (
                    <Chip
                      key={letter}
                      selected={activeLetter === letter}
                      disabled={!hasEntries}
                      onClick={
                        hasEntries
                          ? () => setActiveLetter((prev) => (prev === letter ? null : letter))
                          : undefined
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
              <Navigation mode="vertical" items={items} activeKey={activeKey} onSelect={handleSelect} />
            </div>
          </>
        )}
      </nav>
    </>
  );
}
