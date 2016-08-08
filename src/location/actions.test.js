/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import sinon from 'sinon';
import { mockStore } from '../__mocks__/';
import {
  FETCH_LOCATIONS_PENDING,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,

  CHANGE_LOCATION_SCANNER_STATE,
} from '../app/actionTypes';

import { assert } from 'chai';
import { fetchLocations, openScanner, closeScanner } from './actions';
import * as firebase from '../app/firebase';

describe('location/actions.js', () => {

  it('calling fetchLocations should return a list of ids and locations', (done) => {
    const expectedResult = {
      1: {
        name: 'Location 1',
      },
      2: {
        name: 'Location 2',
      },
    };
    const getLocations = sinon.stub(firebase, 'getLocations');
    getLocations.returns(Promise.resolve(expectedResult));

    const expectedActions = [
      {
        type: FETCH_LOCATIONS_PENDING,
      },
      {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: Object.keys(expectedResult),
          locations: expectedResult,
        },
      },
    ];

    const store = mockStore({});
    store.dispatch(fetchLocations())
      .then(() => {;
        assert.deepEqual(store.getActions(), expectedActions);
        getLocations.restore();
      })
      .then(done);
  });

  it('should call FETCH_LOCATIONS_FAILURE if anything goes wrong', (done) => {
    const expectedResult = new Error('something went wrong');
    const getLocations = sinon.stub(firebase, 'getLocations');
    getLocations.returns(Promise.reject(expectedResult));

    const expectedActions = [
      {
        type: FETCH_LOCATIONS_PENDING,
      },
      {
        type: FETCH_LOCATIONS_FAILURE,
        payload: expectedResult,
        error: true,
      },
    ];

    const store = mockStore({});
    store.dispatch(fetchLocations())
      .then(() => {;
        assert.deepEqual(store.getActions(), expectedActions);
        getLocations.restore();
      })
      .then(done);
  });

  it('should set scannerOpen to true after calling scannerOpen', () => {
    const expectedActions = [
      {
        type: CHANGE_LOCATION_SCANNER_STATE,
        payload: {
          scannerOpen: true,
        },
      },
    ];

    const store = mockStore({});
    store.dispatch(openScanner());
    assert.deepEqual(store.getActions(), expectedActions);
  });

  it('should set scannerOpen to false after calling closeScanner', () => {
    const expectedActions = [
      {
        type: CHANGE_LOCATION_SCANNER_STATE,
        payload: {
          scannerOpen: false,
        },
      },
    ];

    const store = mockStore({});
    store.dispatch(closeScanner());
    assert.deepEqual(store.getActions(), expectedActions);
  });
});
