import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/UserSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({ user: UserReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

export default store;
