'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Header's own
// file avoids that entirely - only this component's real files get compiled.
import { Header } from 'design-system/src/components/Header/Header';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <Header
        title="Complete your profile"
        titleVariant="label"
        description="20% Completed"
        descriptionVariant="caption"
        descriptionWeight="semibold"
        descriptionColor="var(--warning-600)"
      />

      <div style={{ maxWidth: 328 }}>
        <Header
          eyebrowTags={[
            { key: 'category', label: 'Category' },
            { key: 'tag', label: 'Tag' },
            { key: 'type', label: 'Type' },
          ]}
          title="FREE WORKSHOP - Strategies to Learn Medical Spanish That Fit Your Schedule"
          titleVariant="label"
          meta={{ left: 'Pune, Maharashtra', right: 'Sep 16, 2026' }}
        />
      </div>

      <div style={{ maxWidth: 328 }}>
        <Header
          align="center"
          title="Dr. Thangavelu. S"
          description={
            <>
              MBBS,DCH,MD,DNB,MRCP(UK)
              <br />
              Mumbai, India
            </>
          }
          descriptionVariant="body"
          belowTags={[
            { key: 'en', label: 'English' },
            { key: 'kn', label: 'Kannada' },
            { key: 'hi', label: 'Hindi' },
          ]}
        />
      </div>

      <Header
        title="Account Rejected"
        titleVariant="h1"
        description="Your profile has been carefully reviewed by our team and was rejected due to a mismatch"
      />

      <div style={{ maxWidth: 780 }}>
        <Header
          title="About Dr. Prakash D Bhavle"
          titleVariant="h4"
          titleWeight="semibold"
          description="Dr. Shyam Bhairi is a skilled Orthopedic Surgeon specializing in joint replacement, robotic-assisted joint surgeries, sports medicine, and advanced trauma management."
          descriptionVariant="body"
          readMore={{ onClick: () => {} }}
        />
      </div>
    </div>
  );
}

export const CODE = `import { Header } from 'design-system';

export default function Example() {
  return (
    <>
      {/* Progress status */}
      <Header
        title="Complete your profile"
        titleVariant="label"
        description="20% Completed"
        descriptionVariant="caption"
        descriptionWeight="semibold"
        descriptionColor="var(--warning-600)"
      />

      {/* Tags + title + meta row */}
      <Header
        eyebrowTags={[
          { key: 'category', label: 'Category' },
          { key: 'tag', label: 'Tag' },
          { key: 'type', label: 'Type' },
        ]}
        title="FREE WORKSHOP - Strategies to Learn Medical Spanish That Fit Your Schedule"
        titleVariant="label"
        meta={{ left: 'Pune, Maharashtra', right: 'Sep 16, 2026' }}
      />

      {/* Centered profile with tags below */}
      <Header
        align="center"
        title="Dr. Thangavelu. S"
        description={
          <>
            MBBS,DCH,MD,DNB,MRCP(UK)
            <br />
            Mumbai, India
          </>
        }
        descriptionVariant="body"
        belowTags={[
          { key: 'en', label: 'English' },
          { key: 'kn', label: 'Kannada' },
          { key: 'hi', label: 'Hindi' },
        ]}
      />

      {/* Page title (H1) */}
      <Header
        title="Account Rejected"
        titleVariant="h1"
        description="Your profile has been carefully reviewed by our team and was rejected due to a mismatch"
      />

      {/* About section with Read More */}
      <Header
        title="About Dr. Prakash D Bhavle"
        titleVariant="h4"
        titleWeight="semibold"
        description="Dr. Shyam Bhairi is a skilled Orthopedic Surgeon specializing in joint replacement, robotic-assisted joint surgeries, sports medicine, and advanced trauma management."
        descriptionVariant="body"
        readMore={{ onClick: () => {} }}
      />
    </>
  );
}`;
