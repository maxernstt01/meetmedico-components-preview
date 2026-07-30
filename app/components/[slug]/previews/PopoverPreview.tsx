'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at Popover's own file
// avoids that entirely - only this component's real files get compiled.
import { Popover } from 'design-system/src/components/Popover/Popover';
import { Button } from 'design-system/src/components/Button/Button';

export default function Preview() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-24)' }}>
      <Popover title="Details" content="A hover-triggered popover with simple text content." trigger="hover">
        <Button variant="secondary">Hover me</Button>
      </Popover>
      <Popover
        title="Confirm"
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
            <span>Are you sure you want to discharge this patient?</span>
            <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
              <Button variant="secondary" size="md">Cancel</Button>
              <Button variant="error" size="md">Confirm</Button>
            </div>
          </div>
        }
      >
        <Button variant="error">Discharge Patient</Button>
      </Popover>
    </div>
  );
}

export const CODE = `import { Popover } from 'design-system';

export default function Example() {
  return (
    <>
      {/* trigger: 'click' (default) | 'hover' */}
      <Popover title="Details" content="Simple text content." trigger="hover">
        <button type="button">Hover me</button>
      </Popover>

      {/* Content can hold interactive elements - clicking inside does NOT close the popover,
          only an outside click, Escape, or toggling the trigger does. */}
      <Popover
        title="Confirm"
        content={
          <>
            <span>Are you sure?</span>
            <button type="button">Cancel</button>
            <button type="button">Confirm</button>
          </>
        }
      >
        <button type="button">Discharge Patient</button>
      </Popover>
    </>
  );
}`;
