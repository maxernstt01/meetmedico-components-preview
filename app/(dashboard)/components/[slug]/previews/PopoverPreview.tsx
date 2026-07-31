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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
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
      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)' }}>
        <Popover title="Top" content="Placement: top" placement="top">
          <Button variant="secondary">Top</Button>
        </Popover>
        <Popover title="Left" content="Placement: left" placement="left">
          <Button variant="secondary">Left</Button>
        </Popover>
        <Popover title="Right" content="Placement: right" placement="right">
          <Button variant="secondary">Right</Button>
        </Popover>
        <Popover title="Bottom Right" content="Placement: bottomRight" placement="bottomRight">
          <Button variant="secondary">Bottom Right</Button>
        </Popover>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)' }}>
        <Popover title="Disabled" content="This popover never opens." disabled>
          <Button variant="secondary">Disabled</Button>
        </Popover>
      </div>
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

      {/* placement: 12 positions available - top/topLeft/topRight/bottom/
          bottomLeft/bottomRight/left/leftTop/leftBottom/right/rightTop/
          rightBottom. Default is 'bottom'. */}
      <Popover title="Top" content="Placement: top" placement="top">
        <button type="button">Top</button>
      </Popover>
      <Popover title="Left" content="Placement: left" placement="left">
        <button type="button">Left</button>
      </Popover>
      <Popover title="Right" content="Placement: right" placement="right">
        <button type="button">Right</button>
      </Popover>
      <Popover title="Bottom Right" content="Placement: bottomRight" placement="bottomRight">
        <button type="button">Bottom Right</button>
      </Popover>

      {/* disabled: the popover never opens regardless of trigger */}
      <Popover title="Disabled" content="This popover never opens." disabled>
        <button type="button">Disabled</button>
      </Popover>
    </>
  );
}`;
