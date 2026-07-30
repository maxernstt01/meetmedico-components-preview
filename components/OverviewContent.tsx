'use client';

import Link from 'next/link';
import { StatsBar } from './StatsBar';
// Deep-imported straight at each component's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file:
// the barrel re-exports all 44 components together with zero "use client"
// directives anywhere, so importing through it here (a Server Component,
// app/page.tsx) would drag stateful siblings into Next's server compile
// graph and break the build.
import { Typography } from 'design-system/src/components/Typography/Typography';
import { Alert } from 'design-system/src/components/Alert/Alert';
import { Table } from 'design-system/src/components/Table/Table';
import { EmptyState } from 'design-system/src/components/EmptyState/EmptyState';
import type { TableColumn } from 'design-system/src/components/Table/Table.types';
import type { GlobalStats } from '@/lib/stats';
import type { HardcodedHit } from '@/lib/introspection/getHardcodedValues';

const hardcodedColumns: TableColumn<HardcodedHit>[] = [
  { key: 'file', title: 'File', render: (_v, h) => <code className="inline">{h.file}</code> },
  { key: 'line', title: 'Line', dataIndex: 'line', width: 70, align: 'right' },
  { key: 'snippet', title: 'Snippet', render: (_v, h) => <code className="inline">{h.snippet}</code> },
  { key: 'reason', title: 'Reason', dataIndex: 'reason' },
];

export function OverviewContent({ stats, hardcoded }: { stats: GlobalStats; hardcoded: { total: number; hits: HardcodedHit[] } }) {
  return (
    <div className="container">
      <Typography as="h1" variant="h1" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
        Component Library Overview
      </Typography>
      <Typography as="p" variant="body" color="var(--neutral-600)" style={{ display: 'block', marginBottom: 24 }}>
        Every component below is pulled live from <code className="inline">MeetMedicoComponent</code> — pick one
        from the sidebar to see its preview, props, usage, history, and tests.
      </Typography>

      <StatsBar stats={stats} />

      <div style={{ marginBottom: 'var(--spacing-space-24)' }}>
        <Alert type="info">
          <Typography as="span" variant="body" weight="bold" style={{ display: 'block' }}>
            How this preview is wired
          </Typography>
          Every component here is pulled live from <code className="inline">MeetMedicoComponent</code> through a
          filesystem junction at <code className="inline">node_modules/design-system</code> (installed via a{' '}
          <code className="inline">file:</code> dependency — same effect as <code className="inline">npm link</code>
          ). Editing a component's source or CSS in that repo updates here immediately, no rebuild or reinstall. All
          44 components are wired — see any of them in the sidebar for all 6 tabs working end-to-end, e.g.{' '}
          <Link href="/components/breadcrumb">Breadcrumb</Link>.
        </Alert>
      </div>

      <div>
        <Typography as="h2" variant="h3" weight="bold" style={{ display: 'block', marginBottom: 12 }}>
          Hardcoded values (heuristic scan)
        </Typography>
        {hardcoded.total === 0 ? (
          <EmptyState preset="noData" title="No hardcoded values found" description="Clean scan across all components." />
        ) : (
          <>
            <Alert type="warning" showIcon>
              Flags literal hex colors and literal spacing/radius/font-size values not routed through a design
              token. Ignores 0, 1px solid border resets, percentage radii (shape, not scale), and tiny (&le;2px)
              cosmetic radii. Review manually — this is a heuristic, not a formal lint rule.
            </Alert>
            <div style={{ marginTop: 'var(--spacing-space-12)' }}>
              <Table
                columns={hardcodedColumns}
                data={hardcoded.hits}
                rowKey={(h) => `${h.file}:${h.line}`}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
