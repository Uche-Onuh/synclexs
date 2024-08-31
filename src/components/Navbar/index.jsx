import React from "react";
import { logoblack, user } from "../../assets";
import { navLinks } from "../../constants";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-[90%] mx-auto py-1 flex items-center justify-between">
      <div className="w-[96px] h-auto">
        <NavLink to="/">
          <img src={logoblack} alt="Synclexs logo" className="w-full h-full" />
        </NavLink>
      </div>

      <ul className="flex items-center justify-center gap-20">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="font-normal text-[15px] leading-[22px] hover:text-primary"
          >
            <NavLink to={link.path}>{link.display}</NavLink>
          </li>
        ))}
      </ul>

      <div className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000]">
        <NavLink to="user/signup">Sign up</NavLink>
      </div>
      {/* 
      <div className="w-[43px] h-[49px] cursor-pointer">
        <img src={user} alt="user" className="w-full h-full" />
      </div> */}
    </div>
  );
};

export default Navbar;
