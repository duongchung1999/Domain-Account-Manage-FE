import React, { Component } from 'react';
import App from '../../App';
import InformationTable from '../../publicComponent/InformationTable';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});

class ItAsset extends Component {
    render() {
        return (
            <App 
            h1Title="Asset Information" 
            h4Title = "This Table show Assets information of Foxlink - DN1" 
            pContent = "You can find any Asset"
            bodyTable = {
            <InformationTable 
                title="Asset Table" 
                changeTitle="Asset Information" 
                // container = {<UserTable/>}
                btnSearchID = "btn-search-Asset"
                api = "/api/ItAsset"
                columns = {columns}
                enableEdit = {true}
                >
                    
            </InformationTable>}>
                
            </App>
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