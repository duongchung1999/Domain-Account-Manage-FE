import React, { Component } from 'react';
import NavHeader from '../../header/NavHeader';
import MenuSide from '../../container/MenuSide';
import '../document/Document.css';
import DocumentTable  from '../document/DocumentTable';
import { Button } from 'react-bootstrap';
import  Uploader from '../../publicComponent/Uploader/Uploader'


const apiUrl = process.env.REACT_APP_API_URL;

class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenuSideVisible: true,
        isOpenUploadFileForm:false,
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
        return (
          <div className='col-4'>
            {this.uploadForm()}
          </div>
        )
    }
    else return null;
}
uploadForm = () =>{
  return  <Uploader setParentOpenForm={this.setParentOpenForm} 
  api="/api/Cabinet/updateCabinetImage" 
  method='PUT' 
  id={this.state.selectedRowData?this.state.selectedRowData.id:null}

  />
}
renderImageAsset = ()=>{
  if(this.state.selectedRowData&&this.state.selectedRowData.cabinetImage){
    if(!this.state.isOpenUploadFileForm)
    return(<div>
            
            <img src={this.state.selectedRowData.cabinetImage} alt="Placeholder Image"/>
            <Button 
              variant="info" 
              style={{ marginLeft: '10px' }}
              onClick={this.openUploadFileForm}
              >ChangeImage</Button>
              
          </div>
      
      
    )
    
  }
  return (
    <div>
      {this.uploadForm()}
      <Button 
              variant="info" 
              style={{ marginLeft: '10px', width:'100%',display:'flex'}}
              onClick={this.openUploadFileForm}
              >Exit</Button>

    </div>
  );
}

selectItem = (rowData)=>{
  this.setState({ selectedRowData: rowData });
  console.log(rowData);
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
                    <h1 className='h1-table'>Cabinets</h1>
                    <div className='row'>
                            <div className="col">
                                <DocumentTable 
                                    title={"Cabinet Table"}
                                    button = {this.renderButton()}
                                    changeTitle="Cabinets Information" 
                                    // container = {<UserTable/>}
                                    btnSearchID = "btn-search-Cabinet"
                                    api = "/api/Cabinet"
                                    columns = {columns}
                                    enableEdit = {true}
                                    selectItem = {this.selectItem}
                                    >
                                        
                                </DocumentTable>
                            </div>

                            <div className='col-4'>
                              <div className="card border-primary">
                                <div className="card-body">
                                  <div className='view-asset-image'>
                                    <h2>Image of {this.state.selectedRowData?this.state.selectedRowData.cabinetName:"Cabinet"}</h2>

                                    {this.renderImageAsset()}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* {this.uploadFileForm()} */}
                            
                        </div>
                   
                  
                </div>
                
                </div>
            
            </div>
            

            </div>
            
        </div>
    );
}
}

export default Cabinet;
const columns = [
    {
      Header: 'No',
      accessor: 'number',
      width: '10%',
    },
    {
      Header: 'Cabinet',
      accessor: 'cabinetName',
      width: '90%',
    },
  ];