import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-white py-16 w-[90%] mx-auto">
      <h1 className="text-[50px] leading-[75px] font-semibold max-w-[50%]">
        Join Synclex Today. <br /> Securing the best deals.
      </h1>

      <div className="flex justify-evenly items-center mt-20 text-center">
        <div>
          <h1 className="font-semibold text-[22px] leading-[33px] mb-4">
            Email
          </h1>
          <Link
            to="mailto:loremipsum@gmail.com"
            className="font-medium text-[15px] leading-[22.5px]"
          >
            loremipsum@gmail.com
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-[22px] leading-[33px] mb-4">
            Phone
          </h1>
          <Link
            to="tel:(234) 000 000 0000"
            className="font-medium text-[15px] leading-[22.5px]"
          >
            (234) 000 000 0000
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-[22px] leading-[33px] mb-4">
            Follow
          </h1>
          <div className="flex justify-center items-center gap-5">
            <div className="text-white text-[30px]">
              <FaInstagram />
            </div>
            <div className="text-white text-[30px]">
              <FaXTwitter />
            </div>
            <div className="text-white text-[30px]">
              <FaFacebookSquare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
