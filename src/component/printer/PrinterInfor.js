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
                // container = {<UserTable/>}
                btnSearchID = "btn-search-printer"
                api = "/api/Printers"
                columns = {columns}
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
      Header: 'IP Address',
      accessor: 'printerIp',
      width: '30%',
    },
    {
      Header: 'Position',
      accessor: 'department',
      width: '20%',
    },
    {
      Header: 'Printer Name',
      accessor: 'printerName',
      width: '10%',
    },
  ];