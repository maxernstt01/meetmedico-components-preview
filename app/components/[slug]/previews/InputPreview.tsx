'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Input's own
// file avoids that entirely - only this component's real files get compiled.
import { Input } from 'design-system/src/components/Input/Input';
import LocationIcon from 'design-system/src/assets/icons/Primary Button/Location02Icon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
      <Input label="Label" required placeholder="Enter here" />
      <Input label="Label" required placeholder="Enter here" helperText="Support Text" />
      <Input
        label="Label"
        required
        placeholder="Enter here"
        helperText="Support Text"
        rightIcon={LocationIcon}
      />
      <Input label="Label" required placeholder="Enter here" leftIcon={LocationIcon} />
      <Input label="Label" required defaultValue="Qadir AK" />
      <Input
        label="Label"
        required
        defaultValue="Qadir AK"
        error
        helperText="Error helper text"
      />
      <Input label="Label" required placeholder="Enter here" size="small" />
    </div>
  );
}

export const CODE = `import { Input } from 'design-system';
import LocationIcon from 'design-system/icons/Location02Icon';

export default function Example() {
  return (
    <>
      <Input label="Label" required placeholder="Enter here" />

      <Input label="Label" required placeholder="Enter here" helperText="Support Text" />

      {/* Icon on the right */}
      <Input
        label="Label"
        required
        placeholder="Enter here"
        helperText="Support Text"
        rightIcon={LocationIcon}
      />

      {/* Icon on the left */}
      <Input label="Label" required placeholder="Enter here" leftIcon={LocationIcon} />

      {/* Filled */}
      <Input label="Label" required defaultValue="Qadir AK" />

      {/* Error state */}
      <Input
        label="Label"
        required
        defaultValue="Qadir AK"
        error
        helperText="Error helper text"
      />

      {/* Small size */}
      <Input label="Label" required placeholder="Enter here" size="small" />
    </>
  );
}`;
