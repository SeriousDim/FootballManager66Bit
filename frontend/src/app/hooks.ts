import {createTheme, useMediaQuery} from '@mui/material';
import React from 'react';
import {ruRU} from '@mui/material/locale';

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
