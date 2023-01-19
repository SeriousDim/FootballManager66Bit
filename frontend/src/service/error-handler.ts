import {store} from '../store/store';
import {setError} from '../store/slices/general-slice/general-slice';
import {toast} from 'react-toastify';

export const processErrorHandler = (message: string) => {
  store.dispatch(setError(message));
  toast.error(message);
};
