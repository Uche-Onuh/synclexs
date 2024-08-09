import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Routers from "../../router/Routers";

import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <nav>{location.pathname.startsWith("/user") ? "" : <Navbar />}</nav>
      <div>
        <Routers />
      </div>
      <footer>{location.pathname.startsWith("/user") ? "" : <Footer />}</footer>
    </>
  );
};

export default Layout;
