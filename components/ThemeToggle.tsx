'use client';

import { useEffect, useState } from 'react';
// Deep-imported straight at Tabs' own file (never through design-system's
// barrel) - same reasoning as every previews/*.tsx file.
import { Tabs } from 'design-system/src/components/Tabs/Tabs';

// global.css (imported once in app/layout.tsx from the real design-system
// source) already defines a full dark-mode token set under `.dark` - it just
// needs that class applied to an ancestor to activate. No new colors here,
// just wiring up what already exists.
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Tabs
      variant="segment"
      items={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ]}
      value={theme}
      onChange={(value) => setTheme(value as 'light' | 'dark')}
    />
  );
}
