import React, { useState,useEffect,Component } from 'react';
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

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('/api/user');
      const responseData = await response.json();
      const newData = responseData.map((item, index) => ({ ...item, number: index + 1 }));
      this.setState({ data: newData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    const columns = [
      {
        Header: 'No',
        accessor: 'number',
        width: '5%',
      },
      {
        Header: 'User ID',
        accessor: 'userId',
        width: '10%',
      },
      {
        Header: 'User Name',
        accessor: 'userName',
        width: '20%',
      },
      {
        Header: 'Department',
        accessor: 'department',
        width: '10%',
      },
      {
        Header: 'Email',
        accessor: 'userEmail',
        width: '30%',
      },
      {
        Header: 'Description',
        accessor: 'userDescription',
        width: '15%',
      },
    ];

    const { data } = this.state;

    return (
      <div className="table-data-container">
        <Table columns={columns} data={data} />
      </div>
    );
  }
}

export default UserTable;