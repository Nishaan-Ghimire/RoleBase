import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUserString = localStorage.getItem("user");

    if (storedAccessToken && storedUserString) {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUserString));
    }
    // Additional data fetching from the server can be placed here if needed
  }, []);

  const setAuthData = (newAccessToken, newUser) => {
    setAccessToken(newAccessToken);
    setUser(newUser);

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const clearAuthData = () => {
    setAccessToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const contextValue = {
    accessToken,
    user,
    setAuthData,
    clearAuthData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;