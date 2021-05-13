import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: []
};

const reducer = (state = initialState, action) => {
    const myCart = [...state.cart];        
    if (action.type === actionTypes.ADD_CART) {        
        myCart.push(action.item);
        return {
            ...state,
            cart: myCart
        };      
    }
    else if (action.type === actionTypes.REMOVE_CART) {        
        const filtered = myCart.filter( value => value.id !== action.item.id);        
        return {
            ...state,
            cart: filtered
        };      
    }
    else if (action.type === actionTypes.UPDATE_ITEM_UNITS) {        
        const filtered = myCart.filter( value => value.id !== action.item.id);
        filtered.push(action.item);
        return {
            ...state,
            cart: filtered
        };      
    }
    else if (action.type === actionTypes.EMPTY_CART) {        
        return {
            ...state,
            cart: []
        };      
    }
    return state;
};

export default reducer;