'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Tabs' own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Tabs } from 'design-system/src/components/Tabs/Tabs';
import EyeIcon from 'design-system/src/assets/icons/Primary Button/EyeIcon.svg?react';

export default function Preview() {
  const [value, setValue] = useState('1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <Tabs
        value={value}
        onChange={setValue}
        items={[
          { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
          { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
          { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
        ]}
      />

      <Tabs
        variant="box"
        items={[
          { value: '1', label: 'Meet Medico' },
          { value: '2', label: 'Meet Medico' },
        ]}
      />

      <Tabs
        variant="segment"
        items={[
          { value: '1', label: 'Meet Medico' },
          { value: '2', label: 'Meet Medico' },
        ]}
      />

      <Tabs
        items={[
          { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
          { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
        ]}
      />

      <Tabs
        size="small"
        items={[
          { value: '1', label: 'Meet Medico' },
          { value: '2', label: 'Meet Medico' },
        ]}
      />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Tabs } from 'design-system';
import EyeIcon from 'design-system/icons/EyeIcon.svg?react';

export default function Example() {
  const [value, setValue] = useState('1');

  return (
    <>
      {/* Controlled underline tabs (default variant), with dropdown affordance */}
      <Tabs
        value={value}
        onChange={setValue}
        items={[
          { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
          { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
          { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
        ]}
      />

      {/* Box variant */}
      <Tabs
        variant="box"
        items={[
          { value: '1', label: 'Meet Medico' },
          { value: '2', label: 'Meet Medico' },
        ]}
      />

      {/* Segment variant */}
      <Tabs
        variant="segment"
        items={[
          { value: '1', label: 'Meet Medico' },
          { value: '2', label: 'Meet Medico' },
        ]}
      />

      {/* Icon-only tabs require ariaLabel since there's no visible label */}
      <Tabs
        items={[
          { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
          { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
        ]}
      />

      {/* size: 'normal' (default) | 'small' */}
      <Tabs
        size="small"
        items={[
          { value: '1', label: 'Meet Medico' },
          { value: '2', label: 'Meet Medico' },
        ]}
      />
    </>
  );
}`;
