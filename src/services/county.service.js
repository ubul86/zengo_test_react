import axios from 'axios';
import {API_URL} from '../constants/main';

class CountyService {

    getCounties = () => {
        return axios.get(API_URL + 'counties');
    }

}

export default new CountyService();
