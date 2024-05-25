import React, { Component } from 'react';
import ItAssetComponent from '../../publicComponent/itAssetComponent/ItAssetComponent';


class ItAsset extends Component {
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
              title = "IT Asset"
              columns={columns}
              api="/api/ItAsset"
              apiImage="/api/ItAsset/updateAssetImage"
              selectItem={this.selectItem}
              itAssetName={this.state.selectedRowData?this.state.selectedRowData.asset:"Asset"}
              selectedRowData={this.state.selectedRowData}
              selectedImage={this.state.selectedRowData?this.state.selectedRowData.assetImage:null}
              />
              
        );
    }
}

export default ItAsset;


const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '10%',
    },
    {
      Header: 'Asset',
      accessor: 'asset',
      width: '90%',
    },
  ];