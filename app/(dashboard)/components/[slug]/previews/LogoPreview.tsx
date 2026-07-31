'use client';

// MeetMedicoComponent is a plain Vite SPA library with zero "use client"
// directives anywhere. Its barrel files re-export all 44 components
// together, so importing through the package root drags every other
// component's module into the same Next.js server compile graph and
// breaks. Deep-importing straight at the component's own file avoids this.
//
// Special case: Logo has no separate Logo.types.ts - LogoProps is declared
// inline in Logo.tsx itself.
import { Logo } from 'design-system/src/components/Logo/Logo';

export default function Preview() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-24)' }}>
      <Logo variant="default" />
      <Logo variant="responsive" />
    </div>
  );
}

export const CODE = `import { Logo } from 'design-system';

export default function Example() {
  return (
    <>
      <Logo variant="default" />
      <Logo variant="responsive" />
    </>
  );
}`;
