import * as actionTypes from '../actions';

const initialState = {
    counties: [],
    selectedCounty: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_COUNTIES:
            return {
                ...state,
                counties: state.counties.concat(action.counties)
            }
        case actionTypes.SELECT_COUNTY:
            return {
                ...state,
                selectedCounty: state.selectedCounty = action.county
            }
        default:
            return {
                ...state
            }
    }    
};

export default reducer;