import React, { Component } from 'react';
import App from '../../App';
import InformationTable from '../../publicComponent/InformationTable';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});

class History extends Component {
    render() {
        return (
            <App 
            h1Title="History" 
            h4Title = "This table displays the operation history" 
            pContent = "You can review the changes"
            bodyTable = {
            <InformationTable 
                title="History Table" 
                changeTitle="History Information" 
                // container = {<UserTable/>}
                btnSearchID = "btn-search-computer"
                api = "/api/ActionRecord"
                columns = {columns}
                enableEdit = {false}
                >
                    
            </InformationTable>}>
                
            </App>
        );
    }
}

export default History;

const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '5%',
    },
    {
      Header: 'Operation name',
      accessor: 'name',
      width: '20%',
    },
    
    {
      Header: 'Operator',
      accessor: 'operator',
      width: '10%',
    },
    {
      Header: 'History',
      accessor: 'message',
      width: '40%',
    },
    {
      Header: 'Date',
      accessor: 'createDate',
      width: '20%',
    },
  ];