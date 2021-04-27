import * as actionTypes from '../actions/actionTypes';

const initialState = {
    artists: [],
    loading: false,
    artist: null,
    closeDialog: false
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_ARTISTS || action.type === actionTypes.SET_ARTISTS_FILTERED
        || action.type === actionTypes.SET_ARTISTS_PAGED) {
        return {
            ...state,
            artists: action.artists,
            loading: false,
            closeDialog: false
        };
    }
    else if (action.type === actionTypes.FETCH_ARTISTS_START || action.type === actionTypes.SAVE_ARTIST_START
        || action.type === actionTypes.GET_ARTIST_BY_ID_START || action.type === actionTypes.DELETE_ARTIST_BY_ID_START
        || action.type === actionTypes.UPDATE_ARTIST_BY_ID_START || action.type === actionTypes.FETCH_ARTISTS_START_FILTERED
        || action.type === actionTypes.FETCH_ARTISTS_PAGED_START) {
        return {
            ...state,
            loading: true,
            closeDialog: false
        };
    }
    else if (action.type === actionTypes.SAVE_ARTIST_SUCCESS
        || action.type === actionTypes.DELETE_ARTIST_BY_ID_SUCCESS
        || action.type === actionTypes.UPDATE_ARTIST_BY_ID_SUCCESS) {
        return {
            ...state,
            loading: false,
            closeDialog: true
        };   
    }
    else if (action.type === actionTypes.FETCH_ARTISTS_FAILED 
        || action.type === actionTypes.SAVE_ARTIST_FAILED || action.type === actionTypes.GET_ARTIST_BY_ID_FAILED
        || action.type === actionTypes.DELETE_ARTIST_BY_ID_FAILED
        || action.type === actionTypes.UPDATE_ARTIST_BY_ID_FAILED
        || action.type === actionTypes.FETCH_ARTISTS_FAILED_FILTERED
        || action.type === actionTypes.FETCH_ARTISTS_PAGED_FAILED ) {
        return {
            ...state,
            loading: false,
            closeDialog: false
        };   
    }
    else if (action.type === actionTypes.SET_ARTIST_BY_ID) {
        return {
            ...state,
            loading: false,
            artist: action.artist,
            artistError: false,closeDialog: undefined
        };
    }
    return state;
};

export default reducer;