import React, { useState } from "react";
import { Helmet } from "../../components";
import Select from "react-select";

import { VscTriangleDown } from "react-icons/vsc";

const options = [
  { value: "Kosofe", label: "Kosofe", min: 150000, max: 300000 },
  { value: "Alimosho", label: "Alimosho", min: 250000, max: 500000 },
  { value: "Ikorodu", label: "Ikorodu", min: 350000, max: 600000 },
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#003574CC", // Custom background for the select
    color: "#fff",
    fontSize: "27px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "27px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#fff", // Chevron color
    fontSize: "27px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#003574CC" : "#D9D9D9", // Background for options
    color: state.isSelected ? "#000" : "#000", // Text color for options
    fontSize: "27px",
    borderBottom: "2px solid #000", // Add a white border between options
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff", // Background for the menu
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "27px", // Font size for the placeholder
    color: "#fff", // Placeholder text color
  }),
};

// Custom dropdown indicator component
const CustomDropdownIndicator = (props) => {
  return (
    <div {...props.innerProps}>
      <VscTriangleDown
        style={{
          color: "#fff",
          fontSize: "27px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      />
    </div>
  );
};

// Currency formatter function
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

const AddDeal = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [rangeValue, setRangeValue] = useState(0);

  // Handle option change
  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setRangeValue(option.min); // Set the range value to the min of the selected option
  };

  // Handle range value change
  const handleRangeChange = (e) => {
    setRangeValue(Number(e.target.value));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet title="Add-deals">
        <section className="w-[90%] mx-auto py-16">
          <h1 className="text-[32px] font-semibold leading-[48px] mb-6">
            Location
          </h1>

          <Select
            options={options}
            styles={customStyles}
            placeholder="LGA"
            components={{
              DropdownIndicator: CustomDropdownIndicator, // Use custom dropdown icon
            }}
            onChange={handleSelectChange} // Track selected option
          />

          {/* Display the range bar if an option is selected */}
          {selectedOption && (
            <div className="mt-6">
              <h2 className="text-[20px] font-semibold mb-4">
                Properties price range between{" "}
                {formatCurrency(selectedOption.min)} and{" "}
                {formatCurrency(selectedOption.max)}
              </h2>
              <input
                type="range"
                min={selectedOption.min}
                max={selectedOption.max}
                value={rangeValue}
                onChange={handleRangeChange}
                className="w-full custom-range"
                style={{
                  background: `linear-gradient(to right, #708DB0 ${
                    ((rangeValue - selectedOption.min) /
                      (selectedOption.max - selectedOption.min)) *
                    100
                  }%, #fff ${
                    ((rangeValue - selectedOption.min) /
                      (selectedOption.max - selectedOption.min)) *
                    100
                  }%)`,
                }}
              />
              <p className="mt-2 text-[20px] font-semibold">
                Selected Price: {formatCurrency(rangeValue)}
              </p>
            </div>
          )}

          <button className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase mb-20">
            Continue
          </button>
        </section>
      </Helmet>
    </div>
  );
};

export default AddDeal;
