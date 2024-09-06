import React from "react";

const Cards = ({ bg, icon, text, title }) => {
  return (
    <div
      className={`w-[30%] h-auto rounded-[20px] py-14 px-14 ${bg} flex flex-col items-center justify-center text-white hover:scale-105 transition ease-in-out duration-700`}
    >
      <div className="text-[45px] mb-2">{icon}</div>
      <h1 className="font-semibold text-[24px] leading-[36px] mb-6">{title}</h1>
      <p className="font-medium text-[15px] leading-[22px] text-center">
        {text}
      </p>
    </div>
  );
};

export default Cards;
