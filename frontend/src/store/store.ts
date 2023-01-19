import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../service/api';
import generalSlice from './slices/general-slice/general-slice';

export const api = createApi();

export const store = configureStore({
  reducer: {
    general: generalSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
