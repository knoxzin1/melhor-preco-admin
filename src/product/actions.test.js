/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import sinon from 'sinon';
import { mockStore } from '../__mocks__/';
import {
  FETCH_PRODUCT_PENDING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,

  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from '../app/actionTypes';

import { assert } from 'chai';
import * as actions from './actions';
import * as firebase from '../app/firebase';

describe('product/actions.js', () => {
  describe('fetchProduct', () => {
    it('should call FETCH_PRODUCT_SUCCESS after fetching', (done) => {
      const expectedResult = {
        product: {
          '1': {
            barcode: '123',
            name: 'test product',
          },
        },
        locationProduct: {
          location: '1',
          price: 2.64,
          product: '1',
        },
        navigatorKey: 1,
      };
      const getProductByBarcode = sinon.stub(firebase, 'getProductByBarcode');
      getProductByBarcode.returns(Promise.resolve(expectedResult));

      const expectedActions = [
        {
          type: FETCH_PRODUCT_PENDING,
        },
        {
          type: FETCH_PRODUCT_SUCCESS,
          payload: expectedResult,
        },
      ];

      const store = mockStore({});
      store.dispatch(actions.fetchProduct('123', '1', 1))
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
          getProductByBarcode.restore();
        })
        .then(done);
    });

    it('should call FETCH_PRODUCT_FAILURE if anything goes wrong', (done) => {
      const expectedResult = new Error('something went wrong');
      const getProductByBarcode = sinon.stub(firebase, 'getProductByBarcode');
      getProductByBarcode.returns(Promise.reject(expectedResult));

      const expectedActions = [
        {
          type: FETCH_PRODUCT_PENDING,
        },
        {
          type: FETCH_PRODUCT_FAILURE,
          payload: expectedResult,
          error: true,
        },
      ];

      const store = mockStore({});
      store.dispatch(actions.fetchProduct('123', '1', 1))
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
          getProductByBarcode.restore();
        })
        .then(done);
    });
  });

  describe('addProduct', () => {
    it('should call ADD_PRODUCT_SUCCESS after inserting', (done) => {
      const insertProduct = sinon.stub(firebase, 'insertProduct');
      insertProduct.returns(Promise.resolve());

      const expectedActions = [
        {
          type: ADD_PRODUCT_PENDING,
        },
        {
          type: ADD_PRODUCT_SUCCESS,
        },
      ];

      const product = {
        name: 'test',
        barcode: '',
      };

      const store = mockStore({});
      store.dispatch(actions.addProduct(product))
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
          insertProduct.restore();
        })
        .then(done);
    });

    it('should call ADD_PRODUCT_FAILURE if anything goes wrong', (done) => {
      const expectedResult = new Error('something went wrong');
      const insertProduct = sinon.stub(firebase, 'insertProduct');
      insertProduct.returns(Promise.reject(expectedResult));

      const expectedActions = [
        {
          type: ADD_PRODUCT_PENDING,
        },
        {
          type: ADD_PRODUCT_FAILURE,
          payload: expectedResult,
          error: true,
        },
      ];

      const product = {
        name: 'test',
        barcode: '',
      };

      const store = mockStore({});
      store.dispatch(actions.addProduct(product))
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
          insertProduct.restore();
        })
        .then(done);
    });
  });

  describe('addProductOffline', () => {

    // TODO
    // react-native-simple-store JSON.parse is throwing when value is undefined
    it.skip('should call ADD_PRODUCT_SUCCESS after inserting', (done) => {
      const expectedActions = [
        {
          type: ADD_PRODUCT_PENDING,
        },
        {
          type: ADD_PRODUCT_SUCCESS,
        },
      ];

      const product = {
        name: 'test',
        barcode: '',
      };

      const store = mockStore({});
      store.dispatch(actions.addProductOffline(product))
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
        })
        .then(done)
        .catch(done);
    });

    it('should call ADD_PRODUCT_FAILURE if anything goes wrong', (done) => {
      const expectedResult = new Error('something went wrong');
      const insertProductOffline = sinon.stub(actions, 'insertProductOffline');
      insertProductOffline.returns(Promise.reject(expectedResult));

      const expectedActions = [
        {
          type: ADD_PRODUCT_PENDING,
        },
        {
          type: ADD_PRODUCT_FAILURE,
          payload: expectedResult,
          error: true,
        },
      ];

      const product = {
        name: 'test',
        barcode: '',
      };

      const store = mockStore({});
      store.dispatch(actions.addProductOffline(product))
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
          insertProductOffline.restore();
        })
        .then(done);
    });
  });
});
