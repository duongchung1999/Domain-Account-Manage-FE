import React, { useState,useEffect  } from 'react';
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
    // {
    //   Header: 'Number',
    //   accessor: 'number', // Tên trường dữ liệu trong object data
    // },
    {
      Header: 'User ID',
      accessor: 'userId',
      width: '10%',
    },
    {
      Header: 'User Name',
      accessor: 'userName',
      width: '30%',
    },
    {
      Header: 'Department',
      accessor: 'department',
      width: '30%',
    },
    {
      Header: 'Description',
      accessor: 'userDescription',
      width: '30%',
    },
  ];

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        // console.log(response);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const generateNumbers = () => {
      const numbers = [];
      for (let i = 1; i <= 1000; i++) {
        numbers.push({ number: i });
      }
      return numbers;
    };

    fetchData();
    setData(generateNumbers());
  }, []);






  
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
