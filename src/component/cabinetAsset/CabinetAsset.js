import React, { Component } from 'react';
import NavHeader from '../../header/NavHeader';
import MenuSide from '../../container/MenuSide';
import '../../component/document/Document.css';
import { Button } from 'react-bootstrap';
import DocumentTable from '../document/DocumentTable';
import SelectComponent from './SelectComponent';
class CabinetAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeData: false,
            isMenuSideVisible: true,
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
                                     columns = {assetColumns}/>
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
                                    >
                                        
                                </DocumentTable>
                            </div>

                            <div className='col'>
                            <DocumentTable 
                                        // title={this.props.title+" Table"}
                                        changeTitle={this.props.title+" Information" }
                                        // container = {<UserTable/>}
                                        btnSearchID = "btn-search-Cabinet"
                                        api = "/api/ItAsset"
                                        columns = {assetColumns}
                                        enableEdit = {false}
                                        selectItem = {this.selectItem}
                                        changeData = {this.state.changeData}
                                        showSearch = {false}
                                        >
                                            
                                    </DocumentTable>
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