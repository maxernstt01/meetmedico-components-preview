'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Pagination's own
// file avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Pagination } from 'design-system/src/components/Pagination/Pagination';

export default function Preview() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <Pagination
        total={102}
        current={page}
        onChange={setPage}
        boundaryCount={3}
        showTotal
        pageSize={50}
        totalItems={109}
      />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} prevNext="button" />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} prevNext="icon" />
      <Pagination total={102} defaultCurrent={1} boundaryCount={1} siblingCount={0} />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} align="center" />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} align="right" />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} size="small" />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Pagination } from 'design-system';

export default function Example() {
  const [page, setPage] = useState(1);

  return (
    <>
      {/* Controlled page with totals + a fixed page size */}
      <Pagination
        total={102}
        current={page}
        onChange={setPage}
        boundaryCount={3}
        showTotal
        pageSize={50}
        totalItems={109}
      />
      {/* Prev/Next rendered as buttons or icon-only */}
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} prevNext="button" />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} prevNext="icon" />
      {/* Compact layout for narrow screens */}
      <Pagination total={102} defaultCurrent={1} boundaryCount={1} siblingCount={0} />
      {/* align: 'left' (default) | 'center' | 'right' */}
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} align="center" />
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} align="right" />
      {/* size: 'normal' (default) | 'small' */}
      <Pagination total={102} defaultCurrent={2} boundaryCount={3} size="small" />
    </>
  );
}`;
