'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at PhoneNumberInput's
// own file avoids that entirely - only this component's real files get
// compiled.
import { PhoneNumberInput } from 'design-system/src/components/PhoneNumberInput/PhoneNumberInput';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <PhoneNumberInput label="Mobile Number" required placeholder="Enter here" />
      <PhoneNumberInput label="Mobile Number" required countryCode="+1" defaultValue="4155551234" />
      <PhoneNumberInput
        label="Mobile Number"
        required
        error
        helperText="Enter a valid phone number"
      />
      <PhoneNumberInput label="Mobile Number" required placeholder="Enter here" size="small" />
    </div>
  );
}

export const CODE = `import { PhoneNumberInput } from 'design-system';

export default function Example() {
  return (
    <>
      <PhoneNumberInput label="Mobile Number" required placeholder="Enter here" />
      {/* Custom country code prefix */}
      <PhoneNumberInput
        label="Mobile Number"
        required
        countryCode="+1"
        defaultValue="4155551234"
      />
      <PhoneNumberInput
        label="Mobile Number"
        required
        error
        helperText="Enter a valid phone number"
      />
      {/* Small size */}
      <PhoneNumberInput label="Mobile Number" required placeholder="Enter here" size="small" />
    </>
  );
}`;
