'use client';

// MeetMedicoComponent is a plain Vite SPA library with zero "use client"
// directives anywhere. Its barrel files re-export all 44 components
// together, so importing through the package root drags every other
// component's module into the same Next.js server compile graph and
// breaks. Deep-importing straight at each component's own file avoids this.
//
// Special case: the "Loader" folder doesn't have a single Loader.tsx -
// it exports three independent components (Spinner, DotsLoader, Skeleton)
// from three separate files, each with props defined inline (no separate
// .types.ts file for any of them).
import { Spinner } from 'design-system/src/components/Loader/Spinner';
import { DotsLoader } from 'design-system/src/components/Loader/DotsLoader';
import { Skeleton } from 'design-system/src/components/Loader/Skeleton';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-16)' }}>
        <Spinner />
        <Spinner size={20} strokeWidth={3} />
        <DotsLoader />
        <DotsLoader size={12} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', maxWidth: 320 }}>
        <Skeleton variant="text" lines={3} />
        <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', alignItems: 'center' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={200} height={60} />
        </div>
        <Skeleton variant="rectangular" width={200} height={60} animation="wave" />
        <Skeleton variant="rectangular" width={200} height={60} animation="none" />
      </div>
    </div>
  );
}

export const CODE = `import { Spinner, DotsLoader, Skeleton } from 'design-system';

export default function Example() {
  return (
    <>
      <Spinner />
      <Spinner size={20} strokeWidth={3} />
      <DotsLoader />
      <DotsLoader size={12} />

      {/* Multi-line paragraph skeleton - the last line renders shorter */}
      <Skeleton variant="text" lines={3} />

      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={200} height={60} />

      {/* animation: 'pulse' (default) | 'wave' | 'none' */}
      <Skeleton variant="rectangular" width={200} height={60} animation="wave" />
    </>
  );
}`;
