import React, { createContext, useState } from 'react';

const ContextoGambiarra = createContext();

function ContextoGambiarraProvider({ children }) {
  const [admin, setAdmin] = useState('');

  const updateAdmin = () => {
    setAdmin(!admin);
  };

  return (
    <ContextoGambiarra.Provider value={{ admin, updateAdmin }}>
      {children}
    </ContextoGambiarra.Provider>
  );
}

export { ContextoGambiarra, ContextoGambiarraProvider };