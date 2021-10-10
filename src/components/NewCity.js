import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {DEFAULT_OPTIONS} from '../constants/toastr';
import * as actionTypes from '../store/actions';
import CityService from "../services/city.service.js";

class NewCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onInputSave = this.onInputSave.bind(this);
    }

    onChangeInput(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    onInputSave() {
        const name = this.state.inputValue;
        const selectedCounty = this.props.selectedCounty;
        CityService.newCity(name, selectedCounty).then(
                response => {
                    this.props.onCreateCity(response.data.results);
                    this.setState({
                        inputValue: ''
                    })
                    toast.success('City successfully added', DEFAULT_OPTIONS);
                },
                error => {
                    toast.error('City not added', DEFAULT_OPTIONS);
                }
        );
    }

    render() {
        const {selectedCounty} = this.props;
        const {inputValue} = this.state;
        let element = "";

        if (selectedCounty > 0) {
            element =
                    (<div>
                        <div>
                            <h4 className="text-left font-weight-bold">Create New City</h4>
                        </div>
                        <div className="form-group">
                            <input type="text" value={inputValue} className="form-control"
                                   name="inputValue"                                            
                                   onChange={this.onChangeInput}/>
                        </div>
                        <div className="form-group">
                            <button disabled={!inputValue} className="btn btn-block btn-success" onClick={this.onInputSave}>Mentés</button>
                        </div>
                    </div>) 
        }
        
        return (
                <div>                    
                    {element}
                </div>

                )
    }
}

const mapStateToProps = state => {
    return {
        selectedCounty: state.county.selectedCounty,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateCity: (city) => dispatch({type: actionTypes.NEW_CITY, city: city}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCity);