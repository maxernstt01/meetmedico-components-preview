'use client';

import type { ReactNode } from 'react';
// Deep-imported straight at each component's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
import { Typography } from 'design-system/src/components/Typography/Typography';
import { Badge } from 'design-system/src/components/Badge/Badge';

export function CardShowcase({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="cardShowcase">
      <div className="cardShowcase__header">
        <Typography as="h2" variant="h1" weight="bold">
          {title}
        </Typography>
        <Badge>Web application</Badge>
      </div>
      <div className="cardShowcase__body">{children}</div>
    </div>
  );
}
