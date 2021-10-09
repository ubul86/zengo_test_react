import React, {Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import CityService from "../services/city.service.js";
import City from "./City";

class Cities extends Component {

    constructor(props) {
        super(props);  
        this.state={
            county:null
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedCounty !== this.props.selectedCounty && this.props.selectedCounty > 0) {            
            const selectedCounty=this.props.selectedCounty;            
            const county = this.props.counties.filter(result => parseInt(result.id) === parseInt(selectedCounty));   
            this.setState({
                    county: county[0]
                })
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
        const {selectedCounty, cities} = this.props;
        const {county} = this.state;        
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
        
        let countyName=null;        
        if(county!==null){
            console.log(county.name)
            countyName=(<h5>County name: {county.name}</h5>);
        }
        
        return (
                <div> 
                    <h4 className="text-left font-weight-bold">Cities</h4>
                    {countyName}
                    {list}
                </div>

                )
    }
}

const mapStateToProps = state => {
    return {
        selectedCounty: state.county.selectedCounty,
        selectedCity: state.city.selectedCity,
        cities: state.city.cities,
        counties: state.county.counties
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCities: (cities) => dispatch({type: actionTypes.LOAD_CITIES, cities: cities}),        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);