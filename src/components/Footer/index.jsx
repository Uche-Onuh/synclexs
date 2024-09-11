import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-white py-2 w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center ">
        <h1> Copyright © {currentYear} Synclexs. All rights reserved.</h1>
        <div className="flex justify-center items-center gap-5">
          <div className="text-white text-[20px]">
            <p>Follow:</p>
          </div>
          <div className="text-white text-[20px]">
            <Link>
              <FaInstagram />
            </Link>
          </div>
          <div className="text-white text-[20px]">
            <Link>
              <FaXTwitter />
            </Link>
          </div>
          <div className="text-white text-[20px]">
            <Link>
              <FaFacebookSquare />
            </Link>
          </div>
          <div className="text-white text-[20px]">
            <Link>
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
