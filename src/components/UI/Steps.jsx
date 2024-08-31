import React from "react";

const Steps = ({ id, head, title, text, icon, bg, textCol }) => {
  return (
    <div
      key={id}
      className={`${bg} py-20 px-10 rounded-2xl textCol relative text-center`}
    >
      <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] translate-y-[20%] text-[60px] bg-alternate p-5 rounded-full text-white">
        {icon}
      </div>
      <div className={`${textCol}`}>
        <h3 className="text-primary mb-4 text-[12px]">{head}</h3>
        <h1 className="text-[22px] leading-[33px] font-semibold mb-10">
          {title}
        </h1>
        <p className="font-medium text-[15px] leading-[22.5px] mb-14 max-w-[75%] mx-auto">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Steps;
