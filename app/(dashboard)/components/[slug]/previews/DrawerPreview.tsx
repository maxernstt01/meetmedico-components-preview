'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Drawer's own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Drawer } from 'design-system/src/components/Drawer/Drawer';
import type { DrawerPlacement } from 'design-system/src/components/Drawer/Drawer.types';
import { Button } from 'design-system/src/components/Button/Button';

const placements: { value: DrawerPlacement; label: string }[] = [
  { value: 'top', label: 'Top' },
  { value: 'right', label: 'Right' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
];

export default function Preview() {
  const [normal, setNormal] = useState<{ open: boolean; placement: DrawerPlacement }>({
    open: false,
    placement: 'right',
  });
  const [withActions, setWithActions] = useState(false);
  const [dimmedOpen, setDimmedOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
        {placements.map((p) => (
          <Button
            key={p.value}
            variant="primary"
            onClick={() => setNormal({ open: true, placement: p.value })}
          >
            Open {p.label}
          </Button>
        ))}
        <Button variant="secondary" onClick={() => setWithActions(true)}>
          Open With Actions
        </Button>
        <Button variant="secondary" onClick={() => setDimmedOpen(true)}>
          Open Dimmed Mask
        </Button>
      </div>

      <Drawer
        open={normal.open}
        onClose={() => setNormal((s) => ({ ...s, open: false }))}
        placement={normal.placement}
        title="Normal Drawer"
      >
        Some contents...
      </Drawer>

      <Drawer
        open={withActions}
        onClose={() => setWithActions(false)}
        title="With Actions"
        onSubmit={() => setWithActions(false)}
        onCancel={() => setWithActions(false)}
      >
        Some contents...
      </Drawer>

      <Drawer open={dimmedOpen} onClose={() => setDimmedOpen(false)} title="Dimmed Mask" mask="dimmed">
        Some contents...
      </Drawer>
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Drawer, Button } from 'design-system';
import type { DrawerPlacement } from 'design-system';

export default function Example() {
  const [normal, setNormal] = useState<{ open: boolean; placement: DrawerPlacement }>({
    open: false,
    placement: 'right',
  });
  const [withActions, setWithActions] = useState(false);
  const [dimmedOpen, setDimmedOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setNormal({ open: true, placement: 'right' })}>
        Open Right
      </Button>
      <Button variant="secondary" onClick={() => setWithActions(true)}>
        Open With Actions
      </Button>
      <Button variant="secondary" onClick={() => setDimmedOpen(true)}>
        Open Dimmed Mask
      </Button>

      <Drawer
        open={normal.open}
        onClose={() => setNormal((s) => ({ ...s, open: false }))}
        placement={normal.placement}
        title="Normal Drawer"
      >
        Some contents...
      </Drawer>

      {/* onSubmit / onCancel render a footer with default action buttons */}
      <Drawer
        open={withActions}
        onClose={() => setWithActions(false)}
        title="With Actions"
        onSubmit={() => setWithActions(false)}
        onCancel={() => setWithActions(false)}
      >
        Some contents...
      </Drawer>

      <Drawer open={dimmedOpen} onClose={() => setDimmedOpen(false)} title="Dimmed Mask" mask="dimmed">
        Some contents...
      </Drawer>
    </>
  );
}`;
