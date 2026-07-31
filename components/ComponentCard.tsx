'use client';

import type { ReactNode } from 'react';
// Deep-imported straight at Card's own file (never through design-system's
// barrel) - same reasoning as every previews/*.tsx file. Card itself has no
// 'use client' directive (like every MeetMedicoComponent source file), and
// its root element always carries an onKeyDown handler even when onClick
// isn't passed - rendering it directly from a Server Component (our
// page.tsx files, which do real server-side data-fetching via getProps/
// getGitLog/etc.) trips React's "Event handlers cannot be passed to Client
// Component props" rule. This thin wrapper gives Card a client boundary to
// live in, so the Server Component pages can still just pass children.
import { Card } from 'design-system/src/components/Card/Card';

export function ComponentCard({ children }: { children: ReactNode }) {
  return (
    <Card variant="elevated" padding="lg" className="component-card">
      {children}
    </Card>
  );
}
