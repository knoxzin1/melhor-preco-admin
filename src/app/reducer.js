import {
  CHANGE_NETWORK_STATUS,
  OFFLINE_PRODUCT_LIST_RETRIEVED,
  APP_REHYDRATED,
} from './actionTypes';

const initialState = {
  isConnected: undefined,
  isStarting: true,
  isSynchronizing: false,
  isRehydrated: false,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NETWORK_STATUS:
      return {
        ...state,
        isConnected: action.payload.isConnected
      };
    case OFFLINE_PRODUCT_LIST_RETRIEVED:
      return {
        ...state,
        isStarting: false,
      };
    case APP_REHYDRATED:
      return {
        ...state,
        isRehydrated: true,
      };
    default:
      return state;
  }
}
