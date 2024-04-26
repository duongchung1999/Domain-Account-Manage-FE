import React, { Component } from 'react';
import App from '../App';
import InformationTable from '../publicComponent/InformationTable';
import { Button } from 'react-bootstrap';
import CardBorder from '../publicComponent/CardBorder';
import Modal from '../publicComponent/modal/Modal';

class UserInformation extends Component {
  
    render() {
        return (
          <div>
            <App 
              h1Title="User Account Information" 
              h4Title = "This Table show all user account informations from Domain of Foxlink - DN1 Network" 
              pContent = "You can find any user of Foxlink - DN1"
              bodyTable = {
              <InformationTable 
                  title="User Accounts Table"
                  changeTitle="User Account Information" 
                  // container = {<UserTable/>}
                  btnSearchID = "btn-search-user"
                  SearchbarLavel = "Search for user"
                  api = "/api/user"
                  columns = {columns}
                  >
                      
              </InformationTable>}>
            </App> 
            
          </div>
            
        );
    }
}

export default UserInformation;

const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '5%',
    },
    {
      Header: 'User ID',
      accessor: 'userId',
      width: '10%',
    },
    {
      Header: 'User Name',
      accessor: 'userName',
      width: '20%',
    },
    {
      Header: 'Department',
      accessor: 'department',
      width: '10%',
    },
    {
      Header: 'Email',
      accessor: 'userEmail',
      width: '30%',
    },
    {
      Header: 'Description',
      accessor: 'userDescription',
      width: '15%',
    },
  ];

