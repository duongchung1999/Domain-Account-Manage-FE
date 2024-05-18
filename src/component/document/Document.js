import React, { Component } from 'react';
import App from '../../App';
import InformationTable from '../../publicComponent/InformationTable';
import NavHeader from '../../header/NavHeader';
import MenuSide from '../../container/MenuSide';
import CardBorder from '../../publicComponent/CardBorder';
import './Document.css';
import DocumentTable  from './DocumentTable';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import  Uploader from '../../publicComponent/Uploader/Uploader'


const apiUrl = process.env.REACT_APP_API_URL;
class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuSideVisible: true,
            isOpenUploadFileForm: false,
            fileName: null
        };
    }
  
    toggleMenuSideVisibility = () => {
        this.setState(prevState => ({
            isMenuSideVisible: !prevState.isMenuSideVisible
        }));
    }
    renderButton = () =>{
        const role = localStorage.getItem("role");
        const item = JSON.parse(role)
        // console.log(item);
        if(item&&item.value){
            return <Button 
            variant="info" 
            style={{ marginLeft: '10px' }}
            onClick={this.openUploadFileForm}
            >Add</Button>
        }
        else return null;
    }
    openUploadFileForm = () =>{
        this.setState(prevState => ({
            isOpenUploadFileForm: !prevState.isOpenUploadFileForm
        }));
    }
    setParentOpenForm = (isOpen) => {
        this.setState({
            isOpenUploadFileForm: isOpen
        });
    }

    uploadFileForm = ()=>{
        if(this.state.isOpenUploadFileForm){
            return(
                <div className='col-3'>
                    <Uploader setParentOpenForm={this.setParentOpenForm}/>
                    
                </div>
            )
        }
        else return null;
    }
   
    render() {
        return (
            // <App 
            // h1Title="This function is under development!" 
            // h4Title = "This function will display some public documents and some operation instructions." 
            // pContent = "IT will be updated soon!"
            // >
                
            // </App>
            <div className="sb-nav-fixed document">
                <NavHeader toggleMenuSide={this.toggleMenuSideVisibility}/>
                <div className='UserContainer d-md-inline-block'>
                <div className='UserContainer-block'>
                    {this.state.isMenuSideVisible && <MenuSide />}
                    <div className='table-container col' id='table-container'>
                    <div className='table-container-header'>
                        <h1 className='h1-table'>Documents</h1>
                        <div className='row'>
                                <div className="col">
                                    <DocumentTable 
                                        title={"Documents Table"}
                                        button = {this.renderButton()}
                                        changeTitle="Computer Information" 
                                        // container = {<UserTable/>}
                                        btnSearchID = "btn-search-computer"
                                        api = "/api/Document"
                                        columns = {columns}
                                        enableEdit = {false}
                                        >
                                            
                                    </DocumentTable>
                                </div>
                                {this.uploadFileForm()}
                            </div>
                       
                      
                    </div>
                    
                    </div>
                
                </div>
                

                </div>
                
            </div>
        );
    }
}

export default Document;
const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '5%',
    },
    {
      Header: 'File Name',
      accessor: 'name',
      width: '60%',
    },
    
    {
      Header: 'Type',
      accessor: 'type',
      width: '35%',
    },
  ];