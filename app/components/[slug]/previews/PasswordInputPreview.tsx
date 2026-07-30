'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at PasswordInput's own
// file avoids that entirely - only this component's real files get compiled.
import { PasswordInput } from 'design-system/src/components/PasswordInput/PasswordInput';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <PasswordInput label="Label" required placeholder="Enter password" />
      <PasswordInput label="Label" required defaultValue="Gtu6k_kdfj" />
      <PasswordInput
        label="Label"
        required
        defaultValue="Gtu6k_kdfj"
        error
        helperText="Error helper text"
      />
      <PasswordInput label="Label" required showRequirements placeholder="Enter password" />
      <PasswordInput label="Label" required placeholder="Enter password" size="small" />
    </div>
  );
}

export const CODE = `import { PasswordInput } from 'design-system';

export default function Example() {
  return (
    <>
      <PasswordInput label="Label" required placeholder="Enter password" />
      <PasswordInput label="Label" required defaultValue="Gtu6k_kdfj" />
      <PasswordInput
        label="Label"
        required
        defaultValue="Gtu6k_kdfj"
        error
        helperText="Error helper text"
      />
      {/* Shows the live password-rule checklist while typing */}
      <PasswordInput label="Label" required showRequirements placeholder="Enter password" />
      {/* Small size */}
      <PasswordInput label="Label" required placeholder="Enter password" size="small" />
    </>
  );
}`;
