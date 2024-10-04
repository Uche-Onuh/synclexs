import React from "react";
import {
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  Homepage,
  Settings,
  Deals,
  DealsDetail,
  AddDeal,
  Profile,
  Editprofile,
} from "../pages";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" index element={<Homepage />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="user/register" element={<Settings />} />
        <Route path="user/deals" element={<Deals />} />
        <Route path="user/deals/:id" element={<DealsDetail />} />
        <Route path="user/add-deal" element={<AddDeal />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/edit-profile" element={<Editprofile />} />
      </Route>

      <Route path="/*">
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="auth/reset-password" element={<ResetPassword />} />
        <Route path="auth/verify-email/:email" element={<VerifyEmail />} />
      </Route>
    </Routes>
  );
};

export default Routers;
