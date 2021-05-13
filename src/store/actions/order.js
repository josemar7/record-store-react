import axios from '../../axios-orders';
import { getConfigBearer } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const setOrders = (orders) => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders
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

export const getOrders = (user, page, size) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`/orders/${user}?page=${page}&size=${size}`)
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