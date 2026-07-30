// MeetMedicoComponent imports its icons as `*.svg?react` (vite-plugin-svgr's
// convention for "give me this SVG as a React component"). next.config.mjs
// mirrors that at the webpack layer with @svgr/webpack, but TypeScript's own
// checker (both `tsc --noEmit` and `next build`'s type-check step) has no
// built-in idea what that resolves to without this ambient declaration -
// without it, every icon import here fails typecheck (TS2307), which is
// silent in `next dev` but fails a real production build.
declare module '*.svg?react' {
  import type { ComponentType, SVGProps } from 'react';
  const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
