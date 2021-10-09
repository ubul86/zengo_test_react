import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {DEFAULT_OPTIONS} from '../constants/toastr';
import * as actionTypes from '../store/actions';
import CityService from "../services/city.service.js";

class Cities extends Component {

    constructor(props) {
        super(props);
        this.selectCity = this.selectCity.bind(this);
        this.unSelectCity = this.unSelectCity.bind(this);
        this.modifyCity=this.modifyCity.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.state={
            inputValue: ''
        }
    }

    onChangeInput(e) {
        this.setState({
            inputValue: e.target.value
        });        
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

    selectCity(city) {
        this.props.onSelectCity(city.id)
        this.setState({
            inputValue: city.name
        })
    }

    unSelectCity() {
        this.props.onSelectCity(0)
    }

    deleteCity(city) {
        CityService.deleteCity(city.id).then(
                    response => {
                        this.props.onDeleteCity(city.id);  
                        toast.success('Brick successfully deleted', DEFAULT_OPTIONS);
                    },
                    error => {
                        toast.error('Brick not deleted', DEFAULT_OPTIONS);
                    }
            );
    }
    
    modifyCity(city){
        const newValue=this.state.inputValue;
        CityService.modifyCity(city.id,newValue).then(
                    response => {
                        this.props.onModifyCity(city.id,newValue);       
                        toast.success('Brick successfully modified', DEFAULT_OPTIONS);
                    },
                    error => {
                        toast.error('Brick not modified', DEFAULT_OPTIONS);
                    }
            );
    }

    render() {
        const {selectedCounty, cities, selectedCity} = this.props;

        const cityUl = cities.map((value, index) =>
            <li key={value.id}>                              
            
                {selectedCity !== 0 && selectedCity === value.id ? (
                                    <div>
                                        <div>
                                            <input type="text" value={this.state.inputValue} className="form-control"
                                            name="inputValue"                                            
                                            onChange={this.onChangeInput}/>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0)" onClick={() => this.modifyCity(value)}>Mentés</a>
                                            <a href="javascript:void(0)" onClick={() => this.deleteCity(value)}>Törlés</a>
                                            <a href="javascript:void(0)" onClick={() => this.unSelectCity()}>Mégsem</a>
                                        </div>
                                    </div>

                            ) : (
                                    <div onClick={() => this.selectCity(value)}>{value.name}</div>
                            )}  
            
            </li>
        )

        return (
                <div> 
                    <h4 class="text-left font-weight-bold">Cities</h4>
                    <ul>   
                        {cityUl}                        
                    </ul>
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
        onSelectCity: (city) => dispatch({type: actionTypes.SELECT_CITY, city: city}),
        onDeleteCity: (cityId) => dispatch({type: actionTypes.DELETE_CITY, id: cityId}),
        onModifyCity: (cityId,newValue) => dispatch({type: actionTypes.MODIFY_CITY, id: cityId,newValue: newValue}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);