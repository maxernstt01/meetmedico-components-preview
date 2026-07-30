'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Dropdown's own file
// avoids that entirely - only this component's real files get compiled.
import { Dropdown } from 'design-system/src/components/Dropdown/Dropdown';
import type { DropdownOption } from 'design-system/src/components/Dropdown/Dropdown.types';

const options: DropdownOption[] = Array.from({ length: 7 }, (_, i) => ({
  value: String(i + 1),
  label: `Option ${i + 1}`,
}));

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
      <Dropdown label="Dropdown" required options={options} helperText="Support Text" />
      <Dropdown label="Single Select" required mode="single" options={options} />
      <Dropdown label="Multi Select" required mode="multi" options={options} defaultValue={['1', '2']} />
      <Dropdown variant="tertiary" label="Tertiary" options={options} />
      <Dropdown
        label="Multi-select (tags below)"
        required
        mode="multi"
        showSelectedTags
        options={options}
        defaultValue={['1', '2', '3']}
      />
      <Dropdown label="Dropdown" required options={options} size="small" />
    </div>
  );
}

export const CODE = `import { Dropdown } from 'design-system';
import type { DropdownOption } from 'design-system';

const options: DropdownOption[] = Array.from({ length: 7 }, (_, i) => ({
  value: String(i + 1),
  label: \`Option \${i + 1}\`,
}));

export default function Example() {
  return (
    <>
      <Dropdown label="Dropdown" required options={options} helperText="Support Text" />

      <Dropdown label="Single Select" required mode="single" options={options} />

      <Dropdown label="Multi Select" required mode="multi" options={options} defaultValue={['1', '2']} />

      <Dropdown variant="tertiary" label="Tertiary" options={options} />

      {/* showSelectedTags only applies with mode="multi": renders each
          selected option as a removable tag below the trigger instead of a
          summary count inside it. */}
      <Dropdown
        label="Multi-select (tags below)"
        required
        mode="multi"
        showSelectedTags
        options={options}
        defaultValue={['1', '2', '3']}
      />

      {/* Small size */}
      <Dropdown label="Dropdown" required options={options} size="small" />
    </>
  );
}`;
