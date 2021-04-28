import * as actionTypes from '../actions/actionTypes';

const initialState = {
    records: [],
    loading: false,
    record: null
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_RECORDS || action.type === actionTypes.SET_RECORDS_FILTERED) {
        return {
            ...state,
            records: action.records,
            loading: false
        };
    }
    if (action.type === actionTypes.SET_RECORDS_PAGED) {
        return {
            ...state,
            page: action.page,
            loading: false,
            closeDialog: false
        };
    }
    else if (action.type === actionTypes.FETCH_RECORDS_START || action.type === actionTypes.SAVE_RECORD_START
        || action.type === actionTypes.GET_RECORD_BY_ID_START || action.type === actionTypes.DELETE_RECORD_BY_ID_START
        || action.type === actionTypes.UPDATE_RECORD_BY_ID_START || action.type === actionTypes.FETCH_RECORDS_START_FILTERED
        || action.type === actionTypes.FETCH_RECORDS_PAGED_START) {
        return {
            ...state,
            loading: true
        };
    }
    else if (action.type === actionTypes.FETCH_RECORDS_FAILED || action.type === actionTypes.SAVE_RECORD_SUCCESS
        || action.type === actionTypes.SAVE_RECORD_FAILED || action.type === actionTypes.GET_RECORD_BY_ID_FAILED
        || action.type === actionTypes.DELETE_RECORD_BY_ID_SUCCESS || action.type === actionTypes.DELETE_RECORD_BY_ID_FAILED
        || action.type === actionTypes.UPDATE_RECORD_BY_ID_SUCCESS || action.type === actionTypes.UPDATE_RECORD_BY_ID_FAILED
        || action.type === actionTypes.FETCH_RECORDS_FAILED_FILTERED || action.type === actionTypes.FETCH_RECORDS_PAGED_FAILED) {
        return {
            ...state,
            loading: false
        };   
    }
    else if (action.type === actionTypes.SET_RECORD_BY_ID) {
        return {
            ...state,
            loading: false,
            record: action.record
        };
    }
    return state;
};

export default reducer;