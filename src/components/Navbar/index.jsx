import React, { useState, useEffect } from "react";
import { logoblack, user } from "../../assets";
import { navLinks } from "../../constants";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

// Utility function for dynamic classnames
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const { token, expirationTime, isLoggedIn, isLawyer } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false); // User dropdown state
  const [open, setOpen] = useState(false); // Mobile menu state

  const handleToggle = () => {
    setToggle((prev) => {
      if (!prev && open) setOpen(false); // Close mobile menu if opening user menu
      return !prev;
    });
  };

  const closeMenu = () => setToggle(false); // Close user menu

  const handleOpen = () => {
    setOpen((prev) => {
      if (!prev && toggle) setToggle(false); // Close user menu if opening mobile menu
      return !prev;
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  useEffect(() => {
    if (token && expirationTime) {
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;

      const logoutTimer = setTimeout(() => {
        dispatch(logout());
      }, timeLeft);

      return () => clearTimeout(logoutTimer);
    }
  }, [token, expirationTime, dispatch]);

  return (
    <div className="w-[90%] mx-auto py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="w-[96px] h-auto">
        <NavLink to="/">
          <img src={logoblack} alt="Synclexs logo" className="w-full h-full" />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center justify-center gap-20">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="font-normal text-[15px] leading-[22px] hover:text-primary transition-all duration-300"
          >
            <a href={link.path}>{link.display}</a> {/* In-page link */}
          </li>
        ))}
      </ul>

      {/* User Actions and Mobile Menu */}
      <div className="flex items-center justify-center gap-2 relative">
        {/* User Dropdown */}
        {isLoggedIn ? (
          <div className="w-[43px] h-[49px] cursor-pointer relative rounded-full">
            <button
              onClick={handleToggle}
              aria-expanded={toggle}
              aria-label="Toggle user menu"
              className="w-full h-full"
            >
              <img src={user} alt="User Avatar" className="w-full h-full" />
            </button>
            <div
              className={classNames(
                "transform transition-transform duration-300 ease-in-out absolute top-[100%] left-[-400%] bg-white w-[250px] z-10 origin-top",
                toggle
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0 pointer-events-none"
              )}
              role="menu"
              tabIndex={-1}
              onKeyDown={(e) => e.key === "Escape" && closeMenu()}
            >
              <ul className="uppercase">
                {[
                  { path: "user/profile", label: "Profile" },
                  { path: "user/deals", label: "Deals" },
                ].map(({ path, label }) => (
                  <li
                    key={path}
                    className="border-b-2 border-black px-4 py-4 text-[15px] font-medium leading-[22.5px]"
                  >
                    <Link to={path} onClick={closeMenu}>
                      {label}
                    </Link>
                  </li>
                ))}

                {!isLawyer && (
                  <li className="border-b-2 border-black px-4 py-4 text-[15px] font-medium leading-[22.5px]">
                    <Link to="user/register" onClick={closeMenu}>
                      REGISTER LAWYER
                    </Link>
                  </li>
                )}

                <li className="px-4 py-4 text-[15px] font-medium leading-[22.5px]">
                  <button onClick={handleLogout} className="w-full text-left">
                    LOG OUT
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <NavLink
            to="auth/login"
            className="bg-alternate py-2 px-4 rounded-lg font-normal text-[15px] text-white hover:bg-primary hover:text-[#000] transition-all duration-300"
          >
            Login
          </NavLink>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden"
          onClick={handleOpen}
          aria-expanded={open}
          aria-label="Toggle mobile menu"
        >
          {open ? (
            <IoMdClose size={24} color="red" />
          ) : (
            <CiMenuBurger size={24} color="#003574CC" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={classNames(
            "transform transition-transform duration-300 ease-in-out absolute top-[100%]  bg-white z-10 origin-top w-[250px]",
            isLoggedIn ? "left-[-230%]" : "left-[-130%]",
            open
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 pointer-events-none"
          )}
        >
          <ul className="flex flex-col items-start justify-start gap-8 md:gap-20 py-4">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="px-4 text-[14px] leading-8 uppercase font-bold text-alternate"
              >
                <a href={link.path} onClick={handleOpen}>
                  {link.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
