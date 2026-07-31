'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at AppFooter's own
// file avoids that entirely - only this component's real files get compiled.
import { AppFooter } from 'design-system/src/components/AppFooter/AppFooter';
import type { AppFooterItem } from 'design-system/src/components/AppFooter/AppFooter.types';
import Home02Icon from 'design-system/src/assets/icons/Primary Button/Home02Icon.svg?react';
import MedicalFileIcon from 'design-system/src/assets/icons/Primary Button/MedicalFileIcon.svg?react';
import CalendarSetting02Icon from 'design-system/src/assets/icons/Primary Button/CalendarSetting02Icon.svg?react';
import Settings01Icon from 'design-system/src/assets/icons/Primary Button/Settings01Icon.svg?react';
import UserIcon from 'design-system/src/assets/icons/Primary Button/UserIcon.svg?react';

const items: AppFooterItem[] = [
  { value: 'home', label: 'Home', icon: Home02Icon },
  { value: 'records', label: 'My Records', icon: MedicalFileIcon },
  { value: 'events', label: 'Events', icon: CalendarSetting02Icon },
  { value: 'settings', label: 'Settings', icon: Settings01Icon },
  { value: 'profile', label: 'Profile', icon: UserIcon },
];

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
        <AppFooter items={items} defaultValue="home" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--neutral-500)' }}>
          Without the home-indicator bar
        </p>
        <div style={{ maxWidth: 360, border: '1px solid var(--neutral-100)' }}>
          <AppFooter items={items} defaultValue="records" showHomeIndicator={false} />
        </div>
      </div>
    </div>
  );
}

export const CODE = `import { AppFooter } from 'design-system';
import type { AppFooterItem } from 'design-system';
import Home02Icon from 'design-system/icons/Home02Icon.svg?react';
import MedicalFileIcon from 'design-system/icons/MedicalFileIcon.svg?react';
import CalendarSetting02Icon from 'design-system/icons/CalendarSetting02Icon.svg?react';
import Settings01Icon from 'design-system/icons/Settings01Icon.svg?react';
import UserIcon from 'design-system/icons/UserIcon.svg?react';

const items: AppFooterItem[] = [
  { value: 'home', label: 'Home', icon: Home02Icon },
  { value: 'records', label: 'My Records', icon: MedicalFileIcon },
  { value: 'events', label: 'Events', icon: CalendarSetting02Icon },
  { value: 'settings', label: 'Settings', icon: Settings01Icon },
  { value: 'profile', label: 'Profile', icon: UserIcon },
];

export default function Example() {
  return (
    <>
      <AppFooter items={items} defaultValue="home" />

      {/* showHomeIndicator={false} hides the decorative home-indicator bar */}
      <AppFooter items={items} defaultValue="records" showHomeIndicator={false} />
    </>
  );
}`;
