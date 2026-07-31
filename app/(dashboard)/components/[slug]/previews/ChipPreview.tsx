'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Chip's own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Chip } from 'design-system/src/components/Chip/Chip';
import ArrowDown01Icon from 'design-system/src/assets/icons/Primary Button/ArrowDown01Icon.svg?react';

export default function Preview() {
  const [selected, setSelected] = useState(true);
  const [toggled, setToggled] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
        <Chip>Default</Chip>
        <Chip icon={ArrowDown01Icon}>Default</Chip>
        <Chip disabled>Disabled</Chip>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
        <Chip onClick={() => {}}>Normal (hover me)</Chip>
        {selected ? (
          <Chip selected onClick={() => {}} onRemove={() => setSelected(false)}>
            Selected
          </Chip>
        ) : (
          <Chip onClick={() => setSelected(true)}>Click to select</Chip>
        )}
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
        <Chip selected={toggled} onClick={() => setToggled((prev) => !prev)} onRemove={() => setToggled(false)}>
          {toggled ? 'Selected' : 'Default / Hover / Click me'}
        </Chip>
      </div>
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Chip } from 'design-system';
import ArrowDown01Icon from './icons/ArrowDown01Icon.svg?react';

export default function Example() {
  const [selected, setSelected] = useState(true);
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <Chip>Default</Chip>
      <Chip icon={ArrowDown01Icon}>Default</Chip>
      <Chip disabled>Disabled</Chip>

      <Chip onClick={() => {}}>Normal (hover me)</Chip>
      {selected ? (
        <Chip selected onClick={() => {}} onRemove={() => setSelected(false)}>
          Selected
        </Chip>
      ) : (
        <Chip onClick={() => setSelected(true)}>Click to select</Chip>
      )}

      {/* Chip only becomes interactive when onClick is passed; the remove
          button only appears while selected. */}
      <Chip selected={toggled} onClick={() => setToggled((prev) => !prev)} onRemove={() => setToggled(false)}>
        {toggled ? 'Selected' : 'Default / Hover / Click me'}
      </Chip>
    </>
  );
}`;
