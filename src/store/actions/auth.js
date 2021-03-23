import * as actionTypes from "./actionTypes";
import axios from "axios";
import qs from "qs";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
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
  return (dispatch) => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_7PzgaSCU8al4tgPEEDuMEXpD9vHKJHA";
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
          console.log(JSON.stringify(response.data));
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          // dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((err) => {
          console.log(err);
          dispatch(authFail(err.response.data.error));
        });
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
