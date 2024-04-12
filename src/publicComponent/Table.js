import React, { useState,useEffect  } from 'react';
import { useTable, useResizeColumns } from 'react-table';

const Table = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      { columns, data },
      useResizeColumns // Sử dụng plugin useResizeColumns
    );
  
    return (
      <div className='table-container'>
        <table className='table' {...getTableProps()}>
            <thead className='table-header'>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} style={{ width: column.width }}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td 
                        {...cell.getCellProps()}>{cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
      
    );
  };

  export default Table;
  