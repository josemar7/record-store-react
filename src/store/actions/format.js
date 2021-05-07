import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const setFormats = (formats) => {
    return {
        type: actionTypes.SET_FORMATS,
        formats: formats
    };
};

export const fetchFormatsFailed = () => {
    return {
        type: actionTypes.FETCH_FORMATS_FAILED
    };
};

export const fetchFormatsStart = () => {
    return {
        type: actionTypes.FETCH_FORMATS_START
    };
};

export const getFormats = () => {
    return dispatch => {
        dispatch(fetchFormatsStart());
        axios.get('format/all')
        .then(response => {
            dispatch(setFormats(response.data));
        })
        .catch(error => {
            dispatch(fetchFormatsFailed()); 
        });
    };
};

export const saveFormatStart = () => {
    return {
        type: actionTypes.SAVE_FORMAT_START
    };
};

export const saveFormatSuccess = () => {
    return {
        type: actionTypes.SAVE_FORMAT_SUCCESS
    };
};

export const saveFormatFailed = () => {
    return {
        type: actionTypes.SAVE_FORMAT_FAILED
    };
};

export const saveFormat = (token, format) => {
    return dispatch => {
        dispatch(saveFormatStart());
        axios.post('/format/new', format, getConfigBearer(token))
        .then((response) => {
            if (response === undefined) {
                dispatch(saveFormatFailed());
            }
            else {
                dispatch(saveFormatSuccess());
                dispatch(getFormats());
            }            
        })
        .catch((error) => {
            dispatch(saveFormatFailed());
        });
    };
};