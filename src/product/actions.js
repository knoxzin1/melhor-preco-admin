import {
  FETCH_PRODUCT_PENDING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,

  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,

  UPDATE_PRODUCT_FORM,
  CLEAR_PRODUCT_FORM,
} from '../app/actionTypes';

import offlineStore from 'react-native-simple-store';
import { getProductByBarcode, insertProduct } from '../app/firebase';

export function fetchProductRequest() {
  return {
    type: FETCH_PRODUCT_PENDING,
  };
}
export function fetchProductSuccess(response) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: response,
  };
}
export function fetchProductFailure(error) {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error || null,
    error: true,
  };
}
export function fetchProduct(barcode, location, navigatorKey) {
  return (dispatch) => {
    dispatch(fetchProductRequest());

    return getProductByBarcode(barcode, location)
      .then((response) => {
        dispatch(fetchProductSuccess({
          ...response,
          navigatorKey,
        }));
      })
      .catch((err) => {
        dispatch(fetchProductFailure(err));
      });
  };
}

export function addProductRequest() {
  return {
    type: ADD_PRODUCT_PENDING,
  };
}
export function addProductSuccess() {
  return {
    type: ADD_PRODUCT_SUCCESS,
  };
}
export function addProductFailure(error) {
  return {
    type: ADD_PRODUCT_FAILURE,
    payload: error || null,
    error: true,
  };
}
export function addProduct(product) {
  return (dispatch) => {
    dispatch(addProductRequest());

    return insertProduct(product)
      .then(() => {
        dispatch(addProductSuccess());
      })
      .catch((err) => {
        dispatch(addProductFailure(err));
      });
  };
}
export function insertProductOffline(product) {
  return offlineStore.get('offlineProductList')
    .then((list) => {
      return list ? list : [];
    })
    .then((list) => {
      return list.concat(product);
    })
    .then((list) => {
      return offlineStore.save('offlineProductList', list);
    });
}
export function addProductOffline(product) {
  return (dispatch) => {
    dispatch(addProductRequest());

    return insertProductOffline(product)
      .then(() => {
        dispatch(addProductSuccess());
      })
      .catch((err) => {
        dispatch(addProductFailure(err));
      })
    ;
  };
}

export function updateProductForm(value, navigatorKey) {
  return {
    type: UPDATE_PRODUCT_FORM,
    payload: {
      ...value,
      navigatorKey,
    }
  };
}
export function clearProductForm() {
  return {
    type: CLEAR_PRODUCT_FORM,
  };
}
