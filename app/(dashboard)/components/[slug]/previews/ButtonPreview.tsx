'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Button's own file
// avoids that entirely - only this component's real files get compiled.
import { Button } from 'design-system/src/components/Button/Button';
import { IconButton } from 'design-system/src/components/Button/IconButton';
import Location02Icon from 'design-system/src/assets/icons/Primary Button/Location02Icon.svg?react';
import Calendar04Icon from 'design-system/src/assets/icons/Primary Button/Calendar04Icon.svg?react';
import Search01Icon from 'design-system/src/assets/icons/Primary Button/Search01Icon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>
        <Button variant="primary" leftIcon={Location02Icon} rightIcon={Calendar04Icon}>
          Button Label
        </Button>
        <Button variant="primary" leftIcon={Location02Icon} rightIcon={Calendar04Icon} disabled>
          Button Label
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>
        <Button variant="secondary">View PDF</Button>
        <Button variant="tertiary">Skip To Home</Button>
        <Button variant="error">Remove</Button>
        <Button variant="success">Approve</Button>
        <Button variant="success" disabled>
          Approve
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" size="md">
          Size md (36px)
        </Button>
        <Button variant="primary" size="lg">
          Size lg (42px)
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>
        <Button variant="success">No Icon</Button>
        <Button variant="success" leftIcon={Location02Icon}>
          Left Icon
        </Button>
        <Button variant="success" rightIcon={Calendar04Icon}>
          Right Icon
        </Button>
        <Button variant="success" leftIcon={Location02Icon} rightIcon={Calendar04Icon}>
          Both Icons
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>
        <IconButton icon={Search01Icon} aria-label="Search" variant="primary" />
        <IconButton icon={Search01Icon} aria-label="Search" variant="secondary" />
        <IconButton icon={Search01Icon} aria-label="Search" variant="success" />
      </div>
      {/* alignItems: 'flex-start' matters here - a column flex container
          defaults to align-items: stretch, which would stretch the "hug"
          button to the container's full width itself (a demo-layout quirk,
          not something Button.module.css does - confirmed by measuring
          128px in App.tsx's row-direction layout vs 889px here before this
          fix, in the exact same component). */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--spacing-space-8)',
        }}
      >
        <Button variant="primary">Hug (default)</Button>
        <div style={{ width: 400, border: '1px dashed var(--neutral-300)', padding: 8 }}>
          <Button variant="primary" fullWidth>
            Full Width (fills its container)
          </Button>
        </div>
        <div style={{ width: 400, border: '1px dashed var(--neutral-300)', padding: 8 }}>
          <Button variant="tertiary" fullWidth>
            Full-width tertiary (still auto-height)
          </Button>
        </div>
      </div>
    </div>
  );
}

export const CODE = `import { Button, IconButton } from 'design-system';
import Location02Icon from 'design-system/icons/Location02Icon.svg?react';
import Calendar04Icon from 'design-system/icons/Calendar04Icon.svg?react';
import Search01Icon from 'design-system/icons/Search01Icon.svg?react';

export default function Example() {
  return (
    <>
      <Button variant="primary" leftIcon={Location02Icon} rightIcon={Calendar04Icon}>
        Button Label
      </Button>
      <Button variant="primary" leftIcon={Location02Icon} rightIcon={Calendar04Icon} disabled>
        Button Label
      </Button>

      <Button variant="secondary">View PDF</Button>
      <Button variant="tertiary">Skip To Home</Button>
      <Button variant="error">Remove</Button>
      <Button variant="success">Approve</Button>
      <Button variant="success" disabled>Approve</Button>

      {/* size: 'md' (36px, default) or 'lg' (42px) - only height changes.
          Tertiary ignores size, it's always auto-height. */}
      <Button variant="primary" size="md">Size md (36px)</Button>
      <Button variant="primary" size="lg">Size lg (42px)</Button>

      {/* leftIcon / rightIcon are both optional and independent - use
          either, both, or neither */}
      <Button variant="success">No Icon</Button>
      <Button variant="success" leftIcon={Location02Icon}>Left Icon</Button>
      <Button variant="success" rightIcon={Calendar04Icon}>Right Icon</Button>
      <Button variant="success" leftIcon={Location02Icon} rightIcon={Calendar04Icon}>
        Both Icons
      </Button>

      {/* IconButton: icon-only, requires an aria-label */}
      <IconButton icon={Search01Icon} aria-label="Search" variant="primary" />
      <IconButton icon={Search01Icon} aria-label="Search" variant="secondary" />
      <IconButton icon={Search01Icon} aria-label="Search" variant="success" />

      {/* fullWidth: stretches to fill the container. Default is hug
          (shrink-to-fit) - the button only takes as much space as its
          content needs unless fullWidth is set. */}
      <Button variant="primary">Hug (default)</Button>
      <div style={{ width: 400 }}>
        <Button variant="primary" fullWidth>Full Width (fills its container)</Button>
      </div>
    </>
  );
}`;
