'use client';

// Same reasoning as every previews/*.tsx file: MeetMedicoComponent has no
// "use client" directives anywhere, and its barrel re-exports all 44
// components together, so importing through the package root here would
// drag every other component (including ones lacking 'use client') into
// Next's server compile graph. Deep-importing straight at Navigation's own
// file avoids that - this is the real design-system Navigation component,
// not a hand-rolled header.
import { useRouter } from 'next/navigation';
import { Navigation } from 'design-system/src/components/Navigation/Navigation';
import { Logo } from 'design-system/src/components/Logo/Logo';
import type { NavigationItem } from 'design-system/src/components/Navigation/Navigation.types';

const items: NavigationItem[] = [{ key: 'overview', label: 'Overview' }];

// Navigation's `href` field on NavigationItem is declared in its own types
// but never actually read by the component (checked Navigation.tsx - every
// item renders as a <button onClick={onSelect}>, no <a> anywhere). It expects
// the consumer to own real navigation via onSelect, so that's wired here with
// next/navigation's router instead of relying on href.
const ROUTES: Record<string, string> = { overview: '/overview' };

export function AppNav({ totalComponents }: { totalComponents: number }) {
  const router = useRouter();

  return (
    <Navigation
      mode="horizontal"
      items={items}
      onSelect={(key) => {
        const href = ROUTES[key];
        if (href) router.push(href);
      }}
      logo={<Logo variant="responsive" />}
      logoPosition="left"
      menuAlign="center"
      actions={<span className="app-nav__count">{totalComponents} components</span>}
    />
  );
}
