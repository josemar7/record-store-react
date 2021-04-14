import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const setRecords = (records) => {
    return {
        type: actionTypes.SET_RECORDS,
        artists: records
    };
};

export const fetchRecordsFailed = () => {
    return {
        type: actionTypes.FETCH_RECORDS_FAILED
    };
};

export const fetchRecordsStart = () => {
    return {
        type: actionTypes.FETCH_RECORDS_START
    };
};

export const getRecords = (token) => {
    return dispatch => {
        dispatch(fetchRecordsStart());
        axios.get('/record/all', getConfigBearer(token))
        .then(response => {
            dispatch(setRecords(response.data));
        })
        .catch(error => {
            dispatch(fetchRecordsFailed());
        });
    };
};

export const saveRecordStart = () => {
    return {
        type: actionTypes.SAVE_RECORD_START
    };
};

export const saveRecordSuccess = () => {
    return {
        type: actionTypes.SAVE_RECORD_SUCCESS
    };
};

export const saveRecordFailed = () => {
    return {
        type: actionTypes.SAVE_RECORD_FAILED
    };
};

export const saveRecord = (record, token, history) => {
    return dispatch => {
        dispatch(saveRecordStart());
        axios.post('/record/new', record, getConfigBearer(token))
        .then(response => {
            dispatch(saveRecordSuccess());
            history.replace('/records');
        })
        .catch(error => {
            dispatch(saveRecordFailed());
        });
    };
};

export const getRecordById = (token, id) => {
    return dispatch => {
        dispatch(getRecordByIdStart());
        axios.get(`/record/${id}`, getConfigBearer(token))
        .then(response => {
            dispatch(setRecordById(response.data));
        })
        .catch(error => {
            dispatch(getRecordByIdFailed());
        });
    };
};

export const getRecordByIdFailed = () => {
    return {
        type: actionTypes.GET_RECORD_BY_ID_FAILED
    };
};

export const getRecordByIdStart = () => {
    return {
        type: actionTypes.GET_RECORD_BY_ID_START
    };
};

export const setRecordById = (record) => {
    return {
        type: actionTypes.SET_RECORD_BY_ID,
        artist: record
    };
};

export const deleteRecordById = (token, id) => {
    return dispatch => {
        dispatch(deleteRecordByIdStart());
        axios.delete(`/record/${id}`, getConfigBearer(token))
        .then(response => {
            dispatch(deleteRecordByIdSuccess());
            dispatch(getRecords(token));
        })
        .catch(error => {
            dispatch(deleteRecordByIdFailed());
        });
    };
};

export const deleteRecordByIdStart = () => {
    return {
        type: actionTypes.DELETE_RECORD_BY_ID_START
    };
};


export const deleteRecordByIdSuccess = () => {
    return {
        type: actionTypes.DELETE_RECORD_BY_ID_SUCCESS
    };
};

export const deleteRecordByIdFailed = () => {
    return {
        type: actionTypes.DELETE_RECORD_BY_ID_FAILED
    };
};

export const updateRecordById = (record, token, id, history) => {
    return dispatch => {
        dispatch(updateRecordByIdStart());
        axios.put(`/record/${id}`, record, getConfigBearer(token))
        .then(response => {
            dispatch(updateRecordByIdSuccess());
            history.replace('/records');
        })
        .catch(error => {
            dispatch(updateRecordByIdFailed());
        });
    };
};

export const updateRecordByIdStart = () => {
    return {
        type: actionTypes.UPDATE_RECORD_BY_ID_START
    };
};


export const updateRecordByIdSuccess = () => {
    return {
        type: actionTypes.UPDATE_RECORD_BY_ID_SUCCESS
    };
};

export const updateRecordByIdFailed = () => {
    return {
        type: actionTypes.UPDATE_RECORD_BY_ID_FAILED
    };
};