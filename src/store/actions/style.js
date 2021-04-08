import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const setStyles = (styles) => {
    return {
        type: actionTypes.SET_STYLES,
        styles: styles
    };
};

export const fetchStylesFailed = () => {
    return {
        type: actionTypes.FETCH_STYLES_FAILED
    };
};

export const fetchStylesStart = () => {
    return {
        type: actionTypes.FETCH_STYLES_START
    };
};

export const getStyles = (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return dispatch => {
        dispatch(fetchStylesStart());
        axios.get('style/all', config)
        .then(response => {
            dispatch(setStyles(response.data));
        })
        .catch(error => {
            dispatch(fetchStylesFailed()); 
        });
    };
};

export const saveStyleStart = () => {
    return {
        type: actionTypes.SAVE_STYLE_START
    };
};

export const saveStyleSuccess = () => {
    return {
        type: actionTypes.SAVE_STYLE_SUCCESS
    };
};

export const saveStyleFailed = () => {
    return {
        type: actionTypes.SAVE_STYLE_FAILED
    };
};

export const saveStyle = (token, style) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return dispatch => {
        dispatch(saveStyleStart());
        axios.post('/style/new', style, config)
        .then((response) => {
            if (response === undefined) {
                dispatch(saveStyleFailed());
            }
            else {
                dispatch(saveStyleSuccess());
                dispatch(getStyles(token));
            }            
        })
        .catch((error) => {
            dispatch(saveStyleFailed());            
        });
    };
};