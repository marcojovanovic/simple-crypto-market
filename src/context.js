import React, { createContext, useState, useEffect } from 'react';

export const CryptoContext = createContext(); // izvoz za komponente

const CryptoProvider = ({ children }) => {
  // bitkoin USD component

  const [bitkoinUSD, setBitkoinUSD] = useState({
    symbol: '',
    dailyChange: '',
    volume: '',
    lastPrice: '',
  });

  // bitkoin EUR component
  const [bitkoinEUR, setBitkoinEUR] = useState({
    symbol: '',
    dailyChange: '',
    volume: '',
    lastPrice: '',
  });

  // ethereum USD component

  const [ethereumUSD, setEthereumUSD] = useState({
    symbol: '',
    dailyChange: '',
    volume: '',
    lastPrice: '',
  });

  // ethereum EUR component

  const [ethereumEUR, setEthereumEUR] = useState({
    symbol: '',
    dailyChange: '',
    volume: '',
    lastPrice: '',
  });

  // eos USD component

  const [eosUSD, setEosUSD] = useState({
    symbol: '',
    dailyChange: '',
    volume: '',
    lastPrice: '',
  });

  // LOGIN PAGE

  // boolean for fake auth

  const [login, setLogin] = useState(false);

  const toggleLogin = () => {
    setLogin(true);
  };

  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
  });

  // RANDOM USER ON CLICK BUTTON

  useEffect(() => {
    getRandomUserImage();
  }, []);

  async function getRandomUserImage() {
    const res = await fetch('https://randomuser.me/api?result=50');

    const { results } = await res.json();

    results.map((item) => {
      let userName = `${item.name.first} ${item.name.last}`;

      setUser({ name: userName, email: item.email, image: item.picture.large });
    });
  }

  return (
    <CryptoContext.Provider
      value={{
        user,
        setUser,
        getRandomUserImage,
        bitkoinEUR,
        setBitkoinEUR,
        bitkoinUSD,
        setBitkoinUSD,
        ethereumUSD,
        setEthereumUSD,
        ethereumEUR,
        setEthereumEUR,
        eosUSD,
        setEosUSD,
        login,
        setLogin,
        toggleLogin,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoProvider }; // izvoz za index.js
