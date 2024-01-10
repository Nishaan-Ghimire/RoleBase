import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth";

const PrivateRoutes = ({ children }) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { state: { from: location } });
    }
  }, [accessToken, location, navigate]);

  return <div>{children}</div>;
};

export default PrivateRoutes;
