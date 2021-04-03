import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const setNationalities = (nationalities) => {
    return {
        type: actionTypes.SET_NATIONALITIES,
        nationalities: nationalities
    };
};

export const fetchNationalitiesFailed = () => {
    return {
        type: actionTypes.FETCH_NATIONALITIES_FAILED
    };
};

export const fetchNationalitiesStart = () => {
    return {
        type: actionTypes.FETCH_NATIONALITIES_START
    };
};

export const getNationalities = (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return dispatch => {
        dispatch(fetchNationalitiesStart());
        axios.get('nationality/all', config)
        .then(response => {
            dispatch(setNationalities(response.data));
        })
        .catch(error => {
            dispatch(fetchNationalitiesFailed()); 
        });
    };
};