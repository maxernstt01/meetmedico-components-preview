'use client';

import { type ComponentType, useMemo, useState } from 'react';
import dynamicImport from 'next/dynamic';
import { CodeBlock } from './CodeBlock';
// Deep-imported straight at each component's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file:
// the barrel re-exports all 44 components together with zero "use client"
// directives anywhere, so importing through it here would drag stateful
// siblings into Next's server compile graph and break the build.
import { Tabs } from 'design-system/src/components/Tabs/Tabs';
import { Table } from 'design-system/src/components/Table/Table';
import { Badge } from 'design-system/src/components/Badge/Badge';
import { Typography } from 'design-system/src/components/Typography/Typography';
import { EmptyState } from 'design-system/src/components/EmptyState/EmptyState';
import { Timeline } from 'design-system/src/components/Timeline/Timeline';
import type { TableColumn } from 'design-system/src/components/Table/Table.types';
import type { TabItem } from 'design-system/src/components/Tabs/Tabs.types';
import type { TimelineItem } from 'design-system/src/components/Timeline/Timeline.types';
import type { PropsResult, PropRow } from '@/lib/introspection/getProps';
import type { CommitRow } from '@/lib/introspection/getGitLog';
import type { TestCasesResult } from '@/lib/introspection/getTestCases';
import type { UsageResult } from '@/lib/introspection/getUsageCount';

const TAB_ITEMS: TabItem[] = [
  { value: 'Preview', label: 'Preview' },
  { value: 'Props Info', label: 'Props Info' },
  { value: 'Usage Pages', label: 'Usage Pages' },
  { value: 'Modified log', label: 'Modified log' },
  { value: 'Validation', label: 'Validation' },
  { value: 'Test Scenarios', label: 'Test Scenarios' },
];
type Tab = (typeof TAB_ITEMS)[number]['value'];

const propsColumns: TableColumn<PropRow>[] = [
  {
    key: 'name',
    title: 'Prop',
    render: (_v, row) => <code className="inline">{row.name}</code>,
  },
  {
    key: 'type',
    title: 'Type',
    render: (_v, row) => <code className="inline">{row.type}</code>,
  },
  {
    key: 'required',
    title: 'Required',
    render: (_v, row) => <Badge variant={row.required ? 'warning' : 'success'}>{row.required ? 'required' : 'optional'}</Badge>,
  },
  {
    key: 'default',
    title: 'Default',
    render: (_v, row) => (row.defaultValue ? <code className="inline">{row.defaultValue}</code> : '—'),
  },
  {
    key: 'description',
    title: 'Description',
    render: (_v, row) => row.description || '—',
  },
];

export function ComponentTabs({
  name,
  PreviewComponent,
  code,
  props,
  usage,
  gitLog,
  tests,
}: {
  name: string;
  PreviewComponent: ComponentType;
  code: string;
  props: PropsResult;
  usage: UsageResult;
  gitLog: CommitRow[];
  tests: TestCasesResult;
}) {
  const [active, setActive] = useState<Tab>('Preview');

  // MeetMedicoComponent is a Vite SPA library, never built with SSR in mind -
  // some components (e.g. NotificationProvider) call browser-only APIs
  // (createPortal(..., document.body)) directly in their render body, not
  // guarded in an effect. Next.js still renders Client Components once on
  // the server for the initial HTML, so `document`/`window` don't exist yet
  // and it crashes. Rendering every preview client-only (ssr: false) sidesteps
  // this for all 44 components without touching the design-system source.
  const ClientOnlyPreview = useMemo(
    () => dynamicImport(() => Promise.resolve({ default: PreviewComponent }), { ssr: false }),
    [PreviewComponent]
  );

  const timelineItems: TimelineItem[] = gitLog.map((c) => ({
    key: c.hash,
    children: (
      <>
        <code className="inline">{c.hash}</code> — {c.message}
      </>
    ),
  }));

  return (
    <div>
      <Tabs items={TAB_ITEMS} value={active} onChange={(v) => setActive(v as Tab)} variant="underline" />

      <div style={{ marginTop: 'var(--spacing-space-16)' }}>
        {active === 'Preview' && (
          <div>
            <div className="preview-box">
              <ClientOnlyPreview />
            </div>
            <CodeBlock code={code} />
          </div>
        )}

        {active === 'Props Info' && (
          <div>
            {props.rows.length === 0 ? (
              <EmptyState
                preset="noData"
                title="No props found"
                description={`No ${props.interfaceName ?? `${name}Props`} found in ${props.sourceFile}.`}
              />
            ) : (
              <Table columns={propsColumns} data={props.rows} rowKey="name" pagination={false} />
            )}
            <Typography variant="caption" color="var(--neutral-500)" style={{ display: 'block', marginTop: 16 }}>
              Extracted live from <code className="inline">{props.sourceFile}</code> via the TypeScript compiler API.
            </Typography>
          </div>
        )}

        {active === 'Usage Pages' && (
          <div>
            <Typography variant="body">
              <b>{usage.count}</b> usage{usage.count === 1 ? '' : 's'} found across{' '}
              <code className="inline">meetmedico-components-preview</code> (counted as "the application" until this
              is wired into the real product).
            </Typography>
            {usage.hits.length === 0 ? (
              <EmptyState preset="noData" title="Not used anywhere yet" />
            ) : (
              usage.hits.map((hit, i) => (
                <Typography as="div" variant="caption" key={i} style={{ fontFamily: 'monospace', padding: '4px 0' }}>
                  {hit.file}:{hit.line}
                </Typography>
              ))
            )}
          </div>
        )}

        {active === 'Modified log' && (
          <div>
            {gitLog.length === 0 ? (
              <EmptyState preset="noData" title="No git history found for this component's folder" />
            ) : (
              <Timeline items={timelineItems} />
            )}
            <Typography variant="caption" color="var(--neutral-500)" style={{ display: 'block', marginTop: 16 }}>
              Real <code className="inline">git log --follow -- src/components/{name}</code> output from the
              MeetMedicoComponent repo. Commit messages are only as descriptive as what was actually committed.
            </Typography>
          </div>
        )}

        {(active === 'Validation' || active === 'Test Scenarios') && (
          <div>
            {!tests.found && <EmptyState preset="noData" title={`No ${name}.test.tsx found`} />}
            {tests.found && tests.cases.length === 0 && (
              <EmptyState preset="noData" title="Test file exists but no it()/test() blocks were found" />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
              {tests.cases.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-8)' }}>
                  <Badge variant="success">✓</Badge>
                  <Typography variant="body">
                    {c.describeBlock ? <b>{c.describeBlock}: </b> : null}
                    {c.title}
                  </Typography>
                </div>
              ))}
            </div>
            <Typography variant="caption" color="var(--neutral-500)" style={{ display: 'block', marginTop: 16 }}>
              Extracted from real <code className="inline">{tests.sourceFile}</code> — Validation and Test Scenarios
              show the same list (single real source of truth, per your call).
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
