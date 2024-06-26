import React, { Component } from 'react';
import App from '../../App';
import InformationTable from '../../publicComponent/InformationTable';
class PrinterInfor extends Component {
    render() {
        return (
            <App 
            h1Title="Printer Information" 
            h4Title = "This Table show all Printer informations of Foxlink - DN1" 
            pContent = "You can find any Printer"
            bodyTable = {
            <InformationTable 
                title="Printer Table" 
                changeTitle="Printer Information" 
                // container = {<UserTable/>}
                btnSearchID = "btn-search-printer"
                api = "/api/Printers"
                columns = {columns}
                enableEdit = {true}
                >
                    
            </InformationTable>}>
                
            </App>
        );
    }
}

export default PrinterInfor;

const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '5%',
    },
    
    {
      Header: 'Position',
      accessor: 'department',
      width: '20%',
    },
    {
      Header: 'Printer Name',
      accessor: 'printerName',
      width: '20%',
    },
    {
      Header: 'IP',
      accessor: 'printerIp',
      width: '20%',
    },
    {
      Header: 'Time Update',
      accessor: 'timeUpdate',
      width: '20%',
    },
  ];