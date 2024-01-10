import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Function to set the access token
  const setToken = (token) => {
    setAccessToken(token);
  };

  // Retrieve access token from localStorage on component mount (if exists)
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  // Value to be provided by the context
  const contextValue = {
    accessToken,
    setToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
