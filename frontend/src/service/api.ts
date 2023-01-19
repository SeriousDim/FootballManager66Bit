import axios, {AxiosError, AxiosResponse} from 'axios';
import {BACKEND_URL, TIMEOUT} from '../const/api-config';
import {ServerError} from '../types/error-types';
import {processErrorHandler} from './error-handler';

export const createApi = () => {
  const api = axios.create(
    {
      baseURL: BACKEND_URL,
      timeout: TIMEOUT
    }
  );

  api.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError<ServerError>) => {
      if (error.response) {
        const data = error.response.data;
        processErrorHandler(data.error);
      }
    }
  );

  return api;
};
