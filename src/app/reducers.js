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
  productFormReducer,
} from '../product';

import {
  loginReducer,
  loginFormReducer,
} from '../login';

const rootReducer = combineReducers({

  app: appReducer,

  locationList: locationListReducer,
  locationEntities: locationEntitiesReducer,
  location: locationReducer,

  product: productReducer,
  products: productsReducer,
  productForm: productFormReducer,

  login: loginReducer,
  loginForm: loginFormReducer,
});

export default rootReducer;
