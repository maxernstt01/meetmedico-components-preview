'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Slider's own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Slider } from 'design-system/src/components/Slider/Slider';

export default function Preview() {
  const [value, setValue] = useState(40);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 60]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ maxWidth: 400 }}>
        <Slider value={value} onChange={(v) => setValue(v as number)} />
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Value: {value}</span>
      </div>

      <div style={{ maxWidth: 400 }}>
        <Slider
          range
          value={rangeValue}
          onChange={(v) => setRangeValue(v as [number, number])}
        />
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>
          Range: {rangeValue[0]} - {rangeValue[1]}
        </span>
      </div>

      <div style={{ maxWidth: 400 }}>
        <Slider
          min={0}
          max={100}
          step={null}
          defaultValue={26}
          marks={[
            { value: 0, label: '0°C' },
            { value: 26, label: '26°C' },
            { value: 37, label: '37°C' },
            { value: 100, label: '100°C' },
          ]}
        />
      </div>

      <div style={{ maxWidth: 400 }}>
        <Slider defaultValue={40} disabled />
      </div>

      <div style={{ maxWidth: 400 }}>
        <Slider defaultValue={50} tooltip={false} />
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>tooltip=false - no tooltip on drag/focus</span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)' }}>
        <Slider direction="vertical" defaultValue={40} />
        <Slider
          direction="vertical"
          range
          defaultValue={[20, 60]}
          marks={[
            { value: 0, label: '0' },
            { value: 100, label: '100' },
          ]}
        />
      </div>
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Slider } from 'design-system';

export default function Example() {
  const [value, setValue] = useState(40);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 60]);

  return (
    <>
      {/* Single-thumb, controlled */}
      <Slider value={value} onChange={(v) => setValue(v as number)} />

      {/* Dual-thumb range, controlled */}
      <Slider
        range
        value={rangeValue}
        onChange={(v) => setRangeValue(v as [number, number])}
      />

      {/* Discrete marks, step=null snaps the thumb only to marked values */}
      <Slider
        min={0}
        max={100}
        step={null}
        defaultValue={26}
        marks={[
          { value: 0, label: '0°C' },
          { value: 26, label: '26°C' },
          { value: 37, label: '37°C' },
          { value: 100, label: '100°C' },
        ]}
      />

      {/* Disabled */}
      <Slider defaultValue={40} disabled />

      {/* tooltip: false suppresses the value tooltip that otherwise appears while dragging/focused */}
      <Slider defaultValue={50} tooltip={false} />

      {/* direction: 'vertical' - the wrapper needs a fixed height */}
      <Slider direction="vertical" defaultValue={40} />
      <Slider
        direction="vertical"
        range
        defaultValue={[20, 60]}
        marks={[
          { value: 0, label: '0' },
          { value: 100, label: '100' },
        ]}
      />
    </>
  );
}`;
