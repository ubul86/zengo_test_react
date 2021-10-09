import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {DEFAULT_OPTIONS} from '../constants/toastr';
import * as actionTypes from '../store/actions';
import CityService from "../services/city.service.js";
import City from "./City";

class Cities extends Component {

    constructor(props) {
        super(props);        
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedCounty !== this.props.selectedCounty && this.props.selectedCounty > 0) {
            CityService.getCities(this.props.selectedCounty).then(
                    response => {
                        this.props.onLoadCities(response.data.results);
                    },
                    error => {

                    }
            );
        }
    }

    render() {
        const {selectedCounty, cities, selectedCity} = this.props;
        
        const cityUl = cities.map((value, index) =>
            <li key={value.id}>
                <City cityProp={value} />                
            </li>
        )
        let list="";
        if(selectedCounty>0 && cities.length>0){
            list=<ul>{cityUl}</ul>
        }
        else if(selectedCounty>0){            
            list="No cities in this county"
        }
        return (
                <div> 
                    <h4 className="text-left font-weight-bold">Cities</h4>
                    <div></div>
                    <div>{list}</div>
                </div>

                )
    }
}

const mapStateToProps = state => {
    return {
        selectedCounty: state.county.selectedCounty,
        selectedCity: state.city.selectedCity,
        cities: state.city.cities
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCities: (cities) => dispatch({type: actionTypes.LOAD_CITIES, cities: cities}),        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);