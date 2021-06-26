import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CryptoProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
