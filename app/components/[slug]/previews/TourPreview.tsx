'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Tour's own
// file avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Tour } from 'design-system/src/components/Tour/Tour';
import type { TourStep } from 'design-system/src/components/Tour/Tour.types';
import { Button } from 'design-system/src/components/Button/Button';

const steps: TourStep[] = [
  { title: 'Step One', description: 'This is the first step of the tour.' },
  { title: 'Step Two', description: 'This is the second step of the tour.' },
  { title: 'Step Three', description: 'This is the final step of the tour.' },
];

export default function Preview() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Tour steps={steps} open={open} onClose={() => setOpen(false)} onFinish={() => setOpen(false)} />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Tour } from 'design-system';
import type { TourStep } from 'design-system';

const steps: TourStep[] = [
  { title: 'Step One', description: 'This is the first step of the tour.' },
  { title: 'Step Two', description: 'This is the second step of the tour.' },
  { title: 'Step Three', description: 'This is the final step of the tour.' },
];

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Begin Tour</button>
      <Tour
        steps={steps}
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
      />
    </>
  );
}`;
