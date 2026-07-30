'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at EmptyState's own
// file avoids that entirely - only this component's real files get compiled.
import { EmptyState } from 'design-system/src/components/EmptyState/EmptyState';
import { Button } from 'design-system/src/components/Button/Button';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ border: '1px solid var(--neutral-300)', borderRadius: 'var(--radius-border-radius-8)' }}>
        <EmptyState preset="noInternet" action={<Button variant="primary">Retry</Button>} />
      </div>

      <div style={{ border: '1px solid var(--neutral-300)', borderRadius: 'var(--radius-border-radius-8)' }}>
        <EmptyState preset="noData" action={<Button variant="primary">Retry</Button>} />
      </div>

      <div style={{ border: '1px solid var(--neutral-300)', borderRadius: 'var(--radius-border-radius-8)' }}>
        <EmptyState preset="notFound" />
      </div>

      <div style={{ border: '1px solid var(--neutral-300)', borderRadius: 'var(--radius-border-radius-8)' }}>
        <EmptyState
          preset="noData"
          title="No appointments yet"
          description="Book your first appointment to see it here."
          action={<Button variant="primary">Book Appointment</Button>}
        />
      </div>
    </div>
  );
}

export const CODE = `import { EmptyState, Button } from 'design-system';

export default function Example() {
  return (
    <>
      <EmptyState preset="noInternet" action={<Button variant="primary">Retry</Button>} />

      <EmptyState preset="noData" action={<Button variant="primary">Retry</Button>} />

      <EmptyState preset="notFound" />

      {/* preset supplies the default icon/title/description; any of title,
          description, icon, or action can be overridden individually. */}
      <EmptyState
        preset="noData"
        title="No appointments yet"
        description="Book your first appointment to see it here."
        action={<Button variant="primary">Book Appointment</Button>}
      />
    </>
  );
}`;
