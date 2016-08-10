import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { setAppRehydrated } from './actions';
import { clearProductForm } from '../product';

let middlewares = [thunk];

if (__DEV__) {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(reducers, compose(
  applyMiddleware(...middlewares),
  autoRehydrate()
));

const options = {
  storage: AsyncStorage,
  blacklist: ['productForm', 'loginForm'],
};

persistStore(store, options, () => {
  store.dispatch(setAppRehydrated());
});

export default store;
