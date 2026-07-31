'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Carousel's own
// file avoids that entirely - only this component's real files get compiled.
import type { CSSProperties } from 'react';
import { Carousel } from 'design-system/src/components/Carousel/Carousel';

const slideStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'var(--primary-500)',
  color: 'var(--white-900)',
  fontFamily: 'var(--font-family-type-family-primary)',
  fontSize: 24,
  fontWeight: 700,
};

function slides(count = 4) {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} style={slideStyle}>
      {i + 1}
    </div>
  ));
}

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Arrows only
        </p>
        <div style={{ maxWidth: 480 }}>
          <Carousel showArrows showDots={false}>
            {slides()}
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Dots only, positioned top
        </p>
        <div style={{ maxWidth: 480 }}>
          <Carousel showArrows={false} showDots dotPosition="top">
            {slides()}
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Arrows + dots
        </p>
        <div style={{ maxWidth: 480 }}>
          <Carousel showArrows showDots dotPosition="bottom">
            {slides()}
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>Autoplay</p>
        <div style={{ maxWidth: 480 }}>
          <Carousel autoplay autoplayInterval={2500}>
            {slides()}
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Dots only, positioned left
        </p>
        <div style={{ maxWidth: 480 }}>
          <Carousel showArrows={false} showDots dotPosition="left">
            {slides()}
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Dots only, positioned right
        </p>
        <div style={{ maxWidth: 480 }}>
          <Carousel showArrows={false} showDots dotPosition="right">
            {slides()}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export const CODE = `import type { CSSProperties } from 'react';
import { Carousel } from 'design-system';

const slideStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'var(--primary-500)',
  color: 'var(--white-900)',
  fontSize: 24,
  fontWeight: 700,
};

function slides(count = 4) {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} style={slideStyle}>
      {i + 1}
    </div>
  ));
}

export default function Example() {
  return (
    <>
      {/* Arrows only */}
      <Carousel showArrows showDots={false}>
        {slides()}
      </Carousel>

      {/* Dots only, positioned along the top edge */}
      <Carousel showArrows={false} showDots dotPosition="top">
        {slides()}
      </Carousel>

      {/* Both arrows and dots */}
      <Carousel showArrows showDots dotPosition="bottom">
        {slides()}
      </Carousel>

      {/* Autoplay, pauses on hover */}
      <Carousel autoplay autoplayInterval={2500}>
        {slides()}
      </Carousel>

      {/* dotPosition: 'top' | 'bottom' (default) | 'left' | 'right' */}
      <Carousel showArrows={false} showDots dotPosition="left">
        {slides()}
      </Carousel>
      <Carousel showArrows={false} showDots dotPosition="right">
        {slides()}
      </Carousel>
    </>
  );
}`;
