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
    setFileName=event =>{
        this.setState({
            fileName: event.target.value
        })
    }

    uploadFileForm = ()=>{
        if(this.state.isOpenUploadFileForm){
            return(
                <div className='col-3'>
                    <div className='file-inputFile' 
                    style={{ border: '2px dashed #cccccc' }}
                    onClick={() => document.getElementById('fileInput').click()}
                    onDrop={this.handleDrop}
                    // onDragOver={(e) => e.preventDefault()}
                    >

                        <input className='file-inputFile-select' type="file" onChange={this.handleSelectFile} style={{ display: 'none' }} id="fileInput" />
                        
                    </div>
                    <div className='fileNameInput row'>
                        <input className='col' type='text' 
                        name="fileName"
                         value={this.state.fileName} 
                         onChange={this.setFileName}
                         placeholder={"File Name"}></input>
                       
                    </div>
                    <div className='row'>
                        <Button 
                        className='col'
                            variant="warning" 
                            style={{ marginLeft: '10px' }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >Select</Button>
                        <Button 
                        className='col'
                            variant="danger" 
                            style={{ marginLeft: '10px' }}
                            onClick={this.handleFileUpload}
                        >Upload</Button>
                    </div>
                    
                </div>
            )
        }
        else return null;
    }
    handleDrop = (event) => {
        event.preventDefault();
        console.log(event);
        const file = event.dataTransfer.files[0];
        this.handleSelectFile(file);
    }
    handleSelectFile = (event) =>{
        const file = event.target.files[0];
        const fileName = file.name;
        const fileType = file.type;
        const fileExtension = fileName.split('.').pop();
        // Xử lý tệp ở đây, ví dụ:
        this.setState({
            file: file,
            fileName: fileName,
            fileType: fileType,
            fileExtension: fileExtension,
        })
        console.log('Tên tệp:', fileExtension);
        console.log('Tên tệp:', file.name);
        console.log('Loại tệp:', file.type);
        console.log('Kích thước tệp (bytes):', file.size);
    }
    handleFileUpload = (event) => {
        const file = this.state.file;
        const fileName = this.state.fileName;
        Swal.fire({
            title: `Do you want to upload ${fileName}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const formData = new FormData();
                // formData.append('name',fileName);
                formData.append('file', file);
                const getToken = localStorage.getItem("token");
                const token = JSON.parse(getToken)
            
                try{
                    const response = await fetch(apiUrl+'/api/Document/upload', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token.value,
                        },
                        body: formData
                    });
                    if (response.status === 201 || response.status === 204) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.statusText,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        console.log('Phản hồi từ API:', response);
                    } else {
                        console.error('Lỗi:', response);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.status+ " " + response.statusText,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                }
                catch (error){
                    console.error('Lỗi:', error.message);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 2000
                    });

                }
               
                
            } else if (result.isDenied) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Upload Failed!",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        
      };
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
      width: '30%',
    },
    
    {
      Header: 'Type',
      accessor: 'type',
      width: '15%',
    },
  ];