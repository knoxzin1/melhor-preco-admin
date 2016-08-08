import { combineReducers } from 'redux';

import { appReducer } from './reducer';

import {
  locationListReducer,
  locationEntitiesReducer,
  locationReducer,
} from '../location';

import {
  productReducer,
  productsReducer,
} from '../product';

const rootReducer = combineReducers({

  app: appReducer,

  locationList: locationListReducer,
  locationEntities: locationEntitiesReducer,
  location: locationReducer,

  product: productReducer,
  products: productsReducer,
});

export default rootReducer;
