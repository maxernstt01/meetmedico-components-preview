'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at TimePicker's own
// file avoids that entirely - only this component's real files get compiled.
import { TimePicker } from 'design-system/src/components/TimePicker/TimePicker';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
      <TimePicker label="Time" required />
      <TimePicker label="Time" required helperText="Use 24-hour format" />
      <TimePicker label="Time" required error helperText="Please select a valid time" />
      <TimePicker label="Time" required size="small" />
    </div>
  );
}

export const CODE = `import { TimePicker } from 'design-system';

export default function Example() {
  return (
    <>
      <TimePicker label="Time" required />
      <TimePicker label="Time" required helperText="Use 24-hour format" />
      <TimePicker label="Time" required error helperText="Please select a valid time" />
      <TimePicker label="Time" required size="small" />
    </>
  );
}`;
