import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const setArtists = (artists) => {
    return {
        type: actionTypes.SET_ARTISTS,
        artists: artists
    };
};

export const fetchArtistsFailed = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_FAILED
    };
};

export const fetchArtistsStart = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_START
    };
};

export const getArtists = (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return dispatch => {
        dispatch(fetchArtistsStart());
        axios.get('/artist/all', config)
        .then(response => {
            dispatch(setArtists(response.data));
        })
        .catch(error => {
            dispatch(fetchArtistsFailed());
        });
    };
};

export const saveArtistStart = () => {
    return {
        type: actionTypes.SAVE_ARTIST_START
    };
};

export const saveArtistSuccess = () => {
    return {
        type: actionTypes.SAVE_ARTIST_SUCCESS
    };
};

export const saveArtistFailed = () => {
    return {
        type: actionTypes.SAVE_ARTIST_FAILED
    };
};

export const saveArtist = (artist, token, history) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return dispatch => {
        dispatch(saveArtistStart());
        axios.post('/artist/new', artist, config)
        .then(response => {
            dispatch(saveArtistSuccess());
            history.replace('/artists');
        })
        .catch(error => {
            dispatch(saveArtistFailed());
        });
    };
};