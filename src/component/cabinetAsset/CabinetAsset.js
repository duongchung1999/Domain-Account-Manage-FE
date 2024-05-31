import React, { Component } from 'react';
import NavHeader from '../../header/NavHeader';
import MenuSide from '../../container/MenuSide';
import '../../component/document/Document.css';
import { Button } from 'react-bootstrap';
import DocumentTable from '../document/DocumentTable';
import SelectComponent from './SelectComponent';
import Table from '../../publicComponent/Table';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});
class CabinetAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeData: false,
            isMenuSideVisible: true,
            cabinetAssets:[],
            setActiveCard:[],
            data: []
        };
    }
    toggleMenuSideVisibility = () => {
        this.setState(prevState => ({
            isMenuSideVisible: !prevState.isMenuSideVisible
        }));
    }
    selectItem = (rowData)=>{
        this.setState({ selectedRowData: rowData });
      }
    
    filterData = () => {
        let { cabinetAssets } = this.state;
        console.log("cabinetAsset:" + cabinetAssets);
        if (!cabinetAssets) return null;
        const newData = cabinetAssets.map((item, index) => ({ ...item, number: index + 1 }));
          return newData;
    }
    handleCabinetChange = async (event) => {
        const selectedCabinetId = event.target.value;
        this.setState({ selectedCabinetId });
    
        try {
          const response = await apiPage.get(`/api/CabinetAsset/GetByCabinetId?id=${selectedCabinetId}`);
          const cabinetAssets = response.data;
          // console.log(cabinetAssets);
          // const newData = cabinetAssets.map((item, index) => ({ ...item, number: index + 1 }));
          this.setState({ cabinetAssets });
        //   this.props.cabinetAssets = cabinetAssets;
        } catch (error) {
          console.error('Error fetching cabinet assets:', error);
        }
      };


    setActiveCard = (value)=>{
      console.log(value);
      // if(value)
      // this.setState({setActiveCard: value})
    }
    
    render() {
        return (
            <div className="sb-nav-fixed document">
                <NavHeader toggleMenuSide={this.toggleMenuSideVisibility}/>
                <div className='UserContainer d-md-inline-block'>
                <div className='UserContainer-block'>
                    {this.state.isMenuSideVisible && <MenuSide />}
                    <div className='table-container col' id='table-container'>
                    <div className='table-container-header'>
                        <h1 className='h1-table'>{this.props.title}</h1>
                        <div className='row'>
                            <div className="col">
                                <SelectComponent
                                     selectItem = {this.selectItem}
                                     columns = {assetColumns}
                                    //  cabinetAssets = {this.state.data}
                                     handleCabinetChange = {this.handleCabinetChange}
                                     />
                                <DocumentTable 
                                    title={this.props.title+" Table"}
                                    changeTitle={" Information" }
                                    // container = {<UserTable/>}
                                    btnSearchID = "btn-search-Cabinet"
                                    api = "/api/ItAsset"
                                    columns = {assetColumns}
                                    enableEdit = {false}
                                    selectItem = {this.selectItem}
                                    changeData = {this.state.changeData}
                                    showSearch = {false}
                                    setActiveCard = {this.setActiveCard}
                                    >
                                        
                                </DocumentTable>
                            </div>

                            <div className='col'>
                                    <div className="table-data-container">
                                      {this.state.setActiveCard}
                                        <Table 
                                        columns={cabinetAssetColumns} 
                                        data={this.state.cabinetAssets}
                                        selectItem = {this.selectItem}
                                        setActiveCard = {this.setActiveCard}
                                        />
                                        </div>
                            </div>
                                
                        </div>
                       
                      
                    </div>
                    
                    </div>
                
                </div>
                
    
                </div>
                
            </div>
        );
    }
}

export default CabinetAsset;
const assetColumns = [
   
    {
      Header: 'Asset',
      accessor: 'asset',
      width: '90%',
    },
  ];

const cabinetAssetColumns = [
    
   
    {
      Header: 'Asset of Cabinet',
      accessor: 'assetId',
      width: '90%',
    },
  ];