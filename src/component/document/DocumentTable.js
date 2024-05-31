import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useTable, useResizeColumns } from 'react-table';
import { Navigate } from 'react-router-dom';
import Modal from '../../publicComponent/modal/Modal';
import Searchbar from '../../publicComponent/Searchbar';
import DataTable from '../../publicComponent/DataTable';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});

class DocumentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            showModal: false,
            rowData: null,
            showUpdate: true,
            changeData:false,
            user:false,
            enableEdit:true
        };
    }

    componentDidUpdate(prevProps,prevState){
      if(prevProps.changeData != this.props.changeData){
          this.setState(prevState => ({
            changeData: !prevState.changeData
        }));
      }
    }
    getWithExpiry(key) {
      const itemStr = localStorage.getItem(key)
      // Nếu không tồn tại, hoặc đã hết hạn, trả về null
      if (!itemStr) {
          return null
      }
      try{
        const item = JSON.parse(itemStr)
        const now = new Date()
        // Kiểm tra xem thời gian hết hạn đã đến chưa
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return item.value
      }
      catch {
        return null
      }
      
  }
    componentDidMount(){
      // let token = localStorage.getItem("token");
      let token = this.getWithExpiry("token");
      let name = this.getWithExpiry("name");
      let role = this.getWithExpiry("role");
      if (token) {
      
          this.setState({ user: true });
      }
     
    }
    handleSearchbarValue = (value) => {
        // Xử lý giá trị state ở đây
        console.log('Searchbar value:', value);
        // this.setState({ searchTerm: value });
    }
    handleSearchTerm = (value) => {
        this.setState({ searchTerm: value });
    }
    toggleChangeData = () => {
      console.log("change");
      this.setState(prevState => ({ 
        changeData: !prevState.changeData
      }));
      // console.log(rowData);
    }

    toggleModal = (rowData) => {
      if(this.props.enableEdit){
        this.setState(prevState => ({ 
          showModal: !prevState.showModal ,
          rowData: rowData
        }));
      }
    }

    

    fetchData = async () => {
      try {
          // const url = apiUrl + this.props.api;
          // if(this.props.api.includes("Computer") || this.props.api.includes("Printers")){
          //   await apiPage.get(this.props.api+"/UpdateIpStatus");
          // }
          const response = await apiPage.get(this.props.api); 
          const responseData = response.data;
          const newData = responseData.map((item, index) => ({ ...item, number: index + 1 }));
          return newData;
      } catch (error) {
          console.error('Error fetching data:', error);
          return [];
      }
  }

  renderSearchForm = () =>{
    // console.log(this.props.showSearch)
    if(this.props.showSearch != false){
      return (
        <div className="me-md-2 navbar">
        <div >
            <i className="fa-solid fa-table" style={{ marginRight: '10px' }}></i> 
            {this.props.title}
            {this.props.button}
            {this.props.enableEdit && (<Button 
            variant="primary" 
            className={`btn-show-modal ${this.props.btnAdd}`} 
            style={{ marginLeft: '20px' }}
            onClick={this.toggleModal} >
              Add
            </Button>)}
            
            </div>
            <Searchbar 
            btnID = {this.props.SearchbarId} 
            label = {this.props.SearchbarLavel} 
            handleSearchbarValue={this.handleSearchTerm}
            />
        </div>
      )
    }
  }

    render() {
      const { showModal,rowData,user  } = this.state;
      const {enableEdit} = this.props;
        return (
            <div>
                <div className="card border-primary">
                {/* {user && (<Navigate to="/home" replace={true} />)} */}
                    <div className="card-body">
                        <h4 className="card-title">
                         {this.renderSearchForm()}
                        </h4>
                        <DataTable 
                        api = {this.props.api} 
                        columns = {this.props.columns} 
                        searchTerm={this.state.searchTerm}
                        toggleModal={this.toggleModal}
                        fetchData={this.fetchData}
                        changeData={this.state.changeData}
                        selectItem={this.props.selectItem}
                        setActiveCard={this.props.setActiveCard}
                        />
                    </div>
                </div>
                <br></br>
                <Modal 
                // uploadNameApi = {this.props.uploadNameApi}
                api = {this.props.api} 
                columns={this.props.columns}
                title={this.props.changeTitle}
                showModal={showModal}
                toggleModal={this.toggleModal}
                defaultValue={rowData}
                fetchData={this.fetchData}
                toggleChangeData={this.toggleChangeData}
                // defaultValue={rowData ? rowData[this.props.columns[0].accessor] : null}
                />
            </div>
        );
    }
}

export default DocumentTable;