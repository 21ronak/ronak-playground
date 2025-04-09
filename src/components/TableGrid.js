import React from 'react';

const columns = [
  { width: 50, title: 'col 1' },
  { width: 75, title: 'col 2' },
  { width: 50, title: 'col 3' },
  { width: 100, title: 'col 4' }
];

const rows = [
  {
    id: 1,
    cells: [
      { cellId: '1:1', value: 'a' },
      { cellId: '1:2', value: 'b' },
      { cellId: '1:3', value: 'c' },
      { cellId: '1:4', value: 'd' }
    ]
  },
  {
    id: 2,
    cells: [
      { cellId: '2:1', value: 'aa' },
      { cellId: '2:2', value: 'baa' },
      { cellId: '2:3', value: 'ca' },
      { cellId: '2:4', value: 'da' }
    ]
  },
  {
    id: 3,
    cells: [
      { cellId: '3:1', value: 'da' },
      { cellId: '3:2', value: 'ab' },
      { cellId: '3:3', value: 'ac' },
      { cellId: '3:4', value: 'd' }
    ]
  },
  {
    id: 4,
    cells: [
      { cellId: '4:1', value: 'dda' },
      { cellId: '4:2', value: 'db' },
      { cellId: '4:3', value: 'dc' },

    ]
  }
];

const TableGrid = () => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }} border="1">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={index}
              style={{ width: col.width, padding: '8px', textAlign: 'left' }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {row.cells.map(cell => (
              <td key={cell.cellId} style={{ padding: '8px' }}>
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableGrid;
