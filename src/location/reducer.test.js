import { assert } from 'chai';
import {
  locationReducer,
  locationEntitiesReducer,
  locationListReducer,
} from './reducer';

import {
  FETCH_LOCATIONS_PENDING,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,

  CHANGE_LOCATION_SCANNER_STATE,
} from '../app/actionTypes';

describe('location/reducer.js', () => {
  describe('locationReducer', () => {
    it('should set scannerOpen accordingly', () => {
      const state = locationReducer(undefined, {
        type: CHANGE_LOCATION_SCANNER_STATE,
        payload: {
          scannerOpen: true
        }
      });
      assert.propertyVal(state, 'scannerOpen', true);

      const state2 = locationReducer(undefined, {
        type: CHANGE_LOCATION_SCANNER_STATE,
        payload: {
          scannerOpen: false
        }
      });
      assert.propertyVal(state2, 'scannerOpen', false);
    });
  });

  describe('locationEntitiesReducer', () => {
    it('should merge entities', () => {

      const initialState = {
        '2': {
          name: 'initial state',
        },
      };

      const state = locationEntitiesReducer(initialState, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          locations: {
            1: {
              name: 'test'
            }
          }
        }
      });

      assert.lengthOf(Object.keys(state), 2);
    });
  });

  describe('locationListReducer', () => {
    it('should set isFetching to true on request', () => {
      const state = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_PENDING,
      });

      assert.propertyVal(state, 'isFetching', true);
    });

    it('should set isFetching to false on success or error', () => {
      const state = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: [1],
        },
      });
      assert.propertyVal(state, 'isFetching', false);

      const state2 = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_FAILURE,
        payload: new Error('qw'),
      });
      assert.propertyVal(state2, 'isFetching', false);
    });

    it('should concat id list on success', () => {

      const initialState = {
        ids: [1],
      };

      const state = locationListReducer(initialState, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: [2, 3],
        },
      });
      assert.lengthOf(state.ids, 3);
    });

    it('should have unique ids', () => {

      const initialState = {
        ids: [1, 2, 3],
      };

      const state = locationListReducer(initialState, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: [2, 3, 4],
        },
      });
      assert.lengthOf(state.ids, 4);
      assert.deepEqual(state.ids, [1, 2, 3, 4]);
    });

    it('should set isEmpty accordingly on success', () => {
      const state = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: [1],
        },
      });
      assert.propertyVal(state, 'isEmpty', false);

      const state2 = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: [],
        },
      });
      assert.propertyVal(state2, 'isEmpty', true);
    });

    it('should reset "error" on request and success', () => {
      const state = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_SUCCESS,
        payload: {
          ids: [1],
        },
      });
      assert.propertyVal(state, 'error', false);

      const state2 = locationListReducer(undefined, {
        type: FETCH_LOCATIONS_PENDING,
      });
      assert.propertyVal(state2, 'error', false);
    });
  });
});
