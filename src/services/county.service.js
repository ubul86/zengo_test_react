import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';


class CountyService{
    
    getCounties =() => {
        return axios.get(API_URL + 'counties');
    }
    
}

export default new CountyService;
