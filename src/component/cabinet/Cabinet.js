import React, { Component } from 'react';
import ItAssetComponent from '../../publicComponent/itAssetComponent/ItAssetComponent';

class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowData: null,
    };
}
  selectItem = (rowData)=>{
    this.setState({ selectedRowData: rowData });
  }
    render() {
        return (
           <ItAssetComponent 
              title = "Cabinet"
              columns={columns}
              api="/api/Cabinet"
              apiImage="/api/Cabinet/updateCabinetImage"
              selectItem={this.selectItem}
              itAssetName={this.state.selectedRowData?this.state.selectedRowData.cabinetName:"Cabinet"}
              selectedRowData={this.state.selectedRowData}
              selectedImage={this.state.selectedRowData?this.state.selectedRowData.cabinetImage:null}
              />
              
        );
    }
}

export default Cabinet;
const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '10%',
    },
    {
      Header: 'Cabinet',
      accessor: 'cabinetName',
      width: '90%',
    },
  ];