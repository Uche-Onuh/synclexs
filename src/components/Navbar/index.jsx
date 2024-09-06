import React, { useState } from "react";
import { logoblack, user } from "../../assets";
import { navLinks } from "../../constants";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice"; // Import your logout action

const Navbar = () => {
  // Fetching isLoggedIn state from Redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Access isLoggedIn directly from the Redux store
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update the Redux store
  };

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

      {isLoggedIn ? (
        <div
          className="w-[43px] h-[49px] cursor-pointer relative rounded-full"
          onClick={handleToggle}
        >
          <img src={user} alt="user" className="w-full h-full" />
          <div
            className={`${
              toggle
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 pointer-events-none"
            } transform transition-transform duration-300 ease-in-out absolute top-[100%] bg-hover   w-[250px] left-[-400%] z-10 origin-top bg-white`}
            aria-expanded={toggle}
            aria-controls="user-menu"
          >
            <ul className="uppercase">
              <li
                className="border-b-2 border-b-black px-4 py-4 text-[15px] font-medium leading-[22.5px]"
                onClick={handleToggle}
              >
                <Link to="user/profile"> profile</Link>
              </li>
              <li className="border-b-2 border-b-black px-4 py-4 text-[15px] font-medium leading-[22.5px]">
                <Link to="user/deals" onClick={handleToggle}>
                  deals
                </Link>
              </li>
              <li className="border-b-2 border-b-black px-4 py-4 text-[15px] font-medium leading-[22.5px]">
                <Link to="user/settings" onClick={handleToggle}>
                  settings
                </Link>
              </li>
              <li className=" px-4 py-4 text-[15px] font-medium leading-[22.5px]">
                <div onClick={handleLogout}>log out</div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] ">
          <NavLink to="auth/signup">Sign up</NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
