import * as actionTypes from '../actions/actionTypes';

const initialState = {
    artists: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ARTISTS:
            return {
                ...state,
                artists: action.artists,
                loading: false
            };
        case actionTypes.FETCH_ARTISTS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ARTISTS_FAILED:
            return {
                ...state,
                loading: false
            };   
    }
    return state;

};

export default reducer;