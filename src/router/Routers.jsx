import React from "react";
import { Login, Signup } from "../pages";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="user/login" element={<Login />} />
        <Route path="user/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default Routers;
