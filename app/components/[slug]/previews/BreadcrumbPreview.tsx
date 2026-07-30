'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Breadcrumb's own
// file avoids that entirely - only this component's real files get compiled.
import { Breadcrumb } from 'design-system/src/components/Breadcrumb/Breadcrumb';
import type { BreadcrumbItem } from 'design-system/src/components/Breadcrumb/Breadcrumb.types';
import Home02Icon from 'design-system/src/assets/icons/Primary Button/Home02Icon.svg?react';
import MedicalFileIcon from 'design-system/src/assets/icons/Primary Button/MedicalFileIcon.svg?react';

const items: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'menu1', label: 'Menu 1', href: '/menu-1' },
  { key: 'menu2', label: 'Menu 2', href: '/menu-1/menu-2' },
  { key: 'menu3', label: 'Menu 3', href: '/menu-1/menu-2/menu-3' },
  { key: 'menu4', label: 'Menu 4' },
];

const itemsWithIcons: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '/', icon: Home02Icon },
  { key: 'menu1', label: 'Menu 1', href: '/menu-1', icon: MedicalFileIcon },
  { key: 'menu2', label: 'Menu 2', href: '/menu-1/menu-2', icon: MedicalFileIcon },
  { key: 'menu3', label: 'Menu 3', href: '/menu-1/menu-2/menu-3', icon: MedicalFileIcon },
  { key: 'menu4', label: 'Menu 4', icon: MedicalFileIcon },
];

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <Breadcrumb items={items} activeColor="primary" />
      <Breadcrumb items={items} activeColor="neutral" />
      <Breadcrumb items={items} maxItems={3} />
      <Breadcrumb items={itemsWithIcons} activeColor="primary" />
      <p style={{ fontSize: 12, color: 'var(--neutral-500)', margin: 0 }}>
        Resize the browser below 768px wide to see the mobile view auto-collapse to
        "Home &gt; ... &gt; Menu 4" - no maxItems prop needed, it's CSS-driven.
      </p>
    </div>
  );
}

export const CODE = `import { Breadcrumb } from 'design-system';
import type { BreadcrumbItem } from 'design-system';
import Home02Icon from 'design-system/icons/Home02Icon';
import MedicalFileIcon from 'design-system/icons/MedicalFileIcon';

const items: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'menu1', label: 'Menu 1', href: '/menu-1' },
  { key: 'menu2', label: 'Menu 2', href: '/menu-1/menu-2' },
  { key: 'menu3', label: 'Menu 3', href: '/menu-1/menu-2/menu-3' },
  { key: 'menu4', label: 'Menu 4' },
];

// Optional leading icon per segment
const itemsWithIcons: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '/', icon: Home02Icon },
  { key: 'menu1', label: 'Menu 1', href: '/menu-1', icon: MedicalFileIcon },
  { key: 'menu4', label: 'Menu 4', icon: MedicalFileIcon },
];

export default function Example() {
  return (
    <>
      <Breadcrumb items={items} activeColor="primary" />
      <Breadcrumb items={items} activeColor="neutral" />
      {/* Collapses middle items into '...' beyond maxItems (desktop only) */}
      <Breadcrumb items={items} maxItems={3} />
      {/* Below 768px wide, ALWAYS auto-collapses to "First > ... > Active" -
          no maxItems needed, this is CSS media-query driven */}
      <Breadcrumb items={itemsWithIcons} activeColor="primary" />
    </>
  );
}`;
