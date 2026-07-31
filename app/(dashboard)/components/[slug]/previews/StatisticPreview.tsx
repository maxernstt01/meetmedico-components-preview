'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Statistic's own
// file avoids that entirely - only this component's real files get compiled.
import { Statistic } from 'design-system/src/components/Statistic/Statistic';
import UserIcon from 'design-system/src/assets/icons/Primary Button/UserIcon.svg?react';
import StarIcon from 'design-system/src/assets/icons/Primary Button/StarIcon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)', flexWrap: 'wrap' }}>
        <Statistic title="Active Users" value={112893} />
        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)', flexWrap: 'wrap' }}>
        <Statistic
          title="Account Balance (CNY)"
          value={112893}
          precision={2}
          icon={StarIcon}
          iconVariant="secondary"
        />
        <Statistic title="Monthly Active Users" value={93241} suffix="users" icon={UserIcon} trend="up" />
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)', flexWrap: 'wrap' }}>
        <Statistic title="Active" value={11.28} suffix="%" trend="up" />
        <Statistic title="Yearly Loss" value={-18.7} suffix="%" trend="down" />
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-space-24)', flexWrap: 'wrap' }}>
        <Statistic title="Primary" value={42} icon={StarIcon} iconVariant="primary" />
        <Statistic title="Success" value={42} icon={StarIcon} iconVariant="success" />
        <Statistic title="Warning" value={42} icon={StarIcon} iconVariant="warning" />
        <Statistic title="Error" value={42} icon={StarIcon} iconVariant="error" />
        <Statistic title="Neutral" value={42} icon={StarIcon} iconVariant="neutral" />
      </div>

      <Statistic title="Active Users" value={112893} loading />
    </div>
  );
}

export const CODE = `import { Statistic } from 'design-system';
import UserIcon from 'design-system/icons/UserIcon.svg?react';
import StarIcon from 'design-system/icons/StarIcon.svg?react';

export default function Example() {
  return (
    <>
      <Statistic title="Active Users" value={112893} />
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />

      {/* icon + iconVariant render a colored icon badge next to the value */}
      <Statistic
        title="Account Balance (CNY)"
        value={112893}
        precision={2}
        icon={StarIcon}
        iconVariant="secondary"
      />
      <Statistic title="Monthly Active Users" value={93241} suffix="users" icon={UserIcon} trend="up" />

      {/* trend="up" | "down" colors the value and shows a direction indicator */}
      <Statistic title="Active" value={11.28} suffix="%" trend="up" />
      <Statistic title="Yearly Loss" value={-18.7} suffix="%" trend="down" />

      {/* iconVariant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' - colors the icon badge */}
      <Statistic title="Primary" value={42} icon={StarIcon} iconVariant="primary" />
      <Statistic title="Success" value={42} icon={StarIcon} iconVariant="success" />
      <Statistic title="Warning" value={42} icon={StarIcon} iconVariant="warning" />
      <Statistic title="Error" value={42} icon={StarIcon} iconVariant="error" />
      <Statistic title="Neutral" value={42} icon={StarIcon} iconVariant="neutral" />

      {/* loading renders a skeleton in place of the value */}
      <Statistic title="Active Users" value={112893} loading />
    </>
  );
}`;
