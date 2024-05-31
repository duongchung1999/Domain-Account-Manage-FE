import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPage = axios.create({
  baseURL: apiUrl,
});

async function  FetchGetAssetById(id){
    try {
        const response = await apiPage.get(`/api/ItAsset/${id}`);
        const data = response.data;
        // console.log(data.asset);
        return data.asset;
        // const newData = cabinetAssets.map((item, index) => ({ ...item, number: index + 1 }));
        // this.setState({ cabinetAssets: newData });
      //   this.props.cabinetAssets = cabinetAssets;
      } catch (error) {
        console.error('Error fetching cabinet assets:', error);
        return null;
      }
}
export default FetchGetAssetById