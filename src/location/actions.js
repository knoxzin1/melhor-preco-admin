import {
  FETCH_LOCATIONS_PENDING,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,

  CHANGE_LOCATION_SCANNER_STATE,
} from '../app/actionTypes';

import selectn from 'selectn';
import { getLocations } from '../app/firebase';

export function fetchLocationsRequest() {
  return {
    type: FETCH_LOCATIONS_PENDING
  };
}
export function fetchLocationsSuccess(ids, locations) {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    payload: {
      ids,
      locations
    }
  };
}
export function fetchLocationsFailure(error) {
  return {
    type: FETCH_LOCATIONS_FAILURE,
    payload: error || null,
    error: true
  };
}
export function fetchLocations() {
  return (dispatch, getState) => {

    // exit early if there's no internet connection
    if (!selectn('app.isConnected', getState())) {
      // mocha expects this function to return a Promise
      return Promise.resolve();
    }

    dispatch(fetchLocationsRequest());

    return getLocations()
      .then((response) => {
        dispatch(fetchLocationsSuccess(Object.keys(response), response));
      })
      .catch((err) => {
        dispatch(fetchLocationsFailure(err));
      })
    ;
  };
}

export function openScanner() {
  return {
    type: CHANGE_LOCATION_SCANNER_STATE,
    payload: {
      scannerOpen: true,
    },
  };
}
export function closeScanner() {
  return {
    type: CHANGE_LOCATION_SCANNER_STATE,
    payload: {
      scannerOpen: false,
    },
  };
}
