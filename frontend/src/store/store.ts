import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../service/api';
import generalSlice from './general-slice/general-slice';
import tableRowsSlice from './table-rows-slice/table-rows-slice';

export const api = createApi();

export const store = configureStore({
  reducer: {
    general: generalSlice,
    tableRows: tableRowsSlice
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
