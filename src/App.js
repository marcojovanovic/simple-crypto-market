import React from 'react';

// importing pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

// importing components

import { Navbar } from './components';

// importing context

import { CryptoContext } from './context';

function App() {
  const { login } = React.useContext(CryptoContext);

  return (
    <>
      <Navbar />
      <div>
        {!login ? (
          <>
            <HomePage />
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </>
  );
}
export default App;
