import {
  CHANGE_NETWORK_STATUS,
  OFFLINE_PRODUCT_LIST_RETRIEVED,
  APP_REHYDRATED,
} from './actionTypes';

import offlineStore from 'react-native-simple-store';
import { insertProducts } from './firebase';

export function setOnline() {
  return {
    type: CHANGE_NETWORK_STATUS,
    payload: {
      isConnected: true,
    },
  };
}

export function setOffline() {
  return {
    type: CHANGE_NETWORK_STATUS,
    payload: {
      isConnected: false,
    },
  };
}

export function checkOfflineProductsSuccess() {
  return {
    type: OFFLINE_PRODUCT_LIST_RETRIEVED,
  };
}
export function checkOfflineProducts() {
  return (dispatch) => {
    return offlineStore.get('offlineProductList')
      .then((products) => {
        return insertProducts(products)
      })
      .then(() => {
        return offlineStore.delete('offlineProductList');
      })
      .then(() => {
        dispatch(checkOfflineProductsSuccess());
      })
      .catch(() => {
        dispatch(checkOfflineProductsSuccess());
      });
  };
}

export function setAppRehydrated() {
  return {
    type: APP_REHYDRATED,
  };
}
