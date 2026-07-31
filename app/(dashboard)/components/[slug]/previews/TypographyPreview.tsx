'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Typography's own
// file avoids that entirely - only this component's real files get compiled.
import { Typography } from 'design-system/src/components/Typography/Typography';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
      <Typography variant="display">Display</Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="body">Body text used for general paragraph content.</Typography>
      <Typography variant="label" weight="bold">
        Label text
      </Typography>
      <Typography variant="labelCaps">Label caps text</Typography>
      <Typography variant="caption" color="var(--neutral-500)">
        Caption text in a muted color
      </Typography>
      <Typography variant="body" weight="extrabold">
        Extrabold weight
      </Typography>
      <Typography variant="body" weight="bold">
        Bold weight
      </Typography>
      <Typography variant="body" weight="semibold">
        Semibold weight
      </Typography>
      <Typography variant="body" weight="medium">
        Medium weight
      </Typography>
      <Typography variant="body" weight="regular">
        Regular weight
      </Typography>
    </div>
  );
}

export const CODE = `import { Typography } from 'design-system';

export default function Example() {
  return (
    <>
      <Typography variant="display">Display</Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="body">Body text used for general paragraph content.</Typography>
      <Typography variant="label" weight="bold">
        Label text
      </Typography>
      <Typography variant="labelCaps">Label caps text</Typography>
      <Typography variant="caption" color="var(--neutral-500)">
        Caption text in a muted color
      </Typography>

      {/* weight overrides each variant's own default weight - all 5 values */}
      <Typography variant="body" weight="extrabold">Extrabold weight</Typography>
      <Typography variant="body" weight="bold">Bold weight</Typography>
      <Typography variant="body" weight="semibold">Semibold weight</Typography>
      <Typography variant="body" weight="medium">Medium weight</Typography>
      <Typography variant="body" weight="regular">Regular weight</Typography>
    </>
  );
}`;
