'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at OTPInput's own
// file avoids that entirely - only this component's real files get compiled.
import { OTPInput } from 'design-system/src/components/OTPInput/OTPInput';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      <OTPInput label="Enter OTP" required />
      <OTPInput label="Enter OTP" required length={4} resendSeconds={30} />
      <OTPInput
        label="Enter OTP"
        required
        error
        helperText="The code you entered is incorrect"
      />
      <OTPInput label="Enter OTP" required size="small" />
      <OTPInput label="Enter OTP" required length={6} fullWidth />
    </div>
  );
}

export const CODE = `import { OTPInput } from 'design-system';

export default function Example() {
  return (
    <>
      <OTPInput label="Enter OTP" required />
      {/* 4-digit code with a 30s resend countdown */}
      <OTPInput label="Enter OTP" required length={4} resendSeconds={30} />
      <OTPInput
        label="Enter OTP"
        required
        error
        helperText="The code you entered is incorrect"
      />
      {/* Small size */}
      <OTPInput label="Enter OTP" required size="small" />
      {/* fullWidth - stretches the boxes to evenly fill the container */}
      <OTPInput label="Enter OTP" required length={6} fullWidth />
    </>
  );
}`;
