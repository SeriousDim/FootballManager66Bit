import {createTheme, useMediaQuery} from '@mui/material';
import React from 'react';
import {ruRU} from '@mui/material/locale';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function usePreferredTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }, ruRU),
    [prefersDarkMode],
  );
}
