'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Tooltip's own
// file avoids that entirely - only this component's real files get compiled.
import { Tooltip } from 'design-system/src/components/Tooltip/Tooltip';
import { Button } from 'design-system/src/components/Button/Button';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)', alignItems: 'center' }}>
      <Tooltip title="Title" description="A Tooltip Description">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="bottomLeft">
        <Button variant="secondary">Bottom Left</Button>
      </Tooltip>
      <Tooltip title="Disabled" description="This tooltip will never show" disabled>
        <Button variant="secondary">Disabled</Button>
      </Tooltip>
    </div>
  );
}

export const CODE = `import { Tooltip } from 'design-system';
import { Button } from 'design-system';

export default function Example() {
  return (
    <>
      <Tooltip title="Title" description="A Tooltip Description">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="bottomLeft">
        <Button variant="secondary">Bottom Left</Button>
      </Tooltip>
      {/* disabled: tooltip never appears, even on hover/focus */}
      <Tooltip title="Disabled" description="This tooltip will never show" disabled>
        <Button variant="secondary">Disabled</Button>
      </Tooltip>
    </>
  );
}`;
