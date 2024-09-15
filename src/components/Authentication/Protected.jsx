import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("authToken");
  // console.log(token);
  return token ? children : <Navigate to="/login" />;
};

export default Protected;
