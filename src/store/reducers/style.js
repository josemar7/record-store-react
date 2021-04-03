import * as actionTypes from '../actions/actionTypes';

const initialState = {
    styles: [],
    loading: false,
    error: undefined
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_STYLES) {
        return {
            ...state,
            styles: action.styles,
            loading: false
        };      
    }
    else if (action.type === actionTypes.FETCH_STYLES_START ||
        action.type === actionTypes.SAVE_STYLE_START) {
        return {
            ...state,
            loading: true,
            error: undefined
        };
    }
    else if (action.type === actionTypes.FETCH_STYLES_FAILED ||
        action.type === actionTypes.SAVE_STYLE_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: false
        };
    }
    else if (action.type === actionTypes.SAVE_STYLE_FAILED) {
        return {
            ...state,
            loading: false,
            error: true
        };
    }
    return state;
};

export default reducer;