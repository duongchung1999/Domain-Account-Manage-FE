import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import { Button } from 'react-bootstrap';
// import Table from './Table';
import { useTable, useResizeColumns } from 'react-table';
const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});

class InformationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }
    handleSearchbarValue = (value) => {
        // Xử lý giá trị state ở đây
        console.log('Searchbar value:', value);
        // this.setState({ searchTerm: value });
    }
    handleSearchTerm = (value) => {
        this.setState({ searchTerm: value });
    }

    render() {
        return (
            <div>
                <div className="card border-primary">
                    <div className="card-body">
                        <h4 className="card-title">
                            <div className='me-md-2 navbar'>
                            <div>
                                <i className="fa-solid fa-table" style={{ marginRight: '10px' }}></i> 
                                {this.props.title}
                                <Button variant="primary" className={`btn-add-info ${this.props.btnAdd}`} style={{ marginLeft: '20px' }}>Add</Button>
                                <Button variant="info" style={{ marginLeft: '10px' }}>Config</Button>
                                <Button variant="danger" style={{ marginLeft: '10px' }}>Remove</Button>
                                </div>
                                <Searchbar 
                                btnID = {this.props.SearchbarId} 
                                label = {this.props.SearchbarLavel} 
                                handleSearchbarValue={this.handleSearchTerm}
                                />
                            </div>
                        </h4>
                        <DataTable 
                        api = {this.props.api} 
                        columns = {this.props.columns} 
                        searchTerm={this.state.searchTerm}
                        />
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default InformationTable;

class DataTable extends Component {
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
        const url = apiUrl + this.props.api;
        console.log(url);
        const response = await apiPage.get(this.props.api); 
        // const response = await axios.get(this.props.api); 
        // const response = await axios.get("https://localhost:44378/api/user"); 
        const responseData = response.data;
        const newData = responseData.map((item, index) => ({ ...item, number: index + 1 }));
        this.setState({ data: newData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    filterData = () => {
        const { data } = this.state;
        const { searchTerm } = this.props;
        if (!searchTerm) {
            return data;
        }
        return data.filter(item => {
            // Thực hiện lọc dữ liệu dựa trên giá trị searchTerm
            return Object.values(item).some(value => {
                return String(value).toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }
  
    render() {
      const columns = this.props.columns;
      const filteredData = this.filterData();
  
    //   const { data } = this.state;
  
      return (
        <div className="table-data-container">
          <Table columns={columns} data={filteredData} />
        </div>
      );
    }
  }

  
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