'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at Image's own file avoids
// that entirely - only this component's real files get compiled.
import { Image } from 'design-system/src/components/Image/Image';

export default function Preview() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-16)', flexWrap: 'wrap' }}>
      <div>
        <Image src="https://picsum.photos/200/150" alt="Sample scan" width={200} height={150} rounded="md" />
      </div>
      <div>
        <Image
          src="https://broken-url-example.invalid/none.png"
          alt="Missing scan"
          width={200}
          height={150}
          rounded="md"
        />
      </div>
      <div>
        <Image src="https://picsum.photos/200/150?2" alt="Zoomable scan" width={200} height={150} rounded="md" preview />
      </div>
      <div>
        <Image src="https://picsum.photos/150/150?3" alt="Round photo" width={100} height={100} rounded="full" />
      </div>
      <div>
        <Image src="https://picsum.photos/200/150?4" alt="Square corners" width={200} height={150} rounded="none" />
      </div>
      <div>
        <Image src="https://picsum.photos/200/150?5" alt="Small radius" width={200} height={150} rounded="sm" />
      </div>
      <div>
        <Image src="https://picsum.photos/200/150?6" alt="Large radius" width={200} height={150} rounded="lg" />
      </div>
      <div>
        <Image
          src="https://picsum.photos/300/150?7"
          alt="Contained wide image"
          width={200}
          height={150}
          rounded="md"
          fit="contain"
        />
      </div>
      <div>
        <Image
          src="https://picsum.photos/300/150?8"
          alt="Stretched to fill"
          width={200}
          height={150}
          rounded="md"
          fit="fill"
        />
      </div>
      <div>
        <Image
          src="https://picsum.photos/200/150?9"
          alt="Eagerly loaded scan"
          width={200}
          height={150}
          rounded="md"
          loading="eager"
        />
      </div>
    </div>
  );
}

export const CODE = `import { Image } from 'design-system';

export default function Example() {
  return (
    <>
      <Image src="/scan.jpg" alt="Sample scan" width={200} height={150} rounded="md" />

      {/* Falls back to a placeholder icon on load failure */}
      <Image src="/missing.jpg" alt="Missing scan" width={200} height={150} rounded="md" />

      {/* preview: clicking opens a full-screen zoomed overlay (Escape/backdrop to close) */}
      <Image src="/scan-2.jpg" alt="Zoomable scan" width={200} height={150} preview />

      {/* rounded: 'none' (default) | 'sm' | 'md' | 'lg' | 'full' */}
      <Image src="/photo.jpg" alt="Round photo" width={100} height={100} rounded="full" />
      <Image src="/photo-2.jpg" alt="Square corners" width={200} height={150} rounded="none" />
      <Image src="/photo-3.jpg" alt="Small radius" width={200} height={150} rounded="sm" />
      <Image src="/photo-4.jpg" alt="Large radius" width={200} height={150} rounded="lg" />

      {/* fit: 'cover' (default) | 'contain' | 'fill'. Maps to CSS object-fit */}
      <Image src="/wide-photo.jpg" alt="Contained wide image" width={200} height={150} fit="contain" />
      <Image src="/wide-photo-2.jpg" alt="Stretched to fill" width={200} height={150} fit="fill" />

      {/* loading: 'lazy' (default) | 'eager'. Passed straight through to <img loading> */}
      <Image src="/scan-3.jpg" alt="Eagerly loaded scan" width={200} height={150} loading="eager" />
    </>
  );
}`;
