import {ToastContainer} from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

export function ToastWrapper() {
  return (
    <ToastContainer
      theme={'colored'}
      position={'bottom-left'}/>
  );
}
