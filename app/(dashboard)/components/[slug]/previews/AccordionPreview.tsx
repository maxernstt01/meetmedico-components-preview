'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Accordion's own
// file avoids that entirely - only this component's real files get compiled.
import { Accordion } from 'design-system/src/components/Accordion/Accordion';
import type { AccordionItem } from 'design-system/src/components/Accordion/Accordion.types';

const faqItems: AccordionItem[] = [
  {
    key: 'attend',
    title: 'Who should attend this workshop?',
    children:
      'This workshop is ideal for healthcare professionals, medical students, nursing students, interpreters, and anyone interested in learning Medical Spanish.',
  },
  { key: 'free', title: 'Is the workshop free?', children: 'Yes, the workshop is free to attend.' },
  {
    key: 'spanish',
    title: 'Do I need to know Spanish before attending?',
    children: 'No prior Spanish knowledge is required.',
  },
  {
    key: 'recorded',
    title: 'Will the workshop be recorded?',
    children: 'Yes, a recording will be shared with all registered attendees.',
    disabled: true,
  },
];

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>Borderless</p>
        <Accordion items={faqItems} variant="borderless" defaultActiveKeys={['attend']} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>Bordered</p>
        <Accordion items={faqItems} variant="bordered" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Accordion mode (only one panel open at a time)
        </p>
        <Accordion items={faqItems} variant="bordered" accordion />
      </div>
    </div>
  );
}

export const CODE = `import { Accordion } from 'design-system';
import type { AccordionItem } from 'design-system';

const faqItems: AccordionItem[] = [
  {
    key: 'attend',
    title: 'Who should attend this workshop?',
    children:
      'This workshop is ideal for healthcare professionals, medical students, nursing students, interpreters, and anyone interested in learning Medical Spanish.',
  },
  { key: 'free', title: 'Is the workshop free?', children: 'Yes, the workshop is free to attend.' },
  {
    key: 'spanish',
    title: 'Do I need to know Spanish before attending?',
    children: 'No prior Spanish knowledge is required.',
  },
  {
    key: 'recorded',
    title: 'Will the workshop be recorded?',
    children: 'Yes, a recording will be shared with all registered attendees.',
    disabled: true,
  },
];

export default function Example() {
  return (
    <>
      {/* Borderless: multiple panels can be open, one pre-expanded */}
      <Accordion items={faqItems} variant="borderless" defaultActiveKeys={['attend']} />

      {/* Bordered */}
      <Accordion items={faqItems} variant="bordered" />

      {/* Accordion mode: opening one panel closes the others */}
      <Accordion items={faqItems} variant="bordered" accordion />
    </>
  );
}`;
