import React, { Component } from 'react';
import App from '../../App';
import InformationTable from '../../publicComponent/InformationTable';

class PhoneInfor extends Component {
    render() {
        return (
            <App 
            h1Title="Phone Information" 
            h4Title = "This Table show all Phone number informations of Foxlink - DN1" 
            pContent = "You can find any Phone Number"
            bodyTable = {
            <InformationTable 
                title="Phone Table" 
                changeTitle="Phone Information" 
                // container = {<UserTable/>}
                btnSearchID = "btn-search-computer"
                api = "/api/Phones"
                columns = {columns}
                enableEdit = {true}
                >
                    
            </InformationTable>}>
                
            </App>
        );
    }
}

export default PhoneInfor;
const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '5%',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
      width: '2 0%',
    },
    {
        Header: 'User',
        accessor: 'phoneUser',
        width: '15%',
    },
    
    {
      Header: 'ID',
      accessor: 'phoneUserId',
      width: '10%',
    },
    {
      Header: 'Position',
      accessor: 'phonePosition',
      width: '30%',
    },
    {
        Header: 'Department',
        accessor: 'department',
        width: '20%',
      },
  ];