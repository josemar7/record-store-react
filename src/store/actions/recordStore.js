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

export const getArtists = () => {
    return dispatch => {
        dispatch(fetchArtistsStart());
        axios.get('/artist/all')
        .then(response => {
            dispatch(setArtists(response.data));
        })
        .catch(error => {
            dispatch(fetchArtistsFailed());
        });
    };
};
