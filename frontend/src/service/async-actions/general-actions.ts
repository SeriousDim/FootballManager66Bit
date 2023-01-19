import {createAsyncThunk} from '@reduxjs/toolkit';
import {Footballer} from '../../types/footballer';
import {Generics} from '../../types/thunk-generics';
import {BackendCatalogRoutes} from '../../const/routes';
import {CountryLoc} from '../../types/country';

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
