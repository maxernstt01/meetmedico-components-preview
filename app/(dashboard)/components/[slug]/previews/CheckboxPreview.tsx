'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Checkbox's own
// file avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Checkbox } from 'design-system/src/components/Checkbox/Checkbox';

export default function Preview() {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <Checkbox label="Default" />
      <Checkbox label="Line, Checked" variant="line" defaultChecked />
      <Checkbox label="Fill, Checked" variant="fill" defaultChecked />
      <Checkbox label="Controlled" checked={checked} onChange={setChecked} />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled, Checked (Fill)" variant="fill" defaultChecked disabled />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Checkbox } from 'design-system';

export default function Example() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Checkbox label="Default" />
      <Checkbox label="Line, Checked" variant="line" defaultChecked />
      <Checkbox label="Fill, Checked" variant="fill" defaultChecked />
      <Checkbox label="Controlled" checked={checked} onChange={setChecked} />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled, Checked (Fill)" variant="fill" defaultChecked disabled />
    </>
  );
}`;
