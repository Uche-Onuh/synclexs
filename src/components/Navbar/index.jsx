import React, { useState } from "react";
import { logoblack, user } from "../../assets";
import { navLinks } from "../../constants";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice"; // Import your logout action
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  // Fetching isLoggedIn state from Redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Access isLoggedIn directly from the Redux store
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  const handleOpen = () => {
    setOpen((prev) => !prev);
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

      <ul className="hidden md:flex items-center justify-center gap-20">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="font-normal text-[15px] leading-[22px] hover:text-primary"
          >
            <NavLink to={link.path}>{link.display}</NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-2">
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
                {[
                  { path: "user/profile", label: "profile" },
                  { path: "user/deals", label: "deals" },
                  { path: "user/settings", label: "settings" },
                ].map(({ path, label }) => (
                  <li
                    key={path}
                    className="border-b-2 border-b-black px-4 py-4 text-[15px] font-medium leading-[22.5px]"
                    onClick={handleToggle}
                  >
                    <Link to={path}>{label}</Link>
                  </li>
                ))}
                <li
                  className="px-4 py-4 text-[15px] font-medium leading-[22.5px]"
                  onClick={handleLogout}
                >
                  <div>log out</div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] ">
            <NavLink to="auth/login">Login</NavLink>
          </div>
        )}
        <div
          className={`block md:hidden cursor-pointer hover:text-primary relative`}
          onClick={handleOpen}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <IoMdClose size={32} color={"red"} />
          ) : (
            <CiMenuBurger size={32} color={"#003574CC"} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`${
            open
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 pointer-events-none"
          } transform transition-transform duration-300 ease-in-out absolute top-[10%] bg-hover w-[50%] left-[50%] z-10 origin-top bg-alternate`}
        >
          <ul className="flex flex-col items-start justify-start gap-8 md:gap-20 py-4">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className=" px-4 text-[14px] leading-8 uppercase font-bold text-primary"
              >
                <NavLink to={link.path} onClick={handleOpen}>
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
