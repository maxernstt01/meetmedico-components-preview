'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at AppHeader's own
// file avoids that entirely - only this component's real files get compiled.
import { AppHeader } from 'design-system/src/components/AppHeader/AppHeader';
import { Button } from 'design-system/src/components/Button/Button';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
        <AppHeader variant="main" onSearch={() => {}} />
      </div>
      <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
        <AppHeader variant="back" onBack={() => {}} label="Label" />
      </div>
      <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
        <AppHeader
          variant="back"
          onBack={() => {}}
          label="Label"
          supportingText="Supporting text"
        />
      </div>
      <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
        <AppHeader
          variant="back"
          onBack={() => {}}
          label="Label"
          action={
            <Button variant="tertiary" onClick={() => {}}>
              Skip To Home
            </Button>
          }
        />
      </div>
    </div>
  );
}

export const CODE = `import { AppHeader } from 'design-system';
import { Button } from 'design-system';

export default function Example() {
  return (
    <>
      {/* main: logo + search action */}
      <AppHeader variant="main" onSearch={() => {}} />

      {/* back: back button + label */}
      <AppHeader variant="back" onBack={() => {}} label="Label" />

      {/* back + label + supporting text */}
      <AppHeader
        variant="back"
        onBack={() => {}}
        label="Label"
        supportingText="Supporting text"
      />

      {/* back + label + custom trailing action */}
      <AppHeader
        variant="back"
        onBack={() => {}}
        label="Label"
        action={
          <Button variant="tertiary" onClick={() => {}}>
            Skip To Home
          </Button>
        }
      />
    </>
  );
}`;
