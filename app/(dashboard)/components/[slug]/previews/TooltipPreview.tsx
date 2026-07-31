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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)', alignItems: 'center' }}>
        <Tooltip title="Title" description="A Tooltip Description">
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
        <Tooltip title="Disabled" description="This tooltip will never show" disabled>
          <Button variant="secondary">Disabled</Button>
        </Tooltip>
      </div>

      {/* Top group */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)', alignItems: 'center' }}>
        <Tooltip title="Title" description="A Tooltip Description" placement="topLeft">
          <Button variant="secondary">Top Left</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="top">
          <Button variant="secondary">Top</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="topRight">
          <Button variant="secondary">Top Right</Button>
        </Tooltip>
      </div>

      {/* Bottom group */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)', alignItems: 'center' }}>
        <Tooltip title="Title" description="A Tooltip Description" placement="bottomLeft">
          <Button variant="secondary">Bottom Left</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="bottom">
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="bottomRight">
          <Button variant="secondary">Bottom Right</Button>
        </Tooltip>
      </div>

      {/* Left group */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)', alignItems: 'center' }}>
        <Tooltip title="Title" description="A Tooltip Description" placement="leftTop">
          <Button variant="secondary">Left Top</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="left">
          <Button variant="secondary">Left</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="leftBottom">
          <Button variant="secondary">Left Bottom</Button>
        </Tooltip>
      </div>

      {/* Right group */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-24)', alignItems: 'center' }}>
        <Tooltip title="Title" description="A Tooltip Description" placement="rightTop">
          <Button variant="secondary">Right Top</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="right">
          <Button variant="secondary">Right</Button>
        </Tooltip>
        <Tooltip title="Title" description="A Tooltip Description" placement="rightBottom">
          <Button variant="secondary">Right Bottom</Button>
        </Tooltip>
      </div>
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
      {/* disabled: tooltip never appears, even on hover/focus */}
      <Tooltip title="Disabled" description="This tooltip will never show" disabled>
        <Button variant="secondary">Disabled</Button>
      </Tooltip>

      {/* Top group */}
      <Tooltip title="Title" description="A Tooltip Description" placement="topLeft">
        <Button variant="secondary">Top Left</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="topRight">
        <Button variant="secondary">Top Right</Button>
      </Tooltip>

      {/* Bottom group */}
      <Tooltip title="Title" description="A Tooltip Description" placement="bottomLeft">
        <Button variant="secondary">Bottom Left</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="bottomRight">
        <Button variant="secondary">Bottom Right</Button>
      </Tooltip>

      {/* Left group */}
      <Tooltip title="Title" description="A Tooltip Description" placement="leftTop">
        <Button variant="secondary">Left Top</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="leftBottom">
        <Button variant="secondary">Left Bottom</Button>
      </Tooltip>

      {/* Right group */}
      <Tooltip title="Title" description="A Tooltip Description" placement="rightTop">
        <Button variant="secondary">Right Top</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip title="Title" description="A Tooltip Description" placement="rightBottom">
        <Button variant="secondary">Right Bottom</Button>
      </Tooltip>
    </>
  );
}`;
