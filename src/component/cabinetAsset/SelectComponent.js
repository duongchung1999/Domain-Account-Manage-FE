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
    render() {
        return (
            <div className='asset-select-container'>
                <label htmlFor='cabinet-select'>Select Cabinet</label>
                <select id='cabinet-select' name='cabinet' onChange={this.props.handleCabinetChange}>
                {this.state.cabinets.map((cabinet) => (
                    <option key={cabinet.id} value={cabinet.cabinetImage}>
                    {cabinet.cabinetName}
                    </option>
                ))}
                </select>
                
            </div>
        );
    }
}

export default SelectComponent;