import React, { useState } from "react";
import { Cards, Helmet, Steps } from "../../components";
import { cards, badges, partners, steps, faqs } from "../../constants";
import { aboutimg, faq } from "../../assets";
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

const Homepage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Helmet title="Home">
      <section className="w-full h-[75vh] bg-herobg bg-cover bg-no-repeat bg-center relative">
        <div className="bg-black opacity-50 absolute h-full w-full"></div>
        <div className="absolute top-[25%] md:left-[50px] px-10">
          <h1 className="text-[30px] md:text-[50px] font-bold max-w-[100%] md:max-w-[40%] mb-10 text-primary">
            "Sealing Property Deals with Legal Precision."
          </h1>
          <p className="font-medium text-[14px] md:text-[16px] md:max-w-[85%] text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            nobis voluptates iure, odit recusandae similique quod veritatis
            tempore quidem distinctio, voluptatibus voluptas, et unde omnis
            tenetur nulla consectetur? Pariatur eveniet sapiente laudantium
            enim. Dolorum illum maiores, soluta ullam labore libero ratione
            aliquam, id, nulla molestias quidem. In impedit quaerat sit.
          </p>
        </div>
      </section>

      <section className="w-[90%] mx-auto flex flex-col md:flex-row mt-5 gap-7">
        {cards.map((card) => (
          <Cards
            key={card.id}
            bg={card.bg}
            icon={<card.icon />}
            text={card.text}
            title={card.title}
          />
        ))}
      </section>

      <section id="about" className="w-[90%] h-auto mx-auto flex flex-col md:flex-row justify-center items-center mt-16">
        <div className="w-full md:w-[55%] flex flex-col md:flex-row justify-center items-center bg-alternate">
          <div className="w-full md:w-[25%] h-[600px]">
            <img
              src={aboutimg}
              alt="about"
              className="w-full h-full object-fill"
            />
          </div>
          <div className="w-full md:w-[75%] bg-alternate py-20 px-6 text-white">
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
        <div className="w-full md:w-[45%] py-[29px] px-6 shadow-2xl rounded-xl">
          <h1 className="font-semibold text-[26px] leading-[39px] mb-2 md:mb-14">
            Why Choose us
          </h1>
          <p className="font-medium text-[15px] leading-[22.5px]  mb-6 md:mb-14">
            Lorem ipsum dolor sit amet, consectetur adipisng elit. Sed do
            eiusmod tempor incididunt ut laboreet dolore magna aliqua
          </p>

          <div>
            {badges.map((badge) => (
              <div
                className="flex justify-start items-center md:item-top gap-4 mb-16 "
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

      <section id="partners" className="w-[90%] h-auto mx-auto flex flex-col md:flex-row justify-between items-center mt-16">
        <div className="w-full md:w-[30%]">
          <h1 className="text-[26px] font-bold leading-[75px] mb-2">
            Our partners
          </h1>
          <p className=" font-medium text-[15px] leading-[22.5px] mb-14">
            Lorem ipsum dolor sit amet, consectetur adipisng elit. Sed do
            eiusmod tempor incididunt ut laboreet dolore magna aliqua
          </p>
        </div>
        <div className="w-[70%] flex flex-col md:flex-row items-center justify-center gap-20">
          {partners.map((partner) => (
            <div key={partner.id} className="w-full md:w-[197px] h-[139px]">
              <img
                src={partner.src}
                alt="our partners"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="w-full h-auto bg-servicebg bg-no-repeat bg-cover bg-top mt-10 relative">
        <div className="absolute w-full h-full bg-alternate opacity-50"></div>
        <div className="w-[90%] mx-auto pt-20 pb-28 text-white relative z-10 ">
          <h1 className="text-[55px] font-bold leading-[75px] mb-12">
            Our Services
          </h1>
          <p className="font-medium text-[15px] leading-[22.5px] mb-14 max-w-full md:max-w-[40%]">
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
          <h1 className="text-[25px] md:text-[55px] font-bold leading-[75px] mb-6">
            Our Working Process
          </h1>
          <p className="font-medium text-[15px] leading-[22.5px] mb-2 md:mb-14 max-w-full md:max-w-[25%] mx-auto ">
            Lorem ipsum dolor sit amet, consectetur adipisng elit. Sed do
            eiusmod tempor.
          </p>
        </div>

        <div className="flex justify-between items-center flex-col md:flex-row gap-20 md:gap-4 mt-20">
          {steps.map((step) => (
            <Steps
              key={step.id}
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

      <section id="faqs" className="w-[90%] h-auto mx-auto my-16">
        <div className="w-[90%] text-black mx-auto text-center">
          <h1 className="font-bold text-[25px] md:text-[48px] leading-[30px] md:leading-[62.5px] mb-5">
            Frequently Asked Questions
          </h1>
          <p className="font-normal text-[16px] leading-[22px] mb-20">
            Here are some questions that have been frequently asked.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center item-middle gap-5">
          <div className=" w-full md:w-1/2">
            <img src={faq} alt="" className="w-full object-contain" />
          </div>
          <div className="w-full md:w-1/2 text-black mx-auto md:px-6">
            {faqs.map((faq, i) => (
              <div className="p-[40px] rounded-[8px] bg-grey mb-3" key={faq.id}>
                <div
                  className="flex justify-between items-center cursor-pointer "
                  onClick={() => handleToggleAnswer(i)}
                >
                  <p className="font-bold text-[16px] leading-[22px]">
                    {i + 1}. {faq.question}
                  </p>

                  <div
                    className={`transform transition-transform bg-primary p-[2px] rounded-full ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  >
                    <IoChevronDown />
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-max-height duration-300 ${
                    openIndex === i ? "max-h-[200px]" : "max-h-0"
                  }`}
                >
                  <div className="mt-4 text-[14px]  text-tertiary">
                    <p className="font-medium">{faq.reply}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Homepage;
