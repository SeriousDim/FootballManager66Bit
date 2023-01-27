import './App.css';
import {Header} from './components/header/Header';
import {Navigate, Route, Routes} from 'react-router-dom';
import {AppRoutes} from './const/routes';
import {ListPage} from './pages/list-page/list-page';
import {ThemeProvider} from '@mui/material';
import React from 'react';
import {AddPage} from './pages/add-page/add-page';
import {usePreferredTheme} from './app/hooks';
import {ToastWrapper} from './components/toast-wrapper/toast-wrapper';
import useWebSocket from 'react-use-websocket';
import {WS_URL} from './const/api-config';

function App() {
  const theme = usePreferredTheme();

  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header/>
        <Routes>
          <Route path={'/'} element={<Navigate to={AppRoutes.LIST}/>}/>
          <Route path={AppRoutes.LIST} element={<ListPage/>}/>
          <Route path={AppRoutes.ADD} element={<AddPage/>}/>
        </Routes>
        <ToastWrapper/>
      </div>
    </ThemeProvider>
  );
}

export default App;
