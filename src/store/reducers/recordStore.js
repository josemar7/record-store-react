import * as actionTypes from '../actions/actionTypes';

const initialState = {
    artists: [],
    loading: false,
    artist: null
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
        case actionTypes.SAVE_ARTIST_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SAVE_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionTypes.SAVE_ARTIST_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.GET_ARTIST_BY_ID_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SET_ARTIST_BY_ID:
            return {
                ...state,
                loading: false,
                artist: action.artist
            };
        case actionTypes.GET_ARTIST_BY_ID_FAILED:
            return {
                ...state,
                loading: false
            }
    }
    return state;

};

export default reducer;