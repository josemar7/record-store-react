import * as actionTypes from './actionTypes';

export const setForm = (form) => {
    return {
        type: actionTypes.SET_FORM,
        form: form
    };
};