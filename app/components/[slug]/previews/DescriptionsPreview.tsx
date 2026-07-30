'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all components
// together, so importing through the package root drags every other
// component's module (including stateful ones lacking 'use client') into
// the same compile unit. Deep-importing straight at Descriptions's own file
// avoids that entirely - only this component's real files get compiled.
import { Descriptions } from 'design-system/src/components/Descriptions/Descriptions';

export default function Preview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)', maxWidth: 640 }}>
      <Descriptions
        title="Patient Information"
        items={[
          { key: 'name', label: 'Name', children: 'John Smith' },
          { key: 'dob', label: 'Date of Birth', children: '12 Jan 1985' },
          { key: 'gender', label: 'Gender', children: 'Male' },
          { key: 'blood', label: 'Blood Group', children: 'O+' },
          { key: 'diagnosis', label: 'Diagnosis', children: 'Seasonal allergy, mild', span: 2 },
        ]}
      />
      <Descriptions
        bordered
        layout="vertical"
        size="small"
        column={3}
        items={[
          { key: 'doctor', label: 'Doctor', children: 'Dr. Priya Rao' },
          { key: 'dept', label: 'Department', children: 'Cardiology' },
          { key: 'room', label: 'Room No.', children: '204' },
        ]}
      />
    </div>
  );
}

export const CODE = `import { Descriptions } from 'design-system';

export default function Example() {
  return (
    <>
      <Descriptions
        title="Patient Information"
        items={[
          { key: 'name', label: 'Name', children: 'John Smith' },
          { key: 'dob', label: 'Date of Birth', children: '12 Jan 1985' },
          { key: 'gender', label: 'Gender', children: 'Male' },
          { key: 'blood', label: 'Blood Group', children: 'O+' },
          // span: 2 makes this item occupy 2 grid columns
          { key: 'diagnosis', label: 'Diagnosis', children: 'Seasonal allergy, mild', span: 2 },
        ]}
      />

      {/* bordered + layout="vertical" (label above value) + size="small" */}
      <Descriptions
        bordered
        layout="vertical"
        size="small"
        column={3}
        items={[
          { key: 'doctor', label: 'Doctor', children: 'Dr. Priya Rao' },
          { key: 'dept', label: 'Department', children: 'Cardiology' },
          { key: 'room', label: 'Room No.', children: '204' },
        ]}
      />
    </>
  );
}`;
