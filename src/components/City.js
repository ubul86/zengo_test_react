import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {DEFAULT_OPTIONS} from '../constants/toastr';
import * as actionTypes from '../store/actions';
import CityService from "../services/city.service.js";

class City extends Component {

    constructor(props) {
        super(props);
        this.selectCity = this.selectCity.bind(this);
        this.unSelectCity = this.unSelectCity.bind(this);
        this.modifyCity = this.modifyCity.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.state = {
            inputValue: ''
        }
    }

    onChangeInput(e) {
        this.setState({
            inputValue: e.target.value
        });
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

    modifyCity(city) {
        const newValue = this.state.inputValue;
        CityService.modifyCity(city.id, newValue).then(
                response => {
                    this.props.onModifyCity(city.id, newValue);
                    toast.success('Brick successfully modified', DEFAULT_OPTIONS);
                },
                error => {
                    toast.error('Brick not modified', DEFAULT_OPTIONS);
                }
        );
    }

    render() {
        const {selectedCity, cityProp} = this.props;        
        let city = <div onClick={() => this.selectCity(cityProp)}>{cityProp.name}</div>
        if (selectedCity !== 0 && selectedCity === cityProp.id) {
            city = (
                    <div className="active">
                        <div>
                            <input type="text" value={this.state.inputValue} className="form-control"
                                   name="inputValue"                                            
                                   onChange={this.onChangeInput}/>
                        </div>
                        <div>
                            <a href={void(0)} onClick={() => this.modifyCity(cityProp)}>Save</a>
                            <a href={void(0)} onClick={() => this.deleteCity(cityProp)}>Delete</a>
                            <a href={void(0)} onClick={() => this.unSelectCity()}>Cancel</a>
                        </div>
                    </div>
                    )
        }
        return (
                <div>{city}</div>

                )
    }
}

const mapStateToProps = state => {
    return {        
        selectedCity: state.city.selectedCity,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectCity: (city) => dispatch({type: actionTypes.SELECT_CITY, city: city}),
        onDeleteCity: (cityId) => dispatch({type: actionTypes.DELETE_CITY, id: cityId}),
        onModifyCity: (cityId, newValue) => dispatch({type: actionTypes.MODIFY_CITY, id: cityId, newValue: newValue}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(City);