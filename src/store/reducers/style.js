import * as actionTypes from '../actions/actionTypes';

const initialState = {
    styles: [],
    loading: false
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
            loading: true
        };
    }
    else if (action.type === actionTypes.FETCH_STYLES_FAILED ||
        action.type === actionTypes.SAVE_STYLE_SUCCESS ||
        action.type === actionTypes.SAVE_STYLE_FAILED) {
        return {
            ...state,
            loading: false
        };
    }
    return state;
};

export default reducer;