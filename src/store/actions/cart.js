import * as actionTypes from './actionTypes';

export const addCart = item => {
    return {
        type: actionTypes.ADD_CART,
        item: item
    };
};

export const removeCart = item => {
    return {
        type: actionTypes.REMOVE_CART,
        item: item
    };
};

export const updateItemUnits = (item, units) => {
    return {
        type: actionTypes.UPDATE_ITEM_UNITS,
        item: {...item, cartUnits: units}
    };
};

export const emptyCart = () => {
    return {
        type: actionTypes.EMPTY_CART
    };
};