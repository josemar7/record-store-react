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
    else if (action.type === actionTypes.FETCH_NATIONALITIES_START ||
        action.type === actionTypes.SAVE_NATIONALITY_START) {
        return {
            ...state,
            loading: true,
            error: undefined
        };
    }
    else if (action.type === actionTypes.FETCH_NATIONALITIES_FAILED ||
        action.type === actionTypes.SAVE_NATIONALITY_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: false
        };
    }
    else if (action.type === actionTypes.SAVE_NATIONALITY_FAILED) {
        return {
            ...state,
            loading: false,
            error: true
        };
    }
    return state;

};

export default reducer;