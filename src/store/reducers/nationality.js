import * as actionTypes from '../actions/actionTypes';

const initialState = {
    styles: [],
    nationalities: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_NATIONALITIES) {
        return {
            ...state,
            nationalities: action.nationalities,
            loading: false
        };      
    }
    else if (action.type === actionTypes.FETCH_NATIONALITIES_START) {
        return {
            ...state,
            loading: true
        };
    }
    else if (action.type === actionTypes.FETCH_NATIONALITIES_FAILED) {
        return {
            ...state,
            loading: false
        };
    }
    return state;

};

export default reducer;