'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Rate's own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Rate } from 'design-system/src/components/Rate/Rate';

export default function Preview() {
  const [rateValue, setRateValue] = useState(4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', alignItems: 'center' }}>
        <Rate variant="outline" defaultValue={4} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', alignItems: 'center' }}>
        <Rate variant="filled" defaultValue={3} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
        <Rate size={16} defaultValue={3} />
        <Rate size={20} defaultValue={3} />
        <Rate size={26} defaultValue={3} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', alignItems: 'center' }}>
        <Rate value={rateValue} onChange={setRateValue} />
        <span>{rateValue} / 5</span>
      </div>
      <Rate variant="badge" value={3.6} />
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', alignItems: 'center' }}>
        <Rate defaultValue={2} disabled />
      </div>
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Rate } from 'design-system';

export default function Example() {
  const [rateValue, setRateValue] = useState(4);

  return (
    <>
      <Rate variant="outline" defaultValue={4} />
      <Rate variant="filled" defaultValue={3} />

      {/* Sizes: 16 / 20 / 26 */}
      <Rate size={16} defaultValue={3} />
      <Rate size={20} defaultValue={3} />
      <Rate size={26} defaultValue={3} />

      {/* Interactive (clickable), controlled */}
      <Rate value={rateValue} onChange={setRateValue} />

      {/* Read-only badge showing a fractional average rating */}
      <Rate variant="badge" value={3.6} />

      {/* Disabled: not clickable */}
      <Rate defaultValue={2} disabled />
    </>
  );
}`;
