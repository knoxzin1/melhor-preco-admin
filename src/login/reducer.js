import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  UPDATE_LOGIN_FORM,
} from '../app/actionTypes';

import selectn from 'selectn';

const initialState = {
  isLoading: false,
  error: false,
  userId: null,
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false,
        userId: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        userId: null,
      };
    case LOGIN_SUCCESS:
      const userId = selectn('payload.user.uid', action);

      if (!userId) {
        return {
          ...state,
          isFetching: false,
          error: 'Erro interno, tente novamente',
        };
      }

      return {
        ...state,
        isFetching: false,
        error: false,
        userId,
      };
    default:
      return state;
  }
}

const initialFormState = {
  email: '',
  password: '',
};
export function loginFormReducer(state = initialFormState, action) {
  switch (action.type) {
    case UPDATE_LOGIN_FORM:
      const {
        email,
        password,
      } = action.payload;

      return {
        ...state,
        email,
        password,
      };
    case LOGIN_SUCCESS:
      return initialFormState;
    default:
      return state;
  }
}
