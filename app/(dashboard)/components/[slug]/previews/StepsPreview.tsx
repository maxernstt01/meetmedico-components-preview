'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Steps' own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Steps } from 'design-system/src/components/Steps/Steps';
import type { StepItem } from 'design-system/src/components/Steps/Steps.types';
import UserIcon from 'design-system/src/assets/icons/Primary Button/UserIcon.svg?react';
import MedicalFileIcon from 'design-system/src/assets/icons/Primary Button/MedicalFileIcon.svg?react';
import CalendarSetting02Icon from 'design-system/src/assets/icons/Primary Button/CalendarSetting02Icon.svg?react';
import CheckmarkCircle02Icon from 'design-system/src/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';

const stepsItems: StepItem[] = [
  { key: 'finished', title: 'Finished', description: 'This is a content.' },
  { key: 'in-progress', title: 'In Progress', description: 'This is a content.' },
  { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
];

const stepsIconItems: StepItem[] = [
  { key: 'login', title: 'Login', icon: UserIcon },
  { key: 'verification', title: 'Verification', icon: MedicalFileIcon },
  { key: 'pay', title: 'Pay', icon: CalendarSetting02Icon },
  { key: 'done', title: 'Done', icon: CheckmarkCircle02Icon },
];

export default function Preview() {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <Steps items={stepsItems} current={1} />

      <Steps items={stepsItems} current={1} variant="dot" />

      <Steps items={stepsIconItems} current={1} />

      <div>
        <Steps items={stepsItems} current={current} onChange={setCurrent} />
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Clickable, current: {current}</span>
      </div>
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Steps } from 'design-system';
import type { StepItem } from 'design-system';
import UserIcon from 'design-system/icons/UserIcon.svg?react';
import MedicalFileIcon from 'design-system/icons/MedicalFileIcon.svg?react';
import CalendarSetting02Icon from 'design-system/icons/CalendarSetting02Icon.svg?react';
import CheckmarkCircle02Icon from 'design-system/icons/CheckmarkCircle02Icon.svg?react';

const stepsItems: StepItem[] = [
  { key: 'finished', title: 'Finished', description: 'This is a content.' },
  { key: 'in-progress', title: 'In Progress', description: 'This is a content.' },
  { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
];

const stepsIconItems: StepItem[] = [
  { key: 'login', title: 'Login', icon: UserIcon },
  { key: 'verification', title: 'Verification', icon: MedicalFileIcon },
  { key: 'pay', title: 'Pay', icon: CalendarSetting02Icon },
  { key: 'done', title: 'Done', icon: CheckmarkCircle02Icon },
];

export default function Example() {
  const [current, setCurrent] = useState(0);

  return (
    <>
      {/* current is the 0-based index of the active step */}
      <Steps items={stepsItems} current={1} />

      {/* Compact dot variant */}
      <Steps items={stepsItems} current={1} variant="dot" />

      {/* Custom per-step icons instead of numbers */}
      <Steps items={stepsIconItems} current={1} />

      {/* Clickable: onChange fires when a non-disabled step is clicked */}
      <Steps items={stepsItems} current={current} onChange={setCurrent} />
    </>
  );
}`;
