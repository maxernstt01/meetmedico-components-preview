'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at Menu's own file avoids
// that entirely - only this component's real files get compiled.
import { Menu } from 'design-system/src/components/Menu/Menu';
import { Button } from 'design-system/src/components/Button/Button';
import Settings01Icon from 'design-system/src/assets/icons/Primary Button/Settings01Icon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-24)', flexWrap: 'wrap' }}>
      <Menu
        items={[
          { key: 'edit', label: 'Edit', icon: Settings01Icon },
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'divider-1', label: '', divider: true },
          { key: 'archive', label: 'Archive', disabled: true },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />
      <Menu
        trigger={<Button variant="secondary">Actions</Button>}
        placement="bottomLeft"
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />
      <Menu
        trigger={<Button variant="secondary">Top Left</Button>}
        placement="topLeft"
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />
      <Menu
        trigger={<Button variant="secondary">Top Right</Button>}
        placement="topRight"
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />
    </div>
  );
}

export const CODE = `import { Menu } from 'design-system';

export default function Example() {
  return (
    <>
      {/* No "trigger" supplied -> renders a default three-dot kebab button */}
      <Menu
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'duplicate', label: 'Duplicate' },
          { key: 'divider-1', label: '', divider: true },
          { key: 'archive', label: 'Archive', disabled: true },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />

      {/* Custom trigger element */}
      <Menu
        trigger={<button type="button">Actions</button>}
        placement="bottomLeft"
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />

      {/* placement: 'bottomLeft' | 'bottomRight' (default) | 'topLeft' | 'topRight' */}
      <Menu
        trigger={<button type="button">Top Left</button>}
        placement="topLeft"
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />
      <Menu
        trigger={<button type="button">Top Right</button>}
        placement="topRight"
        items={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
        ]}
      />
    </>
  );
}`;
