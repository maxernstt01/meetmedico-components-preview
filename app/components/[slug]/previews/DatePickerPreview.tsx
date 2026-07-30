'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at DatePicker's own
// file avoids that entirely - only this component's real files get compiled.
import { DatePicker } from 'design-system/src/components/DatePicker/DatePicker';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
      <DatePicker label="Date" required />
      <DatePicker label="Date" required mode="range" />
      <DatePicker label="Date" helperText="When should we schedule the follow-up?" />
      <DatePicker label="Date" error helperText="This field is required" />
      <DatePicker label="Date" required size="small" />
    </div>
  );
}

export const CODE = `import { DatePicker } from 'design-system';

export default function Example() {
  return (
    <>
      <DatePicker label="Date" required />

      {/* Range mode shows two linked inputs (from / to) */}
      <DatePicker label="Date" required mode="range" />

      <DatePicker label="Date" helperText="When should we schedule the follow-up?" />

      <DatePicker label="Date" error helperText="This field is required" />

      {/* Small size */}
      <DatePicker label="Date" required size="small" />
    </>
  );
}`;
