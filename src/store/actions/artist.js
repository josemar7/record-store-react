import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
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

export const saveArtist = (artist, token) => {
    return dispatch => {
        dispatch(saveArtistStart());
        axios.post('/artist/new', artist, getConfigBearer(token))
        .then(response => {
            dispatch(saveArtistSuccess());
        })
        .catch(error => {
            dispatch(saveArtistFailed());
        });
    };
};

export const getArtistById = (id) => {
    return dispatch => {
        dispatch(getArtistByIdStart());
        axios.get(`/artist/${id}`)
        .then(response => {
            dispatch(setArtistById(response.data));
        })
        .catch(error => {
            dispatch(getArtistByIdFailed());
        });
    };
};

export const getArtistByIdFailed = () => {
    return {
        type: actionTypes.GET_ARTIST_BY_ID_FAILED
    };
};

export const getArtistByIdStart = () => {
    return {
        type: actionTypes.GET_ARTIST_BY_ID_START
    };
};

export const setArtistById = (artist) => {
    return {
        type: actionTypes.SET_ARTIST_BY_ID,
        artist: artist
    };
};

export const deleteArtistById = (token, id) => {
    return dispatch => {
        dispatch(deleteArtistByIdStart());
        axios.delete(`/artist/${id}`, getConfigBearer(token))
        .then(response => {
            dispatch(deleteArtistByIdSuccess());
        })
        .catch(error => {
            dispatch(deleteArtistByIdFailed());
        });
    };
};

export const deleteArtistByIdStart = () => {
    return {
        type: actionTypes.DELETE_ARTIST_BY_ID_START
    };
};


export const deleteArtistByIdSuccess = () => {
    return {
        type: actionTypes.DELETE_ARTIST_BY_ID_SUCCESS
    };
};

export const deleteArtistByIdFailed = () => {
    return {
        type: actionTypes.DELETE_ARTIST_BY_ID_FAILED
    };
};

export const updateArtistById = (artist, token, id) => {
    return dispatch => {
        dispatch(updateArtistByIdStart());
        axios.put(`/artist/${id}`, artist, getConfigBearer(token))
        .then(response => {
            dispatch(updateArtistByIdSuccess());
        })
        .catch(error => {
            dispatch(updateArtistByIdFailed());
        });
    };
};

export const updateArtistByIdStart = () => {
    return {
        type: actionTypes.UPDATE_ARTIST_BY_ID_START
    };
};


export const updateArtistByIdSuccess = () => {
    return {
        type: actionTypes.UPDATE_ARTIST_BY_ID_SUCCESS
    };
};

export const updateArtistByIdFailed = () => {
    return {
        type: actionTypes.UPDATE_ARTIST_BY_ID_FAILED
    };
};

export const setArtistsFiltered = (artists) => {
    return {
        type: actionTypes.SET_ARTISTS_FILTERED,
        artists: artists
    };
};

export const fetchArtistsFailedFiltered = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_FAILED_FILTERED
    };
};

export const fetchArtistsStartFiltered = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_START_FILTERED
    };
};

export const getArtistsFiltered = (text) => {
    return dispatch => {
        dispatch(fetchArtistsStartFiltered());
        if (text === null) {
            text = '';
        }
        axios.get('/artist/filter?name=' + text)
        .then(response => {
            dispatch(setArtistsFiltered(response.data));
        })
        .catch(error => {            
            dispatch(fetchArtistsFailedFiltered());
        });
    };
};

export const setArtistsPaged = (page) => {
    return {
        type: actionTypes.SET_ARTISTS_PAGED,
        page: page
    };
};

export const fetchArtistsPagedFailed = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_PAGED_FAILED
    };
};

export const fetchArtistsPagedStart = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_PAGED_START
    };
};

export const getArtistsPaged = (page, size) => {
    return dispatch => {
        dispatch(fetchArtistsPagedStart());        
        axios.get(`/artist/all/paged?page=${page}&size=${size}`)
        .then(response => {
            dispatch(setArtistsPaged(response.data));
        })
        .catch(error => {
            dispatch(fetchArtistsPagedFailed());
        });
    };
};