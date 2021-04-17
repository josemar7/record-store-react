import * as actionTypes from '../actions/actionTypes';

const initialState = {
    formats: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_FORMATS) {
        return {
            ...state,
            formats: action.formats,
            loading: false
        };      
    }
    else if (action.type === actionTypes.FETCH_FORMATS_START ||
        action.type === actionTypes.SAVE_FORMAT_START) {
        return {
            ...state,
            loading: true,
            error: undefined
        };
    }
    else if (action.type === actionTypes.FETCH_FORMATS_FAILED ||
        action.type === actionTypes.SAVE_FORMAT_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: false
        };
    }
    else if (action.type === actionTypes.SAVE_FORMAT_FAILED) {
        return {
            ...state,
            loading: false,
            error: true
        };
    }
    return state;

};

export default reducer;