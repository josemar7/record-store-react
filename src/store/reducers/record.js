import * as actionTypes from '../actions/actionTypes';

const initialState = {
    records: [],
    loading: false,
    record: null,
    filter: '',
    deleted: null,
    saved: null
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_FILTER) {
        return {
            ...state,
            filter: action.filter,
            deleted: null,
            saved: null
        };
    }
    if (action.type === actionTypes.SET_RECORDS) {
        return {
            ...state,
            records: action.records,
            loading: false,
            deleted: null,
            saved: null
        };
    }
    if (action.type === actionTypes.SET_RECORDS_PAGED || action.type === actionTypes.SET_RECORDS_FILTERED) {
        return {
            ...state,
            page: action.page,
            loading: false,
            closeDialog: false,
            deleted: null,
            saved: null
        };
    }
    else if (action.type === actionTypes.FETCH_RECORDS_START || action.type === actionTypes.SAVE_RECORD_START
        || action.type === actionTypes.GET_RECORD_BY_ID_START || action.type === actionTypes.DELETE_RECORD_BY_ID_START
        || action.type === actionTypes.UPDATE_RECORD_BY_ID_START || action.type === actionTypes.FETCH_RECORDS_START_FILTERED
        || action.type === actionTypes.FETCH_RECORDS_PAGED_START) {
        return {
            ...state,
            loading: true,
            deleted: null,
            saved: null
        };
    }
    else if (action.type === actionTypes.FETCH_RECORDS_FAILED || action.type === actionTypes.SAVE_RECORD_FAILED 
        || action.type === actionTypes.GET_RECORD_BY_ID_FAILED || action.type === actionTypes.DELETE_RECORD_BY_ID_FAILED 
        || action.type === actionTypes.UPDATE_RECORD_BY_ID_FAILED || action.type === actionTypes.FETCH_RECORDS_FAILED_FILTERED 
        || action.type === actionTypes.FETCH_RECORDS_PAGED_FAILED) {
        return {
            ...state,
            loading: false,
            deleted: null,
            saved: null
        };   
    }
    else  if (action.type === actionTypes.SAVE_RECORD_SUCCESS || action.type === actionTypes.UPDATE_RECORD_BY_ID_SUCCESS ) {
        return {
            ...state,
            loading: false,
            deleted: null,
            saved: true
        };   
    }
    else if (action.type === actionTypes.DELETE_RECORD_BY_ID_SUCCESS) {
        return {
            ...state,
            loading: false,
            deleted: true,
            saved: null
        };   
    }
    else if (action.type === actionTypes.SET_RECORD_BY_ID) {
        return {
            ...state,
            loading: false,
            record: action.record,
            deleted: null,
            saved: null
        };
    }
    return state;
};

export default reducer;