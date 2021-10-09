import React, {Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import CountyService from "../services/county.service.js";

class County extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedValue: 0
        };
    }

    componentDidMount() {
        CountyService.getCounties().then(
                response => {
                    this.props.onLoadCounties(response.data.results);
                },
                error => {

                }
        );
    }

    handleChange(event) {
        this.setState({selectedValue: event.target.value});
        this.props.onSelectCounty(event.target.value)
    }

    render() {
        const {counties} = this.props;
        return (
                <div>
                    <h4 className="text-left font-weight-bold">Counties</h4>
                    <div className="form-group">
                        <select className="form-control" value={this.state.selectedValue} onChange={this.handleChange}>
                            <option value="0" disabled hidden>Select Country</option>
                            {counties.map((value,index) =>
                                        <option key={value.id} value={value.id}>{value.name}</option>
                                        )};
                        </select>
                    </div>
                </div>

                )
    }
}

const mapStateToProps = state => {
    return {
        counties: state.county.counties,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadCounties: (counties) => dispatch({type: actionTypes.LOAD_COUNTIES, counties: counties}),
        onSelectCounty: (county) => dispatch({type: actionTypes.SELECT_COUNTY, county: county}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(County);