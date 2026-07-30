'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Divider's own file
// avoids that entirely - only this component's real files get compiled.
import { Divider } from 'design-system/src/components/Divider/Divider';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
        <Divider />
        <Divider variant="dotted" />
        <Divider variant="dash" />
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', height: 24 }}>
        <Divider orientation="vertical" />
        <Divider orientation="vertical" variant="dotted" />
        <Divider orientation="vertical" variant="dash" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
        <Divider textAlign="left">Text</Divider>
        <Divider textAlign="center">Text</Divider>
        <Divider textAlign="right">Text</Divider>
        <Divider variant="dotted" textAlign="center">
          Text
        </Divider>
      </div>
    </div>
  );
}

export const CODE = `import { Divider } from 'design-system';

export default function Example() {
  return (
    <>
      {/* Horizontal (default) */}
      <Divider />
      <Divider variant="dotted" />
      <Divider variant="dash" />

      {/* Vertical needs a parent with a height to stretch into */}
      <div style={{ display: 'flex', gap: 16, height: 24 }}>
        <Divider orientation="vertical" />
        <Divider orientation="vertical" variant="dotted" />
        <Divider orientation="vertical" variant="dash" />
      </div>

      {/* Horizontal only: inline label text */}
      <Divider textAlign="left">Text</Divider>
      <Divider textAlign="center">Text</Divider>
      <Divider textAlign="right">Text</Divider>
      <Divider variant="dotted" textAlign="center">
        Text
      </Divider>
    </>
  );
}`;
