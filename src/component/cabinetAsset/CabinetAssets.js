import React, { Component } from 'react';
import NavHeader from '../../header/NavHeader';
import MenuSide from '../../container/MenuSide';
import '../../component/document/Document.css';
import { Button } from 'react-bootstrap';
import SelectComponent from './SelectComponent';
import axios from 'axios';
import ImageZoom from '../../publicComponent/imageZoom/ImageZoom';
import './cabinetAsset.css';
import FetchGetAssetById from '../../publicComponent/fetchApi/FetchApi';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});

class CabinetAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeData: false,
            isMenuSideVisible: true,
            cabinets:[],
            assets:[],
            cabinetAssets:[],
            cabinetDetails: {},
            assetDetails: {},
            setActiveCard:[],
            data: []
        };
    }
    componentDidMount() {
      this.fetchCabinetData();
    }
  
    fetchCabinetData = async () => {
      try {
        const response = await apiPage.get('/api/Cabinet');
        const cabinets = response.data;
        this.setState({ cabinets });
        const response2 = await apiPage.get('/api/ItAsset');
        const assets = response2.data;
        this.setState({ assets });
      } catch (error) {
        console.error('Error fetching cabinet data:', error);
      }
    };
    toggleMenuSideVisibility = () => {
        this.setState(prevState => ({
            isMenuSideVisible: !prevState.isMenuSideVisible
        }));
    }
    selectItem = (rowData)=>{
        this.setState({ selectedRowData: rowData });
      }
    
    filterData = () => {
        let { cabinetAssets } = this.state;
        console.log("cabinetAsset:" + cabinetAssets);
        if (!cabinetAssets) return null;
        const newData = cabinetAssets.map((item, index) => ({ ...item, number: index + 1 }));
          return newData;
    }
    handleCabinetChange = async (event) => {
        const selectedCabinetId = event.target.key;
        this.setState({ selectedCabinetId });
        const cabinetImage = event.target.value;
        this.setState({cabinetImage})
          console.log(cabinetImage);
        
    
        try {
          const response = await apiPage.get(`/api/CabinetAsset/GetByCabinetId?id=${selectedCabinetId}`);
          const cabinetAssets = response.data;
        //   console.log(cabinetAssets);
          const newData = cabinetAssets.map((item, index) => ({ ...item, number: index + 1 }));
          this.setState({ cabinetAssets:newData });
          this.fetchAssetDetails(newData);
        //   this.props.cabinetAssets = cabinetAssets;
        } catch (error) {
          console.error('Error fetching cabinet assets:', error);
        }
      };

      handleCabinetOnClick = async (cabinet) => {
        const selectedCabinetId = cabinet.id;
        this.setState({ selectedCabinetId });
        const cabinetImage = cabinet.cabinetImage;
        this.setState({cabinetImage})
          // console.log(cabinetImage);
        
    
        try {
          const response = await apiPage.get(`/api/CabinetAsset/GetByCabinetId?id=${selectedCabinetId}`);
          const cabinetAssets = response.data;
          console.log(cabinetAssets);
          const newData = cabinetAssets.map((item, index) => ({ ...item, number: index + 1 }));
          this.setState({ cabinetAssets:newData });
          this.fetchAssetDetails(newData);
        //   this.props.cabinetAssets = cabinetAssets;
        } catch (error) {
          console.error('Error fetching cabinet assets:', error);
        }
      };


    setActiveCard = (value)=>{
      console.log(value);
      // if(value)
      // this.setState({setActiveCard: value})
    }

    viewAsset = () => {
      const { assets } = this.state;
      return assets.length > 0 ? (
        <ul className='view_cabinetAsset_ul'>
          {assets.map(asset => (
            <li key={asset.id}>{asset.asset}
              <i class="fa-solid fa-arrows-up-down-left-right"></i>
            </li>
          ))}
        </ul>
      ) : <p>No assets available.</p>;
    }
    fetchAssetDetails = async (cabinetAssets) => {
      const assetDetails = {};
      const cabinetDetails = {};
      for (const cabinetAsset of cabinetAssets) {
        const response = await apiPage.get(`/api/ItAsset/${cabinetAsset.assetId}`);
        const cabinetResponse = await apiPage.get(`/api/Cabinet/${cabinetAsset.cabinetId}`);
        // console.log(cabinetResponse.data);
        assetDetails[cabinetAsset.assetId] = response.data.asset;
        cabinetDetails[cabinetAsset.cabinetId] = cabinetResponse.data.cabinetName;
      }
      this.setState({ assetDetails });
    };
  
    viewCabinetAsset = () => {
      const { cabinetAssets, assetDetails } = this.state;
      return cabinetAssets.length > 0 ? (
        <ul className='view_cabinetAsset_ul'>
          {cabinetAssets.map(cabinetAsset => (
            <li key={cabinetAsset.id}>
              {cabinetAsset.assetId} {assetDetails[cabinetAsset.assetId] || 'Loading...'}
              <i class="fa-solid fa-arrows-up-down-left-right"></i>
            </li>
          ))}
        </ul>
      ) : <p>No assets available.</p>;
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
                       

                        <div className='col-6'>
                            {/* <SelectComponent
                                    selectItem = {this.selectItem}
                                    columns = {assetColumns}
                                    handleCabinetChange = {this.handleCabinetChange}
                                    />
                           {this.state.cabinetImage?( 
                            <div className="card-body" >
                            <img 
                                src={this.state.cabinetImage}
                                alt="Placeholder Image"
                                style={{width :"100%"}}

                            />
                            
                        </div>):null} */}
                          <div className='cabinet_item_and_image'>
                            <div className='row' >
                              <div className='col-4 cabinet_sidebar'>
                                <ul className='cabinet_ul' style={{padding:'0'}}>
                                {this.state.cabinets.map((cabinet) => (
                                    <li className=''
                                    onClick={() => this.handleCabinetOnClick(cabinet)}>
                                      <a>{cabinet.cabinetName}</a>
                                    
                                    </li>
                                ))}
                                </ul>
                              </div>

                              <div className='col-8'>
                                {/* {this.state.cabinetImage?(<div className='col'>
                                <ImageZoom imgSrc={this.state.cabinetImage}/>
                                </div>):null} */}

                                {this.state.cabinetImage&& (<img className='img_cabinetView'
                                style={{width:'100%'}}
                                src={this.state.cabinetImage}/>)}

                              </div>
                            </div>
                          </div>
                            
                        </div>
                        <div className="col-6">
                          <div className='view_asset'>
                            
                            {this.viewCabinetAsset()}
                            
                          </div>
                        
                       
                        
                        </div>

                        
                            
                    </div>

                    <div className='row'>
                      <div className='col'>
                        {this.viewAsset()}
                      </div>
                    </div>
                   
                  
                </div>
                
                </div>
            
            </div>
            

            </div>
            
        </div>
        );
    }
}

export default CabinetAssets;
const assetColumns = [
   
    {
      Header: 'Asset',
      accessor: 'asset',
      width: '90%',
    },
  ];

const cabinetAssetColumns = [
  {
    Header: 'No',
    accessor: 'number',
    width: '10%',
  },
   
    {
      Header: 'Asset of Cabinet',
      accessor: 'assetId',
      width: '90%',
    },
  ];