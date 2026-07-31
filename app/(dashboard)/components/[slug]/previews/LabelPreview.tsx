'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Label's own
// file avoids that entirely - only this component's real files get compiled.
import { Label } from 'design-system/src/components/Label/Label';
import LocationIcon from 'design-system/src/assets/icons/Primary Button/Location02Icon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
        <Label variant="neutral">Neutral</Label>
        <Label variant="info">Info</Label>
        <Label variant="success">Success</Label>
        <Label variant="warning">Warning</Label>
        <Label variant="error">Error</Label>
        <Label variant="primary">Primary</Label>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
        <Label variant="neutral" icon={LocationIcon}>
          Neutral
        </Label>
        <Label variant="info" icon={LocationIcon}>
          Info
        </Label>
        <Label variant="success" icon={LocationIcon}>
          Success
        </Label>
        <Label variant="warning" icon={LocationIcon}>
          Warning
        </Label>
        <Label variant="error" icon={LocationIcon}>
          Error
        </Label>
        <Label variant="primary" icon={LocationIcon}>
          Primary
        </Label>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
        <Label variant="primaryDark">Primary Dark</Label>
        <Label variant="secondaryDark">Secondary Dark</Label>
        <Label variant="successDark">Success Dark</Label>
        <Label variant="errorDark">Error Dark</Label>
      </div>
    </div>
  );
}

export const CODE = `import { Label } from 'design-system';
import LocationIcon from 'design-system/icons/Location02Icon';

export default function Example() {
  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        <Label variant="neutral">Neutral</Label>
        <Label variant="info">Info</Label>
        <Label variant="success">Success</Label>
        <Label variant="warning">Warning</Label>
        <Label variant="error">Error</Label>
        <Label variant="primary">Primary</Label>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Label variant="neutral" icon={LocationIcon}>
          Neutral
        </Label>
        <Label variant="info" icon={LocationIcon}>
          Info
        </Label>
        <Label variant="success" icon={LocationIcon}>
          Success
        </Label>
        <Label variant="warning" icon={LocationIcon}>
          Warning
        </Label>
        <Label variant="error" icon={LocationIcon}>
          Error
        </Label>
        <Label variant="primary" icon={LocationIcon}>
          Primary
        </Label>
      </div>

      {/* Dark variants - meant for use on dark/colored backgrounds */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Label variant="primaryDark">Primary Dark</Label>
        <Label variant="secondaryDark">Secondary Dark</Label>
        <Label variant="successDark">Success Dark</Label>
        <Label variant="errorDark">Error Dark</Label>
      </div>
    </>
  );
}`;
