import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { setAppRehydrated } from './actions';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  autoRehydrate()
));

persistStore(store, {storage: AsyncStorage}, () => {
  store.dispatch(setAppRehydrated());
});

export default store;
