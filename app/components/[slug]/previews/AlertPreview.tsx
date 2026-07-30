'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Alert's own file
// avoids that entirely - only this component's real files get compiled.
import { Alert } from 'design-system/src/components/Alert/Alert';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <Alert type="warning">
        Warning message will appear here can be up-to two lines not more than that
      </Alert>
      <Alert type="error">Error message will appear here</Alert>
      <Alert type="info">
        Informative message will appear here can be up-to two lines not more than that
      </Alert>
      <Alert type="success">
        Success message will appear here can be up-to two lines not more than that
      </Alert>
      <Alert type="warning" level="secondary">
        Warning message will appear here can be up-to two lines not more than that
      </Alert>
      <Alert type="error" showIcon={false}>
        Error message will appear here, without an icon
      </Alert>
    </div>
  );
}

export const CODE = `import { Alert } from 'design-system';

export default function Example() {
  return (
    <>
      <Alert type="warning">
        Warning message will appear here can be up-to two lines not more than that
      </Alert>
      <Alert type="error">Error message will appear here</Alert>
      <Alert type="info">
        Informative message will appear here can be up-to two lines not more than that
      </Alert>
      <Alert type="success">
        Success message will appear here can be up-to two lines not more than that
      </Alert>

      {/* level="secondary" for a lower-emphasis, tinted-background treatment */}
      <Alert type="warning" level="secondary">
        Warning message will appear here can be up-to two lines not more than that
      </Alert>

      {/* showIcon={false} to omit the leading status icon */}
      <Alert type="error" showIcon={false}>
        Error message will appear here, without an icon
      </Alert>
    </>
  );
}`;
