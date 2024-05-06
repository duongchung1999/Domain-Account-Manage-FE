import React, { Component } from 'react';
import App from '../../App';
import InformationTable from '../../publicComponent/InformationTable';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});
class Computer extends Component {
    render() {
        return (
            <App 
            h1Title="Computer Information" 
            h4Title = "This Table show Computer informations of Foxlink - DN1" 
            pContent = "You can find any Computer"
            bodyTable = {
            <InformationTable 
                title="Computer Table" 
                changeTitle="Computer Information" 
                // container = {<UserTable/>}
                btnSearchID = "btn-search-computer"
                api = "/api/Computer"
                columns = {columns}
                >
                    
            </InformationTable>}>
                
            </App>
        );
    }
}

export default Computer;

const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '5%',
    },
    {
      Header: 'Computer Name',
      accessor: 'cpuName',
      width: '30%',
    },
    {
      Header: 'IP',
      accessor: 'cpuIp',
      width: '30%',
    },
    {
      Header: 'User Name',
      accessor: 'cpuDescription',
      width: '15%',
    },
    {
        Header: 'Time Update',
        accessor: 'timeUpdate',
        width: '20%',
      },
  ];