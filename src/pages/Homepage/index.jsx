import React from "react";
import { Cards, Helmet, Steps } from "../../components";
import { cards, badges, partners, steps } from "../../constants";
import { aboutimg } from "../../assets";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Helmet title="Home">
      <section className="w-full h-[75vh] bg-herobg bg-cover bg-no-repeat bg-center relative">
        <div className="bg-black opacity-50 absolute h-full w-full"></div>
        <div className="absolute top-[25%] left-[50px] px-10">
          <h1 className="text-[50px] font-bold max-w-[40%] mb-10 text-primary">
            "Sealing Property Deals with Legal Precision."
          </h1>
          <p className="font-medium text-[16px] max-w-[85%] text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            nobis voluptates iure, odit recusandae similique quod veritatis
            tempore quidem distinctio, voluptatibus voluptas, et unde omnis
            tenetur nulla consectetur? Pariatur eveniet sapiente laudantium
            enim. Dolorum illum maiores, soluta ullam labore libero ratione
            aliquam, id, nulla molestias quidem. In impedit quaerat sit.
          </p>
        </div>
      </section>

      <section className="w-[90%] mx-auto flex mt-5 gap-7">
        {cards.map((card) => (
          <Cards
            bg={card.bg}
            icon={<card.icon />}
            text={card.text}
            title={card.title}
            id={card.id}
          />
        ))}
      </section>

      <section className="w-[90%] h-auto mx-auto flex justify-center items-center mt-16">
        <div className="w-[55%] flex justify-center items-center bg-alternate">
          <div className="w-[25%] h-[600px]">
            <img
              src={aboutimg}
              alt="about"
              className="w-full h-full object-fill"
            />
          </div>
          <div className="w-[75%] bg-alternate py-20 px-6 text-white">
            <h1 className="text-[55px] font-bold leading-[75px] mb-16">
              About Us
            </h1>
            <p className="text-[15px] font-medium leading-[22.5px] mb-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nis ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <p className="text-[15px] font-medium leading-[22.5px] mb-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempo incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </div>
        <div className="w-[45%] py-[29px] px-6 shadow-2xl rounded-xl">
          <h1 className="font-semibold text-[26px] leading-[39px] mb-14">
            Why Choose us
          </h1>
          <p className=" font-medium text-[15px] leading-[22.5px] mb-14">
            Lorem ipsum dolor sit amet, consectetur adipisng elit. Sed do
            eiusmod tempor incididunt ut laboreet dolore magna aliqua
          </p>

          <div>
            {badges.map((badge) => (
              <div
                className="flex justify-start align-top gap-4 mb-16 "
                key={badge.id}
              >
                <div className="bg-primary p-2 text-[30px] text-white rounded-lg">
                  <badge.icon />
                </div>
                <div>
                  <h2 className="font-semibold text-[22px] leading-[33px]">
                    {badge.title}
                  </h2>
                  <p className="font-medium text-[15px] leading-[22.5px]">
                    {badge.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-[90%] h-auto mx-auto flex justify-between items-center mt-16">
        <div className="w-[30%]">
          <h1 className="text-[26px] font-bold leading-[75px] mb-2">
            Our partners
          </h1>
          <p className=" font-medium text-[15px] leading-[22.5px] mb-14">
            Lorem ipsum dolor sit amet, consectetur adipisng elit. Sed do
            eiusmod tempor incididunt ut laboreet dolore magna aliqua
          </p>
        </div>
        <div className="w-[70%] flex items-center justify-center gap-20">
          {partners.map((partner) => (
            <div key={partner.id} className="w-[197px] h-[139px]">
              <img
                src={partner.src}
                alt="our partners"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full h-auto bg-servicebg bg-no-repeat bg-cover bg-top mt-10 relative">
        <div className="absolute w-full h-full bg-alternate opacity-50"></div>
        <div className="w-[90%] mx-auto pt-20 pb-28 text-white relative z-10 ">
          <h1 className="text-[55px] font-bold leading-[75px] mb-12">
            Our Services
          </h1>
          <p className="font-medium text-[15px] leading-[22.5px] mb-14 max-w-[40%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nis ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. et dolore magna aliqua.
          </p>

          <Link
            to="/services"
            className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000]"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="w-[90%] h-auto mx-auto mt-16">
        <div className="text-center">
          <h1 className="text-[55px] font-bold leading-[75px] mb-6">
            Our Working Process
          </h1>
          <p className="font-medium text-[15px] leading-[22.5px] mb-14 max-w-[25%] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisng elit. Sed do
            eiusmod tempor.
          </p>
        </div>

        <div className="flex justify-between items-center mt-20">
          {steps.map((step) => (
            <Steps
              id={step.id}
              icon={<step.icon />}
              head={step.head}
              title={step.title}
              text={step.text}
              bg={step.bg}
              textCol={step.textCol}
            />
          ))}
        </div>
      </section>
    </Helmet>
  );
};

export default Homepage;
