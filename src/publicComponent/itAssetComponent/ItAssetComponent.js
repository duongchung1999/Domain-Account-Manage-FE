import React, { Component } from 'react';
import NavHeader from '../../header/NavHeader';
import MenuSide from '../../container/MenuSide';
import '../../component/document/Document.css';
import DocumentTable  from '../../component/document/DocumentTable';
import { Button } from 'react-bootstrap';
import  Uploader from '../Uploader/Uploader'
import ImageZoom from '../imageZoom/ImageZoom';

const apiUrl = process.env.REACT_APP_API_URL;
class ItAssetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuSideVisible: true,
            isOpenUploadFileForm:false,
            changeData: false,
            fileName: null
        };
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.selectedRowData != this.props.selectedRowData){
            this.setState({
                selectedRowData : this.props.selectedRowData
            })
        }
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
    isFetchData = ()=>{
        this.setState(prevState => ({
            changeData: !prevState.changeData
        }));
    }
    uploadForm = () =>{
      return  <Uploader setParentOpenForm={this.setParentOpenForm} 
      api={this.props.apiImage} 
      method='PUT' 
      id={this.state.selectedRowData?this.state.selectedRowData.id:null}
      isFetchData={this.isFetchData}
    
      />
    }
    renderImageAsset = ()=>{
      if(this.state.selectedRowData&&this.props.selectedImage){
        if(!this.state.isOpenUploadFileForm)
        return(<ImageZoom imgSrc = {this.props.selectedImage}
          openUploadFileForm = {this.openUploadFileForm}/>
          
          
        )
        
      }
      return (
        <div>
          {this.uploadForm()}
          <Button 
                  className='btn-asset'
                  variant="info" 
                  style={{ width:'100%',display:'flex'}}
                  onClick={this.openUploadFileForm}
                  >Exit</Button>
    
        </div>
      );
    }
    
    selectItem = (rowData)=>{
      this.setState({ selectedRowData: rowData });
    }
    
    render() {
      
        return (
            <div className="sb-nav-fixed document">
                <NavHeader toggleMenuSide={this.toggleMenuSideVisibility}/>
                <div className='UserContainer d-md-inline-block'>
                <div className='UserContainer-block'>
                    {this.state.isMenuSideVisible && <MenuSide />}
                    <div className='table-container col' id='table-container'>
                    <div className='table-container-header'>
                        <h1 className='h1-table'>{this.props.title}</h1>
                        <div className='row'>
                                <div className="col">
                                    <DocumentTable 
                                        title={this.props.title+" Table"}
                                        changeTitle={this.props.title+" Information" }
                                        // container = {<UserTable/>}
                                        btnSearchID = "btn-search-Cabinet"
                                        api = {this.props.api}
                                        columns = {this.props.columns}
                                        enableEdit = {true}
                                        selectItem = {this.props.selectItem}
                                        changeData = {this.state.changeData}
                                        >
                                            
                                    </DocumentTable>
                                </div>
    
                                <div className='col-4'>
                                  <div className="card border-primary">
                                    <div className="card-body">
                                      <div className='view-asset-image'>
                                        <h2>{this.props.itAssetName}</h2>
    
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

export default ItAssetComponent;