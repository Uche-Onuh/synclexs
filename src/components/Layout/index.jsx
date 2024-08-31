import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Routers from "../../router/Routers";

import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <nav className="border-b-2 border-black">
        {location.pathname.startsWith("/user") ? "" : <Navbar />}
      </nav>
      <div>
        <Routers />
      </div>
      <footer className="bg-alternate w-full h-auto">
        {location.pathname.startsWith("/user") ? "" : <Footer />}
      </footer>
    </>
  );
};

export default Layout;
