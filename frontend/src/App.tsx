import './App.css'
import {Header} from './components/header/Header';
import {Navigate, Route, Routes} from 'react-router-dom';
import {AppRoutes} from './const/routes';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {ListPage} from './pages/list-page/list-page';
import {createTheme, ThemeProvider, useMediaQuery} from '@mui/material';
import React from 'react';
import { ruRU } from '@mui/material/locale';
import {FootballerForm} from './components/forms/footballer-form/footballer-form';
import {AddPage} from './pages/add-page/add-page';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }, ruRU),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header/>
        <Routes>
          <Route path={'/'} element={<Navigate to={AppRoutes.LIST}/>}/>
          <Route path={AppRoutes.LIST} element={<ListPage/>}/>
          <Route path={AppRoutes.ADD} element={<AddPage/>}/>
        </Routes>
        <ToastContainer
          theme={'colored'}
          position={'bottom-left'}/>
      </div>
    </ThemeProvider>
  )
}

export default App
