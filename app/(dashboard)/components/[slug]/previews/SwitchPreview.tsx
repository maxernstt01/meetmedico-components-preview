'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Switch's own file
// avoids that entirely - only this component's real files get compiled.
import { Switch } from 'design-system/src/components/Switch/Switch';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <Switch label="Default" />
      <Switch label="Active" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled, Active" defaultChecked disabled />
      <Switch label="Size: small" size="small" defaultChecked />
    </div>
  );
}

export const CODE = `import { Switch } from 'design-system';

export default function Example() {
  return (
    <>
      <Switch label="Default" />
      <Switch label="Active" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled, Active" defaultChecked disabled />

      {/* size: 'normal' (default) | 'small' */}
      <Switch label="Size: small" size="small" defaultChecked />
    </>
  );
}`;
