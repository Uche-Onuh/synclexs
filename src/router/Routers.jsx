import React from "react";
import {
  Login,
  Signup,
  ForgortPassword,
  ResetPassword,
  VerifyEmail,
  Homepage,
} from "../pages";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" index element={<Homepage />} />

      <Route path="/*">
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="auth/forgot-password" element={<ForgortPassword />} />
        <Route path="auth/reset-password" element={<ResetPassword />} />
        <Route path="auth/verify-email/:email" element={<VerifyEmail />} />
      </Route>
    </Routes>
  );
};

export default Routers;
