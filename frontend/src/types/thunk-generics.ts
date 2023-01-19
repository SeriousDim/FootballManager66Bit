import {AppDispatch, RootState} from '../store/store';
import {AxiosInstance} from 'axios';

export type Generics = {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}