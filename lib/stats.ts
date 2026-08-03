import { REAL_COMPONENTS } from './registry';
import { cardsForPlatform, type CardMeta } from './cardsRegistry';
import { getUsageCount } from './introspection/getUsageCount';
import { getIconCount } from './introspection/getIconCount';
import { getHardcodedValues } from './introspection/getHardcodedValues';

export interface UsageRanking {
  name: string;
  slug: string;
  count: number;
}

export interface GlobalStats {
  totalComponents: number;
  documented: number;
  used: number;
  unused: number;
  totalIcons: number;
  hardcodedTotal: number;
  topUsed: UsageRanking[];
}

/** Computed once per request from real sources - no invented numbers. */
export function getGlobalStats(): GlobalStats {
  // Usage is measured per REAL component (e.g. "Spinner"), not per page name
  // ("Loader") - <Loader> is never actually rendered anywhere, so searching
  // for that literal tag would always report zero uses regardless of how
  // much Spinner/DotsLoader/Skeleton are really used.
  const usageByComponent: UsageRanking[] = REAL_COMPONENTS.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: getUsageCount(c.name).count,
  }));

  const used = usageByComponent.filter((c) => c.count > 0).length;
  const unused = usageByComponent.filter((c) => c.count === 0).length;
  const topUsed = [...usageByComponent].sort((a, b) => b.count - a.count).slice(0, 10);
  const documented = REAL_COMPONENTS.filter((c) => c.wired).length;

  return {
    totalComponents: REAL_COMPONENTS.length,
    documented,
    used,
    unused,
    totalIcons: getIconCount().total,
    hardcodedTotal: getHardcodedValues().total,
    topUsed,
  };
}

export interface CardsStats {
  totalCards: number;
  documented: number;
  used: number;
  unused: number;
  topUsed: UsageRanking[];
}

// Same shape/intent as getGlobalStats, scoped to one Cards tab (Web/Apps).
// "Total Icons"/"Hardcoded" are library-wide numbers, not per-card, so they're
// deliberately left out here - repeating them under Web/Apps would look like
// a card-specific count when it's really the same global number already
// shown on the Components tab. Every card is "documented" by definition
// (cardsRegistry only lists cards that have a real .tsx/.module.css/.types.ts
// built) - there's no unwired/pending state like COMPONENT_NAMES has.
export function getCardsStats(platform: CardMeta['platform']): CardsStats {
  const cards = cardsForPlatform(platform);
  const usageByCard: UsageRanking[] = cards.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: getUsageCount(c.name).count,
  }));

  const used = usageByCard.filter((c) => c.count > 0).length;
  const unused = usageByCard.filter((c) => c.count === 0).length;
  const topUsed = [...usageByCard].sort((a, b) => b.count - a.count).slice(0, 10);

  return {
    totalCards: cards.length,
    documented: cards.length,
    used,
    unused,
    topUsed,
  };
}
