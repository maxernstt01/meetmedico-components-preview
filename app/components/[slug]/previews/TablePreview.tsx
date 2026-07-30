'use client';

// MeetMedicoComponent is a plain Vite SPA library with no "use client"
// directives anywhere (it assumes everything is client-rendered). Its barrel
// files (src/index.ts -> src/components/index.ts) re-export all 44
// components together, so importing through the package root drags every
// other component's module (including stateful ones lacking 'use client')
// into the same compile unit. Deep-importing straight at Table's own file
// avoids that entirely - only this component's real files get compiled.
import { useState } from 'react';
import { Table } from 'design-system/src/components/Table/Table';
import type { TableColumn, TableRowSelection } from 'design-system/src/components/Table/Table.types';

interface DemoPerson {
  id: number;
  name: string;
  age: number;
  address: string;
}

const data: DemoPerson[] = [
  { id: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { id: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { id: 3, name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
];

const sortableColumns: TableColumn<DemoPerson>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

const selectionColumns: TableColumn<DemoPerson>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

export default function Preview() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  const rowSelection: TableRowSelection<DemoPerson> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)' }}>
      <Table columns={sortableColumns} data={data} rowKey="id" pagination={false} />

      <Table columns={selectionColumns} data={data} rowKey="id" rowSelection={rowSelection} />
    </div>
  );
}

export const CODE = `import { useState } from 'react';
import { Table } from 'design-system';
import type { TableColumn, TableRowSelection } from 'design-system';

interface DemoPerson {
  id: number;
  name: string;
  age: number;
  address: string;
}

const data: DemoPerson[] = [
  { id: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { id: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { id: 3, name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
];

// sortable: true toggles asc -> desc -> unsorted, sorted internally by the Table
const sortableColumns: TableColumn<DemoPerson>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

const selectionColumns: TableColumn<DemoPerson>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

export default function Example() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  const rowSelection: TableRowSelection<DemoPerson> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <>
      {/* pagination={false} renders every row, no pagination footer */}
      <Table columns={sortableColumns} data={data} rowKey="id" pagination={false} />

      {/* rowSelection adds a checkbox column; you own selectedRowKeys state */}
      <Table columns={selectionColumns} data={data} rowKey="id" rowSelection={rowSelection} />
    </>
  );
}`;
