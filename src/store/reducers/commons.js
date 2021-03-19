import * as actionTypes from '../actions/actionTypes';

const initialState = {
    styles: [],
    nationalities: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STYLES:
            return {
                ...state,
                styles: action.styles,
                loading: false
            };      
        case actionTypes.FETCH_STYLES_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_STYLES_FAILED:
            return {
                ...state,
                loading: false
            };
            case actionTypes.SET_NATIONALITIES:
                return {
                    ...state,
                    nationalities: action.nationalities,
                    loading: false
                };      
            case actionTypes.FETCH_NATIONALITIES_START:
                return {
                    ...state,
                    loading: true
                };
            case actionTypes.FETCH_NATIONALITIES_FAILED:
                return {
                    ...state,
                    loading: false
                };    
    }
    return state;

};

export default reducer;