'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at InputNumber's own file
// avoids that entirely - only this component's real files get compiled.
import { InputNumber } from 'design-system/src/components/InputNumber/InputNumber';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
      <InputNumber label="Quantity" required defaultValue={1} min={0} max={10} />
      <InputNumber label="Quantity (small)" required defaultValue={1} min={0} max={10} size="small" />
      <InputNumber
        label="Dosage (mg)"
        defaultValue={2.5}
        step={0.5}
        precision={1}
        helperText="In 0.5mg increments"
      />
      <InputNumber label="Quantity" defaultValue={-1} min={0} error helperText="Must be 0 or greater" />
      <InputNumber label="Quantity" defaultValue={5} disabled />
    </div>
  );
}

export const CODE = `import { InputNumber } from 'design-system';

export default function Example() {
  return (
    <>
      <InputNumber label="Quantity" required defaultValue={1} min={0} max={10} />

      {/* size: 'normal' (default) | 'small' */}
      <InputNumber label="Quantity" required defaultValue={1} min={0} max={10} size="small" />

      {/* step + precision control the +/- stepper's increment and rounding */}
      <InputNumber
        label="Dosage (mg)"
        defaultValue={2.5}
        step={0.5}
        precision={1}
        helperText="In 0.5mg increments"
      />

      <InputNumber label="Quantity" defaultValue={-1} min={0} error helperText="Must be 0 or greater" />
      <InputNumber label="Quantity" defaultValue={5} disabled />
    </>
  );
}`;
