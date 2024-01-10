import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth";

const AdminRoutes = ({ children }) => {
  const { user,accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!user.role){
      navigate("/login", { state: { from: location } });
    }

    if (accessToken && user.role !== "admin") {
      navigate("/user-status", { state: { from: location } });
    }
  }, [accessToken, location, navigate]);

  return <>{children}</>;
};

export default AdminRoutes;
    