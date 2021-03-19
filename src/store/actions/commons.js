import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const setStyles = (styles) => {
    return {
        type: actionTypes.SET_STYLES,
        styles: styles
    };
};

export const setNationalities = (nationalities) => {
    return {
        type: actionTypes.SET_NATIONALITIES,
        nationalities: nationalities
    };
};

export const fetchStylesFailed = () => {
    return {
        type: actionTypes.FETCH_STYLES_FAILED
    };
};

export const fetchNationalitiesFailed = () => {
    return {
        type: actionTypes.FETCH_NATIONALITIES_FAILED
    };
};

export const fetchStylesStart = () => {
    return {
        type: actionTypes.FETCH_STYLES_START
    };
};

export const fetchNationalitiesStart = () => {
    return {
        type: actionTypes.FETCH_NATIONALITIES_START
    };
};

export const getStyles = () => {
    return dispatch => {
        dispatch(fetchStylesStart());
        axios.get('style/all')
        .then(response => {
            dispatch(setStyles(response.data));
        })
        .catch(error => {
            dispatch(fetchStylesFailed()); 
        });
    };
};

export const getNationalities = () => {
    return dispatch => {
        dispatch(fetchNationalitiesStart());
        axios.get('nationality/all')
        .then(response => {
            dispatch(setNationalities(response.data));
        })
        .catch(error => {
            dispatch(fetchNationalitiesFailed()); 
        });
    };
};