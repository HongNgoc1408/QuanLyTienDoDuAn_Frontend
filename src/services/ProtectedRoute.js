import { message } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    message.warning("Vui lòng đăng nhập để truy cập trang này.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
