import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider, } from './context/useData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContextProvider>
  </React.StrictMode>
);