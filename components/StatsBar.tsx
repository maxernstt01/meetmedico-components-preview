'use client';

import Link from 'next/link';
// Deep-imported straight at each component's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
import { Chip } from 'design-system/src/components/Chip/Chip';
import { Label } from 'design-system/src/components/Label/Label';
import { Typography } from 'design-system/src/components/Typography/Typography';
import type { LabelVariant } from 'design-system/src/components/Label/Label.types';
import type { GlobalStats } from '@/lib/stats';

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <Chip>
      <Typography as="span" variant="label" weight="bold">
        {value}
      </Typography>{' '}
      <Typography as="span" variant="label" color="var(--neutral-600)">
        {label}
      </Typography>
    </Chip>
  );
}

// 10 distinct colors, one per rank - added 'primary'/'primaryDark'/
// 'secondaryDark'/'successDark'/'errorDark' to Label's own variant list in
// MeetMedicoComponent (it only had 5 before) since this needed 10 real,
// distinct color-token-backed variants, not just repeating the same 5.
const RANK_VARIANTS: LabelVariant[] = [
  'primary',
  'info',
  'success',
  'warning',
  'error',
  'primaryDark',
  'secondaryDark',
  'successDark',
  'errorDark',
  'neutral',
];

function rankVariant(index: number): LabelVariant {
  return RANK_VARIANTS[index % RANK_VARIANTS.length];
}

export function StatsBar({ stats }: { stats: GlobalStats }) {
  return (
    <div className="statsbar">
      <div className="stats-row">
        <StatChip label="Total Components" value={stats.totalComponents} />
        <StatChip label="Documented" value={stats.documented} />
        <StatChip label="Used" value={stats.used} />
        <StatChip label="Unused" value={stats.unused} />
        <StatChip label="Total Icons" value={stats.totalIcons} />
        <StatChip label="Hardcoded" value={stats.hardcodedTotal} />
      </div>

      <div className="top-used__card">
        <Typography as="h3" variant="label" weight="bold" color="var(--neutral-600)" style={{ display: 'block', marginBottom: 8 }}>
          Top {stats.topUsed.length} most-used components
        </Typography>
        <div className="top-used__labels">
          {stats.topUsed.map((c, i) => (
            <Link key={c.slug} href={`/components/${c.slug}`} className="top-used__labelLink">
              <Label variant={rankVariant(i)}>
                {c.name} · {c.count}
              </Label>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
