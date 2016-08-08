/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/

import { mockStore } from '../__mocks__/';
import {
  FETCH_LOCATIONS_PENDING,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,

  CHANGE_LOCATION_SCANNER_STATE,
} from '../app/actionTypes';

import { assert } from 'chai';
import { openScanner, closeScanner } from './actions';

describe('location/actions.js', () => {

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
