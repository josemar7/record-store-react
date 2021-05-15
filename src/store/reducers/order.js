import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    saved: null
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_ORDERS) {
        return {
            ...state,
            page: action.page,
            loading: false,
            saved: null
        };
    }
    else if (action.type === actionTypes.FETCH_ORDERS_START || action.type === actionTypes.SAVE_ORDER_START
        || action.type === actionTypes.GET_ORDER_BY_ID_START) {
        return {
            ...state,
            loading: true,
            saved: null
        };
    }
    else if (action.type === actionTypes.FETCH_ORDERS_FAILED || action.type === actionTypes.SAVE_ORDER_FAILED
        || action.type === actionTypes.GET_RECORD_BY_ID_FAILED) {
        return {
            ...state,
            loading: false,
            saved: null
        };   
    }
    else if (action.type === actionTypes.SAVE_ORDER_SUCCESS) {
        return {
            ...state,
            loading: false,
            saved: true
        };   
    }
    else if (action.type === actionTypes.INIT_ORDERS) {
        return {
            ...state,
            orders: [],
            loading: false,
            saved: null        
        };   
    }
    else if (action.type === actionTypes.SET_ORDER_BY_ID) {
        return {
            ...state,
            loading: false,
            order: action.order,
            saved: null
        };
    }
    return state;
};

export default reducer;
