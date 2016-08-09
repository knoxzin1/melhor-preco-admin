import { assert } from 'chai';
import {
  productReducer,
  productsReducer,
  productFormReducer,
} from './reducer';

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

describe('product/reducer.js', () => {
  describe('productReducer', () => {
    it('should set isFetching to true on request', () => {
      const state = productReducer(undefined, {
        type: FETCH_PRODUCT_PENDING,
      });

      assert.propertyVal(state, 'isFetching', true);
    });

    it('should set isFetching to false on success', () => {
      const state = productReducer(undefined, {
        type: FETCH_PRODUCT_SUCCESS,
      });

      assert.propertyVal(state, 'isFetching', false);
    });

    it('should set isFetching to false on error', () => {
      const state = productReducer(undefined, {
        type: FETCH_PRODUCT_FAILURE,
        payload: new Error('something went wrong'),
      });

      assert.propertyVal(state, 'isFetching', false);
    });

    it('should set error property on error', () => {
      const error = new Error('something went wrong');

      const state = productReducer(undefined, {
        type: FETCH_PRODUCT_FAILURE,
        payload: error,
      });

      assert.propertyNotVal(state, 'error', false);
      assert.propertyVal(state, 'error', error);
    });

    it('should set isCreating to true on create request', () => {
      const state = productReducer(undefined, {
        type: ADD_PRODUCT_PENDING,
      });

      assert.propertyVal(state, 'isCreating', true);
    });

    it('should set isCreating to false on create success', () => {
      const state = productReducer(undefined, {
        type: ADD_PRODUCT_SUCCESS,
      });

      assert.propertyVal(state, 'isCreating', false);
    });

    it('should set isCreating to false on create error', () => {
      const state = productReducer(undefined, {
        type: ADD_PRODUCT_FAILURE,
      });

      assert.propertyVal(state, 'isCreating', false);
    });

    it('should set error property on create error', () => {
      const error = new Error('something went wrong');

      const state = productReducer(undefined, {
        type: ADD_PRODUCT_FAILURE,
        payload: error,
      });

      assert.propertyNotVal(state, 'error', false);
      assert.propertyVal(state, 'error', error);
    });
  });

  describe('productFormReducer', () => {
    it('should fill in price and name after FETCH_PRODUCT_SUCCESS', () => {
      const navigatorKey = 'navigatorKey';
      const name = 'testProduct';
      const price = 1.30;
      const productId = '-Iuy2dANtFBZ-OK7I-XK';
      const locationProductId = '-Iuy2dANtFBZ-OK7I-XL';

      const state = productFormReducer(undefined, {
        type: FETCH_PRODUCT_SUCCESS,
        payload: {
          navigatorKey: navigatorKey,
          productId: productId,
          locationProductId: locationProductId,
          product: {
            [productId]: {
              name: name,
            },
          },
          locationProduct: {
            [locationProductId]: {
              price: price,
            },
          },
        },
      });

      assert.propertyVal(state[navigatorKey], 'productId', productId);
      assert.propertyVal(state[navigatorKey], 'locationProductId', locationProductId);
      assert.propertyVal(state[navigatorKey], 'price', price);
      assert.propertyVal(state[navigatorKey], 'name', name);
    });

    it('should update name and price on form change', () => {
      const navigatorKey = 'navigatorKey';
      const name = 'testProduct';
      const price = 1.30;

      const state = productFormReducer(undefined, {
        type: UPDATE_PRODUCT_FORM,
        payload: {
          navigatorKey: navigatorKey,
          name: name,
          price: price,
        },
      });

      assert.propertyVal(state[navigatorKey], 'price', price);
      assert.propertyVal(state[navigatorKey], 'name', name);
    });
  });
});
