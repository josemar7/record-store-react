import * as actionTypes from '../actions/actionTypes';

const initialState = {
    styles: [],
    loading: false,
    closeDialog: false
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_STYLES) {
        return {
            ...state,
            styles: action.styles,
            loading: false,
            closeDialog: false
        };      
    }
    else if (action.type === actionTypes.FETCH_STYLES_START ||
        action.type === actionTypes.SAVE_STYLE_START) {
        return {
            ...state,
            loading: true,
            closeDialog: false
        };
    }
    else if (action.type === actionTypes.FETCH_STYLES_FAILED ||
        action.type === actionTypes.SAVE_STYLE_SUCCESS) {
        return {
            ...state,
            loading: false,
            closeDialog: true
        };
    }
    else if (action.type === actionTypes.SAVE_STYLE_FAILED) {
        return {
            ...state,
            loading: false,
            closeDialog: false
        };
    }
    return state;
};

export default reducer;