'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Radio's own file
// avoids that entirely - only this component's real files get compiled.
import { Radio } from 'design-system/src/components/Radio/Radio';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)' }}>
        <Radio name="radio-demo-1" label="Default" />
        <Radio name="radio-demo-1" label="Checked" defaultChecked />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)' }}>
        <Radio name="radio-demo-2" label="Disabled" disabled />
        <Radio name="radio-demo-2" label="Disabled, Checked" defaultChecked disabled />
      </div>
    </div>
  );
}

export const CODE = `import { Radio } from 'design-system';

export default function Example() {
  return (
    <>
      {/* Same 'name' groups radios so only one can be selected */}
      <Radio name="radio-demo-1" label="Default" />
      <Radio name="radio-demo-1" label="Checked" defaultChecked />

      <Radio name="radio-demo-2" label="Disabled" disabled />
      <Radio name="radio-demo-2" label="Disabled, Checked" defaultChecked disabled />
    </>
  );
}`;
