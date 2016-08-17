import {
  FETCH_LOCATIONS_PENDING,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,

  CHANGE_LOCATION_SCANNER_STATE,
} from '../app/actionTypes';

import { union } from 'lodash';

const initialState = {
  isFetching: false,
  isLoaded: false,
  error: false,
  isEmpty: true,
  ids: [],
};

export function locationListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case FETCH_LOCATIONS_SUCCESS: {
      const { payload } = action;
      const ids = union(state.ids, payload.ids);

      return {
        ids,
        isFetching: false,
        isLoaded: true,
        error: false,
        isEmpty: ids.length === 0,
      };
    }
    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function locationEntitiesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_SUCCESS:
      return Object.assign(state, action.payload.locations);
    default:
      return state;
  }
}

const locationInitialState = {
  scannerOpen: false,
};

export function locationReducer(state = locationInitialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION_SCANNER_STATE:
      return { scannerOpen: action.payload.scannerOpen };
    default:
      return state;
  }
}
