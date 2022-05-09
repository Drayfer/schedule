import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/UserSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import OptionsSlice from './reducers/OptionsSlice';
import StudentSlice from './reducers/StudentSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
};

const rootReducer = combineReducers({
  user: UserReducer,
  options: OptionsSlice,
  student: StudentSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

export default store;
