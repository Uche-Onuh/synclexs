import React from "react";
import {
  Login,
  Signup,
  ForgortPassword,
  ResetPassword,
  VerifyEmail,
} from "../pages";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="user/login" element={<Login />} />
        <Route path="user/signup" element={<Signup />} />
        <Route path="user/forgot-password" element={<ForgortPassword />} />
        <Route path="user/reset-password" element={<ResetPassword />} />
        <Route path="user/verify-email" element={<VerifyEmail />} />
      </Route>
    </Routes>
  );
};

export default Routers;
