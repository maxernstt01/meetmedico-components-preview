import { REAL_COMPONENTS } from './registry';
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
