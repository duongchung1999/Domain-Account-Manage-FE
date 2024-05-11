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

    uploadFileForm = ()=>{
        if(this.state.isOpenUploadFileForm){
            return(
                <div className='col-3'>
                    <div className='col' style={{ border: '2px dashed #cccccc', padding: '20px' }}>
                        <input type="file" onChange={this.handleFileUpload} style={{ display: 'none' }} id="fileInput" />
                        {/* Nội dung khu vực kéo thả tệp vào */}
                        Drag and drop files here, or click to select files
                    </div>
                    <Button 
                        variant="info" 
                        style={{ marginLeft: '10px' }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >Upload</Button>
                </div>
            )
        }
        else return null;
    }
    handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Xử lý tệp ở đây, ví dụ:
        this.setState({
            fileName: file.name,
            fileType: file.type
        })
        console.log('Tên tệp:', file.name);
        console.log('Loại tệp:', file.type);
        console.log('Kích thước tệp (bytes):', file.size);
        Swal.fire({
            title: `Are you want to upload ${file.name}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append('file', file);
                const getToken = localStorage.getItem("token");
                const token = JSON.parse(getToken)
            
                fetch(apiUrl+'/api/Document/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token.value, // Thêm mã thông báo truy cập của bạn vào đây
                    },
                    body: formData
                })
                .then(response => {
                    // Xử lý phản hồi từ API ở đây
                    console.log('Phản hồi từ API:', response);
                })
                .catch(error => {
                    // Xử lý lỗi ở đây
                    console.error('Lỗi:', error);
                });
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Page",
                showConfirmButton: false,
                timer: 1000
              });
            } else if (result.isDenied) {
              Swal.fire({
                position: "center",
                icon: "info",
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