import { createSelector } from 'reselect';

export const locationListSelector = createSelector(
  (state) => state.locationList,
  (state) => state.locationEntities,
  (locationList, locationEntities) => {
    return {
      ...locationList,
      locations: locationList.ids.map((id) => {
        return {
          ...locationEntities[id],
          id: id,
        };
      })
    };
  }
);

export function locationEntitiesSelector(id) {
  return createSelector(
    (state) => state.locationEntities,
    (locationEntities) => {
      return locationEntities[id];
    }
  );
}

export const locationSelector = createSelector(
  (state) => state.location,
  (location) => {
    return location;
  }
);
