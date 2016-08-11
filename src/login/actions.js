import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN,

  UPDATE_LOGIN_FORM,
} from '../app/actionTypes';

import selectn from 'selectn';
import { firebaseLogin } from '../app/firebase';

export function loginRequest() {
  return {
    type: LOGIN_PENDING,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error || null,
    error: true,
  };
}
export function login(email, password) {
  return (dispatch, getState) => {
    // exit early if there's no internet connection
    if (!selectn('app.isConnected', getState())) {
      // mocha expects this function to return a Promise
      return Promise.resolve();
    }

    dispatch(loginRequest());

    return firebaseLogin(email, password)
      .catch((error) => {
        const errorMessage = selectn('message', error) || 'Erro ao logar';
        dispatch(loginFailure(errorMessage));
      });
  };
}

export function clearLogin() {
  return {
    type: CLEAR_LOGIN,
  };
};

export function updateLoginForm(value) {
  return {
    type: UPDATE_LOGIN_FORM,
    payload: value,
  };
}
