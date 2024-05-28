import React, { Component } from 'react';
import DataTable from '../../publicComponent/DataTable';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});
class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cabinets: [],
          selectedCabinetId: null,
          cabinetAssets: [],
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
        } catch (error) {
          console.error('Error fetching cabinet data:', error);
        }
      };
      
    handleCabinetChange = async (event) => {
        const selectedCabinetId = event.target.value;
        this.setState({ selectedCabinetId });
        console.log(selectedCabinetId)
    
        try {
          const response = await apiPage.get(`/api/CabinetAsset/GetByCabinetId?id=${selectedCabinetId}`);
          const cabinetAssets = response.data;
          console.log(cabinetAssets)
          this.setState({ cabinetAssets });
        } catch (error) {
          console.error('Error fetching cabinet assets:', error);
        }
      };
    
    fetchData = async () => {
        try {
            // const url = apiUrl + this.props.api;
            // if(this.props.api.includes("Computer") || this.props.api.includes("Printers")){
            //   await apiPage.get(this.props.api+"/UpdateIpStatus");
            // }
            const response = await apiPage.get("/api/ItAsset"); 
            const responseData = response.data;
            const newData = responseData.map((item, index) => ({ ...item, number: index + 1 }));
            return newData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
    render() {
        return (
            <div className='asset-select-container'>
                <label htmlFor='cabinet-select'>Select Cabinet</label>
                <select id='cabinet-select' name='cabinet' onChange={this.handleCabinetChange}>
                {this.state.cabinets.map((cabinet) => (
                    <option key={cabinet.id} value={cabinet.id}>
                    {cabinet.cabinetName}
                    </option>
                ))}
                </select>

                {/* <DataTable 
                        // api = "/api/ItAsset"
                        columns = {this.props.columns} 
                        // searchTerm={this.state.searchTerm}
                        // toggleModal={this.toggleModal}
                        fetchData={this.fetchData}
                        // changeData={this.state.changeData}
                        selectItem={this.props.selectItem}
                        /> */}
                
            </div>
        );
    }
}

export default SelectComponent;