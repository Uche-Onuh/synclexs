import React from "react";
import { Cards } from "../../components";
import { cards } from "../../constants";

const Homepage = () => {
  return (
    <>
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
            icon={<card.icon/>}
            text={card.text}
            title={card.title}
          />
        ))}
      </section>
    </>
  );
};

export default Homepage;
