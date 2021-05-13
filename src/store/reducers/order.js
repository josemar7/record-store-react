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
            orders: action.orders,
            loading: false,
            saved: null
        };
    }
    else if (action.type === actionTypes.FETCH_ORDERS_START || action.type === actionTypes.SAVE_ORDER_START) {
        return {
            ...state,
            loading: true,
            saved: null
        };
    }
    else if (action.type === actionTypes.FETCH_ORDERS_FAILED || action.type === actionTypes.SAVE_ORDER_FAILED) {
        return {
            ...state,
            loading: false,
            saved: null
        };   
    }
    else  if (action.type === actionTypes.SAVE_ORDER_SUCCESS) {
        return {
            ...state,
            loading: false,
            saved: true
        };   
    }
    else  if (action.type === actionTypes.INIT_ORDERS) {
        return {
            ...state,
            orders: [],
            loading: false,
            saved: null        
        };   
    }
    return state;
};

export default reducer;
