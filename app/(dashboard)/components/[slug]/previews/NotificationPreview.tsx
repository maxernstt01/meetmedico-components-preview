'use client';

// MeetMedicoComponent is a plain Vite SPA library with zero "use client"
// directives anywhere. Its barrel files re-export all 44 components
// together, so importing through the package root drags every other
// component's module into the same Next.js server compile graph and
// breaks. Deep-importing straight at each component's own file avoids this.
//
// Special case: "Notification" has no single Notification.tsx - it's a
// provider + hook pair (NotificationProvider wraps the tree, useNotification
// is called from inside it to actually trigger a toast).
import { NotificationProvider } from 'design-system/src/components/Notification/NotificationProvider';
import { useNotification } from 'design-system/src/components/Notification/useNotification';
import type {
  NotificationPlacement,
  NotificationType,
} from 'design-system/src/components/Notification/Notification.types';
import { Button } from 'design-system/src/components/Button/Button';

function TriggerButton({
  label,
  type,
  placement,
}: {
  label: string;
  type?: NotificationType;
  placement?: NotificationPlacement;
}) {
  const { open } = useNotification();
  return (
    <Button
      variant="primary"
      onClick={() =>
        open({
          title: 'Notification Title',
          description: 'This is the content of the notification.',
          type,
          placement,
        })
      }
    >
      {label}
    </Button>
  );
}

export default function Preview() {
  return (
    <NotificationProvider>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>
        <TriggerButton label="Default" />
        <TriggerButton label="Info" type="info" />
        <TriggerButton label="Success" type="success" />
        <TriggerButton label="Warning" type="warning" />
        <TriggerButton label="Error" type="error" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', flexWrap: 'wrap', marginTop: 'var(--spacing-space-12)' }}>
        <TriggerButton label="Placement: top" placement="top" />
        <TriggerButton label="Placement: bottom" placement="bottom" />
        <TriggerButton label="Placement: topLeft" placement="topLeft" />
        <TriggerButton label="Placement: topRight" placement="topRight" />
        <TriggerButton label="Placement: bottomLeft" placement="bottomLeft" />
        <TriggerButton label="Placement: bottomRight" placement="bottomRight" />
      </div>
    </NotificationProvider>
  );
}

export const CODE = `import { NotificationProvider, useNotification } from 'design-system';

function TriggerButton() {
  const { open } = useNotification();
  return (
    <button
      onClick={() =>
        open({
          title: 'Notification Title',
          description: 'This is the content of the notification.',
          type: 'success',
        })
      }
    >
      Show notification
    </button>
  );
}

// type: 'default' | 'info' | 'success' | 'warning' | 'error'
// placement: 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' (default: 'topRight')
function PlacementButton() {
  const { open } = useNotification();
  return (
    <button
      onClick={() =>
        open({
          title: 'Notification Title',
          description: 'This is the content of the notification.',
          type: 'info',
          placement: 'bottomLeft',
        })
      }
    >
      Show bottom-left notification
    </button>
  );
}

export default function Example() {
  return (
    <NotificationProvider>
      <TriggerButton />
      <PlacementButton />
    </NotificationProvider>
  );
}`;
