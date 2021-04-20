import * as actionTypes from '../actions/actionTypes';

const initialState = {
    nationalities: [],
    loading: false,
    closeDialog: false
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_NATIONALITIES) {
        return {
            ...state,
            nationalities: action.nationalities,
            loading: false,
            closeDialog: false
        };      
    }
    else if (action.type === actionTypes.FETCH_NATIONALITIES_START ||
        action.type === actionTypes.SAVE_NATIONALITY_START) {
        return {
            ...state,
            loading: true,
            closeDialog: false
        };
    }
    else if (action.type === actionTypes.FETCH_NATIONALITIES_FAILED ||
        action.type === actionTypes.SAVE_NATIONALITY_SUCCESS) {
        return {
            ...state,
            loading: false,
            closeDialog: true
        };
    }
    else if (action.type === actionTypes.SAVE_NATIONALITY_FAILED) {
        return {
            ...state,
            loading: false,
            closeDialog: false
        };
    }
    return state;

};

export default reducer;