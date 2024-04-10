import React, { useState } from 'react';
import { useTable, useResizeColumns } from 'react-table';
import './UserTable.css'

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
    <table className='table' {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Sử dụng Table component
const MyTableComponent = () => {
  const columns = [
    {
      Header: 'Number',
      accessor: 'number', // Tên trường dữ liệu trong object data
    },
    {
      Header: 'User ID',
      accessor: 'userID',
    },
    {
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Department',
      accessor: 'department',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
  ];

  const data = [
    { number: '1', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '2', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '3', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '4', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '5', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '6', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '7', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '8', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '9', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '10', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '11', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '12', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '13', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '14', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '15', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '16', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '17', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '18', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '19', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '20', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '21', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
    { number: '22', userID: 25, userName: 'New York' ,department:'IT',description:'Description 1'},
    { number: '23', userID: 30, userName: 'Los Angeles' ,department:'IT',description:'Description 2'},
    { number: '24', userID: 35, userName: 'Chicago',department:'IT',description:'Description 3' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.ceil(data.length / pageSize);

  const slicedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Table columns={columns} data={slicedData} />
      <div className='btn-table'>
      <button type="button" className={`btn btn-secondary${currentPage === 1 ? ' disabled' : ''}`} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button type="button" className={`btn btn-info btn-xs btn-rounded${currentPage === pageCount ? ' disabled' : ''}`} onClick={nextPage} disabled={currentPage === pageCount}>Next</button>
      </div>
    </div>
  );
};



export default MyTableComponent;
