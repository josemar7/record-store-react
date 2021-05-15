import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const setOrders = (page) => {
    return {
        type: actionTypes.SET_ORDERS,
        page: page
    };
};

export const fetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const saveOrderStart = () => {
    return {
        type: actionTypes.SAVE_ORDER_START
    };
};

export const saveOrderSuccess = () => {
    return {
        type: actionTypes.SAVE_ORDER_SUCCESS
    };
};

export const saveOrderFailed = () => {
    return {
        type: actionTypes.SAVE_ORDER_FAILED
    };
};

export const saveOrder = (order, user, token) => {
    return dispatch => {
        dispatch(saveOrderStart());
        axios.post(`/orders/${user}`, order, getConfigBearer(token))
        .then(response => {
            dispatch(saveOrderSuccess());
        })
        .catch(error => {
            dispatch(saveOrderFailed());
        });
    };
};

export const getOrders = (user, page, size, token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`/orders/${user}?page=${page}&size=${size}`, getConfigBearer(token))
        .then(response => {
            dispatch(setOrders(response.data));
        })
        .catch(error => {            
            dispatch(fetchOrdersFailed());
        });
    };
};

export const initOrders = () => {
    return {
        type: actionTypes.INIT_ORDERS
    };
};

export const getOrderById = (token, id) => {
    return dispatch => {
        dispatch(getOrderByIdStart());
        axios.get(`/orders/one/${id}`, getConfigBearer(token))
        .then(response => {
            dispatch(setOrderById(response.data));
        })
        .catch(error => {
            dispatch(getOrderByIdFailed());
        });
    };
};

export const getOrderByIdFailed = () => {
    return {
        type: actionTypes.GET_ORDER_BY_ID_FAILED
    };
};

export const getOrderByIdStart = () => {
    return {
        type: actionTypes.GET_ORDER_BY_ID_START
    };
};

export const setOrderById = (order) => {
    return {
        type: actionTypes.SET_ORDER_BY_ID,
        order: order
    };
};