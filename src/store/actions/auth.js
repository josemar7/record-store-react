import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders';
import qs from "qs";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (access_token, jti) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    access_token: access_token,
    jti: jti
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("jti");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const auth = (user, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let url = null;
    if (!isSignup) {
      url = "https://laboauth2full.herokuapp.com/oauth/token";
      // url = 'http://localhost:9000/oauth/token';
      var data = qs.stringify({
        grant_type: "password",
        username: user,
        password: password,
      });
      var config = {
        method: "post",
        url: url,
        headers: {
          Authorization: "Basic Y2xpZW50SWQ6c2VjcmV0",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          const expirationDate = new Date(
            new Date().getTime() + response.data.expires_in * 1000
          );
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("jti", response.data.jti);
          dispatch(authSuccess(response.data.access_token, response.data.jti));
          dispatch(checkAuthTimeout(response.data.expires_in));
        })
        .catch((err) => {
          dispatch(authFail(err.response.data.error));
        });
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const jti = localStorage.getItem("jti");
        dispatch(authSuccess(token, jti));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};