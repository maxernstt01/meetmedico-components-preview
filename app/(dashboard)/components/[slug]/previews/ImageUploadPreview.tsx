'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at ImageUpload's own
// file avoids that entirely - only this component's real files get compiled.
import { ImageUpload } from 'design-system/src/components/ImageUpload/ImageUpload';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <ImageUpload label="Label" required helperText="Supported file information" />
      <ImageUpload
        label="Profile Photo"
        placeholder="No file chosen"
        uploadLabel="Browse"
        helperText="PNG or JPG up to 5MB"
      />
      <ImageUpload label="Document" required error helperText="This field is required" />
      <ImageUpload label="Label" disabled helperText="Uploads are currently disabled" />
    </div>
  );
}

export const CODE = `import { ImageUpload } from 'design-system';

export default function Example() {
  return (
    <>
      <ImageUpload label="Label" required helperText="Supported file information" />

      <ImageUpload
        label="Profile Photo"
        placeholder="No file chosen"
        uploadLabel="Browse"
        helperText="PNG or JPG up to 5MB"
        onFileSelect={(file) => console.log(file)}
      />

      {/* Error state */}
      <ImageUpload label="Document" required error helperText="This field is required" />

      {/* Disabled state */}
      <ImageUpload label="Label" disabled helperText="Uploads are currently disabled" />
    </>
  );
}`;
