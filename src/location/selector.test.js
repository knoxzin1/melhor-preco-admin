import { assert } from 'chai';
import {
  locationListSelector,
} from './index';

describe('location/selector.js', () => {
  describe('locationListSelector', () => {
    it('should return all locationList properties', () => {
      const state = {
        locationList: {
          ids: [],
          isFetching: false,
          isLoaded: false,
          isEmpty: false,
          error: false,
        },
        locationEntities: {}
      };

      const location = locationListSelector(state);

      assert.deepPropertyVal(state, 'locationList.ids', location.ids);
      assert.deepPropertyVal(state, 'locationList.isFetching', location.isFetching);
      assert.deepPropertyVal(state, 'locationList.isLoaded', location.isLoaded);
      assert.deepPropertyVal(state, 'locationList.isEmpty', location.isEmpty);
      assert.deepPropertyVal(state, 'locationList.error', location.error);
    });

    it('should return a locations property with all locations', () => {
      const state = {
        locationList: {
          ids: [],
          isFetching: false,
          isLoaded: false,
          isEmpty: false,
          error: false,
        },
        locationEntities: {}
      };
      const location = locationListSelector(state);
      assert.lengthOf(location.locations, 0);

      const state2 = {
        locationList: {
          ids: [1],
          isFetching: false,
          isLoaded: false,
          isEmpty: false,
          error: false,
        },
        locationEntities: {
          1: {
            name: 'test',
          },
          2: {
            name: 'test',
          },
        },
      };
      const location2 = locationListSelector(state2);
      assert.lengthOf(location2.locations, 1);
    });

    it('returned locations should have an id property', () => {
      const state = {
        locationList: {
          ids: [1],
          isFetching: false,
          isLoaded: false,
          isEmpty: false,
          error: false,
        },
        locationEntities: {
          1: {
            name: 'test',
          },
          2: {
            name: 'test',
          },
        },
      };
      const location = locationListSelector(state);
      assert.lengthOf(location.locations, 1);

      for (var loc of location.locations) {
        assert.property(loc, 'id');
      }
    });
  });
});
