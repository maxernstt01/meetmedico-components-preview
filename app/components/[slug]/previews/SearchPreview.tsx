'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Search's own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Search } from 'design-system/src/components/Search/Search';
import type { SearchResultItem } from 'design-system/src/components/Search/Search.types';

const searchResults: SearchResultItem[] = [
  {
    id: '1',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '2',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '3',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
];

export default function Preview() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <Search placeholder="Search by Location" />
      <Search defaultValue="Token News" />
      <div style={{ maxWidth: 320 }}>
        <Search defaultValue="Token News" results={searchResults} />
      </div>
      <Search placeholder="Search name or username" value={value} onChange={setValue} />
      <Search placeholder="Search by Location" size="small" />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Search } from 'design-system';
import type { SearchResultItem } from 'design-system';

const searchResults: SearchResultItem[] = [
  {
    id: '1',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '2',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '3',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
];

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <>
      {/* Uncontrolled, plain placeholder */}
      <Search placeholder="Search by Location" />

      {/* Uncontrolled with an initial value (shows the clear button) */}
      <Search defaultValue="Token News" />

      {/* Shows a results dropdown once results are provided */}
      <Search defaultValue="Token News" results={searchResults} />

      {/* Fully controlled */}
      <Search placeholder="Search name or username" value={value} onChange={setValue} />

      {/* Small size */}
      <Search placeholder="Search by Location" size="small" />
    </>
  );
}`;
