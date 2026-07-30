'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at Avatar's own file
// avoids that entirely - only this component's real files get compiled.
import { Avatar } from 'design-system/src/components/Avatar/Avatar';
import UserIcon from 'design-system/src/assets/icons/Primary Button/UserIcon.svg?react';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar name="John Smith" />
        <Avatar icon={UserIcon} />
        <Avatar src="https://i.pravatar.cc/100?img=12" alt="Doctor profile photo" />
        <Avatar src="https://broken-url-example.invalid/none.png" alt="Broken image" name="Fallback User" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar name="Extra Small" size="xs" />
        <Avatar name="Small" size="sm" />
        <Avatar name="Medium" size="md" />
        <Avatar name="Large" size="lg" />
        <Avatar name="Extra Large" size="xl" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar name="Square" shape="square" />
        <Avatar name="Online" status="online" />
        <Avatar name="Busy" status="busy" />
        <Avatar name="Away" status="away" />
        <Avatar name="Offline" status="offline" />
        <Avatar name="Bordered" bordered />
      </div>
    </div>
  );
}

export const CODE = `import { Avatar } from 'design-system';
import UserIcon from 'design-system/icons/UserIcon';

export default function Example() {
  return (
    <>
      {/* Falls back to initials derived from "name", or a custom/default icon if no name */}
      <Avatar name="John Smith" />
      <Avatar icon={UserIcon} />
      <Avatar src="https://example.com/photo.jpg" alt="Doctor profile photo" />

      {/* size: 'xs' | 'sm' | 'md' (default) | 'lg' | 'xl' */}
      <Avatar name="Large" size="lg" />

      {/* shape: 'circle' (default) | 'square' */}
      <Avatar name="Square" shape="square" />

      {/* status: 'online' | 'offline' | 'busy' | 'away' */}
      <Avatar name="Online" status="online" />

      <Avatar name="Bordered" bordered />
    </>
  );
}`;
