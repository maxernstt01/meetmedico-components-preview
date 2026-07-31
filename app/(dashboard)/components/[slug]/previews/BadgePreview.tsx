'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Badge's own file
// avoids that entirely - only this component's real files get compiled.
import { Badge } from 'design-system/src/components/Badge/Badge';
import Location02Icon from 'design-system/src/assets/icons/Primary Button/Location02Icon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
        <Badge variant="neutral" icon={Location02Icon}>
          Neutral
        </Badge>
        <Badge variant="info" icon={Location02Icon}>
          Info
        </Badge>
        <Badge variant="success" icon={Location02Icon}>
          Success
        </Badge>
        <Badge variant="warning" icon={Location02Icon}>
          Warning
        </Badge>
        <Badge variant="error" icon={Location02Icon}>
          Error
        </Badge>
      </div>
    </div>
  );
}

export const CODE = `import { Badge } from 'design-system';
import Location02Icon from 'design-system/icons/Location02Icon.svg?react';

export default function Example() {
  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>

      {/* Optional leading icon */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge variant="neutral" icon={Location02Icon}>
          Neutral
        </Badge>
        <Badge variant="info" icon={Location02Icon}>
          Info
        </Badge>
        <Badge variant="success" icon={Location02Icon}>
          Success
        </Badge>
        <Badge variant="warning" icon={Location02Icon}>
          Warning
        </Badge>
        <Badge variant="error" icon={Location02Icon}>
          Error
        </Badge>
      </div>
    </>
  );
}`;
