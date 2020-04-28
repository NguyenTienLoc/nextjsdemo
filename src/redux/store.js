import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import configureUser from './reducers/user';
import configureDevice from './reducers/device';

const doCreateStore = (reducer, initialState, options) => {
  const store = createStore(reducer, initialState,
    process.env.NODE_ENV === 'development' && options.type !== 'server'
      ? applyMiddleware(logger)
      : undefined,
  );
  store.options = options;
  return store;
};

const configureStore = (initialState, options, onRehydrationCompleted) => {
  const {type} = options ? options : {};
  if (type === 'server') {
    const reducer = combineReducers({
      user: configureUser,
      device: configureDevice,
    });
    return doCreateStore(reducer, initialState, options);
  }

  const config = {
    key: 'root',
    storage,
  };
  const reducer = persistCombineReducers(config, {
    user: configureUser,
    device: configureDevice,
  });
  const store = doCreateStore(reducer, initialState, options);
  const persistor = persistStore(store, null, onRehydrationCompleted);
  return {store, persistor};
};

export default configureStore;
