import * as actionTypes from '../actions/actionTypes';

const initialState = {
    form: null
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_FORM) {
        return {
            ...state,
            form: action.form,
        };      
    }
    return state;
};

export default reducer;