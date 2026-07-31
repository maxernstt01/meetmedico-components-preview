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
import { Typography } from 'design-system/src/components/Typography/Typography';

// mask and type can be set per-step, overriding the Tour-level defaults:
// step 1 uses the Tour-level defaults (mask 'dimmed', type 'default'),
// step 2 overrides to mask 'blur' + type 'primary', step 3 overrides to
// mask 'none' and supplies a fully custom actions renderer.
const steps: TourStep[] = [
  { title: 'Step One', description: 'This is the first step of the tour.' },
  { title: 'Step Two', description: 'Blur mask, primary type.', mask: 'blur', type: 'primary' },
  {
    title: 'Step Three',
    description: 'No mask, with a fully custom footer.',
    mask: 'none',
    actions: ({ current, total, onPrev, onClose }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="caption">
          {current + 1} / {total}
        </Typography>
        <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
          <Button variant="secondary" onClick={onPrev}>
            Back
          </Button>
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    ),
  },
];

// Tour-level closable={false} / showSkip={false} plus a custom
// indicatorRender replacing the default dot indicators.
const restrictedSteps: TourStep[] = [
  { title: 'Welcome', description: 'This tour cannot be skipped or closed early.' },
  { title: 'All Done', description: "You're ready to go!" },
];

export default function Preview() {
  const [open, setOpen] = useState(false);
  const [restrictedOpen, setRestrictedOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-12)' }}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Tour steps={steps} open={open} onClose={() => setOpen(false)} onFinish={() => setOpen(false)} />

      <Button variant="secondary" onClick={() => setRestrictedOpen(true)}>
        Begin Tour (custom indicator, no skip/close)
      </Button>
      <Tour
        steps={restrictedSteps}
        open={restrictedOpen}
        onClose={() => setRestrictedOpen(false)}
        onFinish={() => setRestrictedOpen(false)}
        closable={false}
        showSkip={false}
        indicatorRender={(current, total) => (
          <Typography variant="caption">
            Step {current + 1} of {total}
          </Typography>
        )}
      />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Tour } from 'design-system';
import type { TourStep } from 'design-system';
import { Button } from 'design-system';
import { Typography } from 'design-system';

// mask and type can be set per-step, overriding the Tour-level defaults
const steps: TourStep[] = [
  { title: 'Step One', description: 'This is the first step of the tour.' },
  { title: 'Step Two', description: 'Blur mask, primary type.', mask: 'blur', type: 'primary' },
  {
    title: 'Step Three',
    description: 'No mask, with a fully custom footer.',
    mask: 'none',
    actions: ({ current, total, onPrev, onClose }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="caption">{current + 1} / {total}</Typography>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={onPrev}>Back</Button>
          <Button variant="primary" onClick={onClose}>Done</Button>
        </div>
      </div>
    ),
  },
];

const restrictedSteps: TourStep[] = [
  { title: 'Welcome', description: 'This tour cannot be skipped or closed early.' },
  { title: 'All Done', description: "You're ready to go!" },
];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [restrictedOpen, setRestrictedOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Begin Tour</button>
      <Tour
        steps={steps}
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
      />

      {/* closable={false} hides the close (X) button, showSkip={false} hides
          the Skip button, indicatorRender replaces the default dot indicators */}
      <button onClick={() => setRestrictedOpen(true)}>Begin Tour (custom indicator, no skip/close)</button>
      <Tour
        steps={restrictedSteps}
        open={restrictedOpen}
        onClose={() => setRestrictedOpen(false)}
        onFinish={() => setRestrictedOpen(false)}
        closable={false}
        showSkip={false}
        indicatorRender={(current, total) => (
          <Typography variant="caption">Step {current + 1} of {total}</Typography>
        )}
      />
    </>
  );
}`;
