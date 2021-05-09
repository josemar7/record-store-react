import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const setRecords = (records) => {
    return {
        type: actionTypes.SET_RECORDS,
        records: records
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

export const saveRecord = (record, token) => {
    return dispatch => {
        dispatch(saveRecordStart());
        axios.post('/record/new', record, getConfigBearer(token))
        .then(response => {
            dispatch(saveRecordSuccess());
        })
        .catch(error => {
            dispatch(saveRecordFailed());
        });
    };
};

export const getRecordById = (id) => {
    return dispatch => {
        dispatch(getRecordByIdStart());
        axios.get(`/record/${id}`)
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
        record: record
    };
};

export const deleteRecordById = (token, id) => {
    return dispatch => {
        dispatch(deleteRecordByIdStart());
        axios.delete(`/record/${id}`, getConfigBearer(token))
        .then(response => {
            dispatch(deleteRecordByIdSuccess());
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

export const updateRecordById = (record, token, id) => {
    return dispatch => {
        dispatch(updateRecordByIdStart());
        axios.put(`/record/${id}`, record, getConfigBearer(token))
        .then(response => {
            dispatch(updateRecordByIdSuccess());
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

export const getRecordsFiltered = (filter, page, size) => {
    return dispatch => {
        dispatch(fetchRecordsStartFiltered());
        let filterStr = '';
        Object.keys(filter).forEach(key => filterStr = filterStr.concat(key, '=', filter[key], '&'));
        axios.get(`/record/filter?page=${page}&size=${size}&` + filterStr.slice(0, -1))
        .then(response => {
            dispatch(setRecordsFiltered(response.data));
        })
        .catch(error => {            
            dispatch(fetchRecordsFailedFiltered());
        });
    };
};

export const fetchRecordsStartFiltered = () => {
    return {
        type: actionTypes.FETCH_RECORDS_START_FILTERED
    };
};

export const setRecordsFiltered = (page) => {
    return {
        type: actionTypes.SET_RECORDS_FILTERED,
        page: page
    };
};

export const fetchRecordsFailedFiltered = () => {
    return {
        type: actionTypes.FETCH_RECORDS_FAILED_FILTERED
    };
};

export const setRecordsPaged = (page) => {
    return {
        type: actionTypes.SET_RECORDS_PAGED,
        page: page
    };
};

export const fetchRecordsPagedFailed = () => {
    return {
        type: actionTypes.FETCH_RECORDS_PAGED_FAILED
    };
};

export const fetchRecordsPagedStart = () => {
    return {
        type: actionTypes.FETCH_RECORDS_PAGED_START
    };
};

export const getRecordsPaged = (page, size) => {
    return dispatch => {
        dispatch(fetchRecordsPagedStart());        
        axios.get(`/record/all/paged?page=${page}&size=${size}`)
        .then(response => {
            dispatch(setRecordsPaged(response.data));
        })
        .catch(error => {
            dispatch(fetchRecordsPagedFailed());
        });
    };
};

export const setFilter = filter => {
    return {
        type: actionTypes.SET_FILTER,
        filter: filter
    };
};