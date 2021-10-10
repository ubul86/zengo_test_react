import axios from 'axios';
import {API_URL} from '../constants/main';

class CityService {

    getCities = (county_id) => {
        return axios.get(API_URL + `cities/show-by-county-id/${county_id}`);
    }

    deleteCity = (city_id) => {
        return axios.delete(API_URL + `cities/${city_id}`);
    }

    modifyCity = (city_id, name) => {
        return axios.put(API_URL + `cities/${city_id}`, {'name': name, 'id': city_id});
    }
    
    newCity = (name,county_id) => {        
        return axios.post(API_URL + `cities`, {'name': name, 'county_id': county_id});
    }

}

export default new CityService();
