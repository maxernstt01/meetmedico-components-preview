'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Navigation's own
// file avoids that entirely - only this component's real files get compiled.
import { Navigation } from 'design-system/src/components/Navigation/Navigation';
import type { NavigationItem } from 'design-system/src/components/Navigation/Navigation.types';
import { Button } from 'design-system/src/components/Button/Button';
import Home02Icon from 'design-system/src/assets/icons/Primary Button/Home02Icon.svg?react';
import Settings01Icon from 'design-system/src/assets/icons/Primary Button/Settings01Icon.svg?react';
import UserIcon from 'design-system/src/assets/icons/Primary Button/UserIcon.svg?react';

const navHorizontalItems: NavigationItem[] = [
  { key: 'home', label: 'Home' },
  {
    key: 'professionals',
    label: 'Professionals',
    children: [
      { key: 'doctors', label: 'Doctors' },
      { key: 'interpreters', label: 'Interpreters' },
    ],
  },
  {
    key: 'health-services',
    label: 'Health Services',
    children: [
      { key: 'clinics', label: 'Clinics' },
      { key: 'pharmacies', label: 'Pharmacies' },
    ],
  },
  { key: 'events', label: 'Events' },
];

const navVerticalItems: NavigationItem[] = [
  { key: 'nav-one', label: 'Navigation One', icon: Home02Icon },
  {
    key: 'nav-two',
    label: 'Navigation Two',
    icon: Settings01Icon,
    children: [
      { key: 'nav-two-opt1', label: 'Option 1' },
      { key: 'nav-two-opt2', label: 'Option 2' },
      {
        key: 'nav-two-submenu',
        label: 'Submenu',
        children: [
          { key: 'nav-two-sub-opt1', label: 'Option 1' },
          { key: 'nav-two-sub-opt2', label: 'Option 2' },
        ],
      },
    ],
  },
  { key: 'nav-three', label: 'Navigation Three', icon: UserIcon, disabled: true },
  {
    key: 'group-more',
    label: 'More',
    type: 'group',
    children: [{ key: 'nav-four', label: 'Navigation Four' }],
  },
];

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-border-radius-8)' }}>
        <div style={{ padding: 'var(--spacing-space-16)' }}>
          <Navigation
            items={navHorizontalItems}
            mode="horizontal"
            activeKey="home"
            logo={<span style={{ fontWeight: 700 }}>MeetMedico</span>}
            logoPosition="left"
            menuAlign="center"
            actions={
              <>
                <Button variant="secondary">Register</Button>
                <Button variant="primary">Login</Button>
              </>
            }
          />
        </div>
      </div>

      <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-border-radius-8)' }}>
        <div style={{ padding: 'var(--spacing-space-16)' }}>
          <Navigation
            items={navHorizontalItems}
            mode="horizontal"
            activeKey="home"
            logo={<span style={{ fontWeight: 700 }}>MeetMedico</span>}
            logoPosition="center"
            menuAlign="end"
          />
        </div>
      </div>

      <div
        style={{
          width: 280,
          border: '1px solid var(--neutral-100)',
          borderRadius: 'var(--radius-border-radius-8)',
          padding: 'var(--spacing-space-8)',
        }}
      >
        <Navigation items={navVerticalItems} mode="vertical" defaultOpenKeys={['nav-two']} accordion />
      </div>

      <div
        style={{
          width: 280,
          border: '1px solid var(--neutral-100)',
          borderRadius: 'var(--radius-border-radius-8)',
          padding: 'var(--spacing-space-8)',
        }}
      >
        <Navigation items={navVerticalItems} mode="vertical" collapsible />
      </div>
    </div>
  );
}

export const CODE = `import { Navigation, Button } from 'design-system';
import type { NavigationItem } from 'design-system';

const navHorizontalItems: NavigationItem[] = [
  { key: 'home', label: 'Home' },
  {
    key: 'professionals',
    label: 'Professionals',
    children: [
      { key: 'doctors', label: 'Doctors' },
      { key: 'interpreters', label: 'Interpreters' },
    ],
  },
  {
    key: 'health-services',
    label: 'Health Services',
    children: [
      { key: 'clinics', label: 'Clinics' },
      { key: 'pharmacies', label: 'Pharmacies' },
    ],
  },
  { key: 'events', label: 'Events' },
];

const navVerticalItems: NavigationItem[] = [
  { key: 'nav-one', label: 'Navigation One', icon: Home02Icon },
  {
    key: 'nav-two',
    label: 'Navigation Two',
    icon: Settings01Icon,
    children: [
      { key: 'nav-two-opt1', label: 'Option 1' },
      { key: 'nav-two-opt2', label: 'Option 2' },
    ],
  },
  { key: 'nav-three', label: 'Navigation Three', icon: UserIcon, disabled: true },
  {
    key: 'group-more',
    label: 'More',
    type: 'group',
    children: [{ key: 'nav-four', label: 'Navigation Four' }],
  },
];

export default function Example() {
  return (
    <>
      {/* Horizontal — logo left, menu centered, with actions */}
      <Navigation
        items={navHorizontalItems}
        mode="horizontal"
        activeKey="home"
        logo={<span>MeetMedico</span>}
        logoPosition="left"
        menuAlign="center"
        actions={
          <>
            <Button variant="secondary">Register</Button>
            <Button variant="primary">Login</Button>
          </>
        }
      />

      {/* Horizontal — logoPosition: 'left' (default) | 'center'; menuAlign: 'start' (default) | 'center' | 'end' */}
      <Navigation
        items={navHorizontalItems}
        mode="horizontal"
        activeKey="home"
        logo={<span>MeetMedico</span>}
        logoPosition="center"
        menuAlign="end"
      />

      {/* Vertical — accordion submenu, nested levels, plus a 'group' item type */}
      <Navigation items={navVerticalItems} mode="vertical" defaultOpenKeys={['nav-two']} accordion />

      {/* Vertical — collapsible icon-only rail */}
      <Navigation items={navVerticalItems} mode="vertical" collapsible />
    </>
  );
}`;
