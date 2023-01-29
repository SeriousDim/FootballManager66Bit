import {AppDispatch, RootState} from '../store/store';
import {AxiosInstance} from 'axios';
import Stomp from 'stompjs';

export type Generics = {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}

export type GenericsWs = {
  dispatch: AppDispatch,
  state: RootState,
  extra: Stomp.Client
}
