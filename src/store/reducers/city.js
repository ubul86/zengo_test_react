import * as actionTypes from '../actions';

const initialState = {
    cities: [],
    selectedCity: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_CITIES:
            return {
                ...state,
                cities: state.cities = action.cities,
                selectedCity: 0
            }
        case actionTypes.SELECT_CITY:
            return {
                ...state,
                selectedCity: state.selectedCity = action.city
            }
        case actionTypes.DELETE_CITY:
            console.log(action.id);
            const updatedArray = state.cities.filter(result => result.id !== action.id);            
            return {
                ...state,
                cities: updatedArray,
                selectedCity: 0
            }
        case actionTypes.MODIFY_CITY:           
            const updatedIndex=state.cities.findIndex(x => x.id === action.id);
            state.cities[updatedIndex].name=action.newValue;
            return {
                ...state,
                cities: state.cities,
                selectedCity: 0
            }
        case actionTypes.NEW_CITY:                  
            return {
                ...state,
                cities: state.cities.concat(action.city)
            }
    }
    return state;
};

export default reducer;