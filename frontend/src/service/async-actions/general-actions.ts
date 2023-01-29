import {createAsyncThunk} from '@reduxjs/toolkit';
import {Footballer} from '../../types/footballer';
import {Generics, GenericsWs} from '../../types/thunk-generics';
import {BackendCatalogRoutes} from '../../const/routes';
import {CountryLoc} from '../../types/country';
import {EVENT_POST_FOOTBALLER} from '../../const/api-config';

export const getFootballerListAction =
  createAsyncThunk<Array<Footballer>, undefined, Generics>(
    'async/catalog/getList',
    async (_arg, {extra: api}) => {
      const result = await api.get(BackendCatalogRoutes.LIST);
      return result.data;
    });

export const addFootballerAction =
  createAsyncThunk<Footballer, Footballer, Generics>(
    'async/catalog/add',
    async (arg, {extra: api}) => {
      const result = await api.post(BackendCatalogRoutes.LIST, arg);
      return result.data;
    });

export const addFootballerActionWs =
  createAsyncThunk<void, Footballer, GenericsWs>(
    'ws/catalog/add',
    async (arg, {extra: stompClient}) => {
      stompClient.send(EVENT_POST_FOOTBALLER, {}, JSON.stringify(arg));
    }
  );

export const getTeamListAction =
  createAsyncThunk<string[], undefined, Generics>(
    'async/catalog/getTeams',
    async (_arg, {extra: api}) => {
      const result = await api.get(BackendCatalogRoutes.TEAMS);
      return result.data;
    }
  );

export const getCountryList =
  createAsyncThunk<CountryLoc, undefined, Generics>(
    'async/catalog/getCountries',
    async (_arg, {extra: api}) => {
      const result = await api.get(BackendCatalogRoutes.COUNTRIES);
      return result.data;
    }
  );
