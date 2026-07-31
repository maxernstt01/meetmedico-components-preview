'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at TextArea's own
// file avoids that entirely - only this component's real files get compiled.
import { TextArea } from 'design-system/src/components/TextArea/TextArea';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 360 }}>
      <TextArea label="Label" required placeholder="Add description here" maxLength={500} />
      <TextArea
        label="Label"
        required
        placeholder="Add description here"
        helperText="Support Text"
        maxLength={500}
      />
      <TextArea
        label="Label"
        required
        defaultValue="This field is missing required detail."
        error
        helperText="This field is required"
        maxLength={500}
      />
      <TextArea label="Label" required placeholder="Add description here" maxLength={500} size="small" />
      <TextArea
        label="Label"
        placeholder="Add description here"
        maxLength={500}
        disabled
        defaultValue="This field is disabled."
      />
    </div>
  );
}

export const CODE = `import { TextArea } from 'design-system';

export default function Example() {
  return (
    <>
      <TextArea label="Label" required placeholder="Add description here" maxLength={500} />
      <TextArea
        label="Label"
        required
        placeholder="Add description here"
        helperText="Support Text"
        maxLength={500}
      />
      <TextArea
        label="Label"
        required
        defaultValue="This field is missing required detail."
        error
        helperText="This field is required"
        maxLength={500}
      />
      <TextArea label="Label" required placeholder="Add description here" maxLength={500} size="small" />
      <TextArea
        label="Label"
        placeholder="Add description here"
        maxLength={500}
        disabled
        defaultValue="This field is disabled."
      />
    </>
  );
}`;
