import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    access_token: null,
    jti: null,
    error: null,
    loading: false,
    user: null,
    roles: []
};

const authStart = (state) => {
    return updateObject(state, {error: null, loading: true, access_token: null, jti: null});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        access_token: action.access_token,
        jti: action.jti,
        error: null,
        loading: false,
        user: action.user.user_name,
        roles: action.user.authorities
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const authLogout = (state) => {
    return updateObject(state, {access_token: null, jti: null, user: null, roles: []});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
};

export default reducer;