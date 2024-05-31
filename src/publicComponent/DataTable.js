import React, { Component } from 'react';
import Table from './Table';

class DataTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        changeData: false,
        selectedRowData:null,
        data: []
      };
    }
  
    componentDidMount() {
      this.fetchData();
    }
    
    componentDidUpdate(prevProps,prevState) {
      if (prevProps.searchTerm !== this.props.searchTerm) {
        this.fetchData();
      }
      if (prevProps.changeData !== this.props.changeData) {
        this.fetchData();
      }
    }
    
    fetchData = async () => {
      const newData = await this.props.fetchData(); // Gọi hàm fetchData từ props
      this.setState({ data: newData });
    }
    
  
    // fetchData = async () => {
    //   try {
    //     const url = apiUrl + this.props.api;
    //     console.log(url);
    //     const response = await apiPage.get(this.props.api); 
    //     const responseData = response.data;
    //     const newData = responseData.map((item, index) => ({ ...item, number: index + 1 }));
    //     this.setState({ data: newData });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }

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

    handleRowOnClick = rowData =>{
      const { selectedRowData } = this.props;
      selectedRowData = rowData
      this.setState({ selectedRowData: rowData });
      // console.log(rowData);
      // console.log(this.state.selectedRowData);
    }
    
  
    render() {
      const columns = this.props.columns;
      const filteredData = this.filterData();
  
    //   const { data } = this.state;
  
      return (
        <div className="table-data-container">
          <Table 
          columns={columns} 
          data={filteredData}
          // rowData={this.props.rowData} 
          toggleModal={this.props.toggleModal} 
          selectItem = {this.props.selectItem}
          setActiveCard={this.props.setActiveCard}
          />
        </div>
      );
    }
  }

export default DataTable;