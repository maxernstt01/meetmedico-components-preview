'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Timeline's own
// file avoids that entirely - only this component's real files get compiled.
import { Timeline } from 'design-system/src/components/Timeline/Timeline';
import type { TimelineItem } from 'design-system/src/components/Timeline/Timeline.types';

const timelineItems: TimelineItem[] = [
  { key: '1', children: 'Create a services site 2015-09-01' },
  { key: '2', children: 'Solve initial network problems 2015-09-01' },
  { key: '3', children: 'Technical testing 2015-09-01' },
  { key: '4', children: 'Network problems being solved 2015-09-01' },
];

const timelineStatusItems: TimelineItem[] = [
  { key: '1', children: 'Create a services site 2015-09-01', status: 'success' },
  { key: '2', children: 'Solve initial network problems 2015-09-01', status: 'success' },
  { key: '3', children: 'Technical testing 2015-09-01', status: 'error' },
  { key: '4', children: 'Network problems being solved 2015-09-01' },
];

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)', maxWidth: 480 }}>
      <Timeline items={timelineItems} />
      <Timeline items={timelineItems} placement="center" />
      <Timeline items={timelineStatusItems} />
      <Timeline items={timelineItems.slice(0, 3)} pending="Recording..." />
    </div>
  );
}

export const CODE = `import { Timeline } from 'design-system';
import type { TimelineItem } from 'design-system';

const timelineItems: TimelineItem[] = [
  { key: '1', children: 'Create a services site 2015-09-01' },
  { key: '2', children: 'Solve initial network problems 2015-09-01' },
  { key: '3', children: 'Technical testing 2015-09-01' },
  { key: '4', children: 'Network problems being solved 2015-09-01' },
];

const timelineStatusItems: TimelineItem[] = [
  { key: '1', children: 'Create a services site 2015-09-01', status: 'success' },
  { key: '2', children: 'Solve initial network problems 2015-09-01', status: 'success' },
  { key: '3', children: 'Technical testing 2015-09-01', status: 'error' },
  { key: '4', children: 'Network problems being solved 2015-09-01' },
];

export default function Example() {
  return (
    <>
      {/* Default: vertical, left-aligned */}
      <Timeline items={timelineItems} />
      {/* Alternating (zig-zag) placement */}
      <Timeline items={timelineItems} placement="center" />
      {/* Per-item status coloring (success / error / default) */}
      <Timeline items={timelineStatusItems} />
      {/* Pending / in-progress trailing node */}
      <Timeline items={timelineItems.slice(0, 3)} pending="Recording..." />
    </>
  );
}`;
