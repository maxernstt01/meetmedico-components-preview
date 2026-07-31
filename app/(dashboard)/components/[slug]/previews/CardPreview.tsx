'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at Card's own file avoids
// that entirely - only this component's real files get compiled.
import { Card } from 'design-system/src/components/Card/Card';
import { Button } from 'design-system/src/components/Button/Button';

export default function Preview() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', flexWrap: 'wrap' }}>
      <div style={{ width: 280 }}>
        <Card title="Patient Summary" extra={<Button variant="tertiary">View</Button>}>
          Outlined card (default variant).
        </Card>
      </div>
      <div style={{ width: 280 }}>
        <Card variant="elevated" title="Elevated">
          Uses a drop shadow instead of a border.
        </Card>
      </div>
      <div style={{ width: 280 }}>
        <Card
          title="Appointment"
          footer={
            <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </div>
          }
        >
          Tomorrow at 10:00 AM with Dr. Smith.
        </Card>
      </div>
      <div style={{ width: 280 }}>
        <Card hoverable onClick={() => window.alert('Card clicked')}>
          Hoverable and clickable (keyboard-accessible too).
        </Card>
      </div>
    </div>
  );
}

export const CODE = `import { Card, Button } from 'design-system';

export default function Example() {
  return (
    <>
      <Card title="Patient Summary" extra={<Button variant="tertiary">View</Button>}>
        Outlined card (default variant).
      </Card>

      {/* variant: 'outlined' (default) | 'elevated' | 'filled' */}
      <Card variant="elevated" title="Elevated">
        Uses a drop shadow instead of a border.
      </Card>

      <Card
        title="Appointment"
        footer={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </>
        }
      >
        Tomorrow at 10:00 AM with Dr. Smith.
      </Card>

      {/* hoverable + onClick makes it a real interactive element (role="button") */}
      <Card hoverable onClick={() => console.log('clicked')}>
        Hoverable and clickable.
      </Card>
    </>
  );
}`;
