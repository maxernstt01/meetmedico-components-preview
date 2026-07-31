'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Progress's own file
// avoids that entirely - only this component's real files get compiled.
import { Progress } from 'design-system/src/components/Progress/Progress';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
        <Progress percent={72} status="primary" label="Task Primary" />
        <Progress percent={55} status="secondary" label="Task In Progress" />
        <Progress percent={100} status="success" label="Task Completed" />
        <Progress percent={35} status="error" label="Task Failed" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)' }}>
        <Progress type="circle" percent={72} status="primary" />
        <Progress type="circle" percent={68} status="secondary" />
        <Progress type="circle" percent={100} status="success" />
        <Progress type="circle" percent={40} status="error" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', alignItems: 'center' }}>
        <Progress type="circle" size="default" percent={70} status="primary" />
        <Progress type="circle" size="small" percent={70} status="primary" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-16)' }}>
        <Progress
          type="circle"
          size="micro"
          percent={40}
          status="secondary"
          loading
          label="In Progress"
        />
        <Progress type="circle" size="micro" percent={100} status="success" label="Completed" />
        <Progress type="circle" size="micro" percent={40} status="error" label="Exception" />
      </div>
    </div>
  );
}

export const CODE = `import { Progress } from 'design-system';

export default function Example() {
  return (
    <>
      {/* Line progress with a label above the bar. status: 'primary' | 'secondary' | 'success' | 'error' */}
      <Progress percent={72} status="primary" label="Task Primary" />
      <Progress percent={55} status="secondary" label="Task In Progress" />
      <Progress percent={100} status="success" label="Task Completed" />
      <Progress percent={35} status="error" label="Task Failed" />

      {/* Circular progress */}
      <Progress type="circle" percent={72} status="primary" />
      <Progress type="circle" percent={68} status="secondary" />
      <Progress type="circle" percent={100} status="success" />
      <Progress type="circle" percent={40} status="error" />

      {/* size: 'default' (120px) | 'small' (48px) | 'micro' (20px, inline) */}
      <Progress type="circle" size="default" percent={70} status="primary" />
      <Progress type="circle" size="small" percent={70} status="primary" />

      {/* Micro circles for inline, content-level status */}
      <Progress
        type="circle"
        size="micro"
        percent={40}
        status="secondary"
        loading
        label="In Progress"
      />
      <Progress type="circle" size="micro" percent={100} status="success" label="Completed" />
      <Progress type="circle" size="micro" percent={40} status="error" label="Exception" />
    </>
  );
}`;
