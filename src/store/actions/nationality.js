import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
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

export const saveNationalityStart = () => {
    return {
        type: actionTypes.SAVE_NATIONALITY_START
    };
};

export const saveNationalitySuccess = () => {
    return {
        type: actionTypes.SAVE_NATIONALITY_SUCCESS
    };
};

export const saveNationalityFailed = () => {
    return {
        type: actionTypes.SAVE_NATIONALITY_FAILED
    };
};

export const saveNationality = (token, nationality) => {
    return dispatch => {
        dispatch(saveNationalityStart());
        axios.post('/nationality/new', nationality, getConfigBearer(token))
        .then((response) => {
            if (response === undefined) {
                dispatch(saveNationalityFailed());
            }
            else {
                dispatch(saveNationalitySuccess());
                dispatch(getNationalities());
            }            
        })
        .catch((error) => {
            dispatch(saveNationalityFailed());
        });
    };
};