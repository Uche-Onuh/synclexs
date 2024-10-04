import React, { useState, useRef } from "react";
import { Helmet, LoadingSpinner } from "../../components";
import Select from "react-select";
import { VscTriangleDown } from "react-icons/vsc";
import { useDropzone } from "react-dropzone";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utilityFunctions/functions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CREATE_DEAL = "deals/";

const options = [
  { value: "Kosofe", label: "Kosofe" },
  { value: "Alimosho", label: "Alimosho" },
  { value: "Ikorodu", label: "Ikorodu" },
];

const options2 = [
  {
    id: "conveyancing",
    value: "Conveyancing & Assignments",
    label: "Conveyancing & Assignments",
  },
  { id: "mortgage", value: "Mortgage", label: "Mortgage" },
];

const propertyTypes = [
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
  { value: "office-space", label: "Office Space" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#003574CC",
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
    color: "#fff",
    fontSize: "27px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#003574CC" : "#D9D9D9",
    color: state.isSelected ? "#000" : "#000",
    fontSize: "27px",
    borderBottom: "2px solid #000",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "27px",
    color: "#fff",
  }),
};

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

const AddDeal = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [commission, setCommission] = useState(null);
  const [priceValue, setPriceValue] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.user.token);

  const [formData, setFormData] = useState({
    location: "",
    transactionType: "",
    priceValue: priceValue,
    propertyType: "",
    propertyFiles: [],
    commission: "",
  });

  const onDrop = (acceptedFiles, fileRejections) => {
    setError("");
    if (acceptedFiles.length) {
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({
          file, // Keep the actual file for submission
          name: file.name,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
          type: file.type,
        })),
      ]);
    }
    if (fileRejections.length) {
      setError("Some files were rejected due to unsupported formats.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "image/*": [],
    },
  });

  const removeFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setFormData({ ...formData, location: option.value });
  };

  const handleTransactionChange = (option) => {
    setSelectedTransaction(option);
    setFormData({ ...formData, transactionType: option.value });
  };

  const handlePriceChange = (e) => {
    const price = Number(e.target.value);
    setPriceValue(price);

    let commission = 0;

    // Check the selected transaction type
    if (selectedTransaction && selectedTransaction.value === "Mortgage") {
      // Calculate commission for mortgage transactions
      if (price < 50000000) {
        commission = price * 0.04; // 4% for properties < ₦50m
      } else if (price >= 50000000 && price <= 100000000) {
        commission = 2000000 + ((price - 50000000) / 10000000) * 300000; // ₦2m + 3% for excess
      } else if (price > 100000000) {
        commission = 4500000 + ((price - 100000000) / 10000000) * 200000; // ₦4.5m + 2% for excess
      }
    } else {
      if (price < 50000000) {
        commission = price * 0.1;
      } else if (price >= 50000000 && price <= 100000000) {
        commission = 5000000;
        const excessAmount = price - 50000000;
        commission += (excessAmount / 10000000) * (0.05 * 10000000);
      } else if (price > 100000000) {
        commission = 7500000;
        const excessAmount = price - 100000000;
        commission += (excessAmount / 10000000) * (0.02 * 10000000);
      }
    }

    setCommission(commission);
    // Now set the formData with the updated values
    setFormData((prevData) => ({
      ...prevData,
      priceValue: price,
      commission: commission, // Update commission here as well
    }));
  };

  const handlePropertyTypeChange = (option) => {
    setPropertyType(option);
    setFormData({ ...formData, propertyType: option.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Prepare data for submission to backend
    const dealData = new FormData();
    dealData.append("location", formData.location);
    dealData.append("property_value", formData.priceValue);
    dealData.append("property_type", formData.propertyType);
    dealData.append("deal_type", formData.transactionType);
    dealData.append("commission", formData.commission);
    uploadedFiles.forEach((file) => dealData.append("documents", file.file));

    // Submit to backend (replace with actual backend URL)
    try {
      setLoading(true);
      const response = await axios.post(CREATE_DEAL, dealData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log("Deal submitted successfully:", response.data);
      toast.success("Deal successfully created, Redirecting to payment");
      setTimeout(() => {
        navigate("/payment");
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to submit deal. Please try again.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Helmet title="Add-deals">
        <section className="w-[90%] mx-auto py-16 ">
          {step === 1 && (
            <Step1
              nextStep={nextStep}
              handleSelectChange={handleSelectChange}
              handlePriceChange={handlePriceChange}
              selectedOption={selectedOption}
              handleTransactionChange={handleTransactionChange}
              priceValue={priceValue}
              selectedTransaction
            />
          )}
          {step === 2 && (
            <Step2
              nextStep={nextStep}
              prevStep={prevStep}
              handlePropertyTypeChange={handlePropertyTypeChange}
              commission={commission}
              priceValue={priceValue}
              propertyType={propertyType}
              selectedOption={selectedOption}
              uploadedFiles={uploadedFiles}
              fileInputRef={fileInputRef}
              getRootProps={getRootProps} // Passing dropzone props
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              error={error}
              removeFile={removeFile}
            />
          )}
          {step === 3 && (
            <Step3
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              formData={formData}
              uploadedFiles={uploadedFiles}
              priceValue={priceValue}
              propertyType={propertyType}
              commission={commission}
              selectedTransaction={selectedTransaction}
            />
          )}
        </section>
      </Helmet>
    </div>
  );
};

const Step1 = ({
  nextStep,
  handleSelectChange,
  handleTransactionChange,
  selectedOption,
  handlePriceChange,
  priceValue,
  selectedTransaction,
}) => (
  <>
    <h1 className="text-[32px] font-semibold leading-[48px] mb-6">Location</h1>
    <Select
      options={options}
      styles={customStyles}
      placeholder="LGA"
      components={{ DropdownIndicator: CustomDropdownIndicator }}
      onChange={handleSelectChange}
    />

    {selectedOption && (
      <div className="my-6">
        <Select
          options={options2}
          styles={customStyles}
          placeholder="Transaction"
          components={{ DropdownIndicator: CustomDropdownIndicator }}
          onChange={handleTransactionChange}
        />
      </div>
    )}

    {selectedOption && (
      <div className="flex flex-col mt-4 gap-3 mb-6">
        <label htmlFor="price" className="text-[20px]">
          Price
        </label>
        <input
          disabled={!selectedTransaction}
          type="text"
          id="price"
          placeholder="Enter the amount here"
          className="border-[1px] border-black py-3 px-2 rounded-lg text-[20px]"
          onChange={handlePriceChange}
        />
      </div>
    )}

    <button
      className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase mb-20 absolute bottom-4 right-20"
      onClick={nextStep}
      disabled={!priceValue}
    >
      Continue
    </button>
  </>
);

const Step2 = ({
  priceValue,
  nextStep,
  prevStep,
  handlePropertyTypeChange,
  selectedOption,
  propertyType,
  uploadedFiles,
  getRootProps, // Receiving dropzone props
  getInputProps,
  isDragActive,
  error,
  removeFile,
  commission,
}) => (
  <>
    {/* Render step 2 content */}
    <h1 className="text-[32px] font-semibold leading-[48px] mb-6">
      Deal Details
    </h1>
    <h1 className="text-[32px] font-semibold leading-[48px] mb-6">
      Property Type
    </h1>
    <Select
      options={propertyTypes}
      styles={customStyles}
      placeholder="Select Property Type"
      components={{ DropdownIndicator: CustomDropdownIndicator }}
      onChange={handlePropertyTypeChange}
    />

    <div className="mt-10">
      <p className="font-normal text-[28px] leading-[42px] mb-7 w-full bg-grey py-3 px-2">
        Property Value:{" "}
        <span className="font-semibold ml-5">{formatCurrency(priceValue)}</span>
      </p>
      <p className="font-normal text-[28px] leading-[42px] mb-7 w-full bg-grey py-3 px-2">
        Commission on Property
        <span className="font-semibold ml-5">{formatCurrency(commission)}</span>
      </p>
      <p className="font-normal text-[28px] leading-[42px] mb-7 w-full bg-grey py-3 px-2">
        Location:{" "}
        <span className="font-semibold ml-5">{selectedOption.value}</span>
      </p>

      {/* Displaying Uploaded File Names with Previews */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Uploaded Files:</h2>
          <ul className="list-disc pl-5">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex items-center gap-2"
              >
                {/* Display preview if it's an image */}
                {file.preview && (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                {file.name}
                <button
                  onClick={() => removeFile(file.name)}
                  className="ml-2 text-red-500 hover:underline text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Drag and Drop Section */}
      <div
        {...getRootProps()}
        className={`border-[1px] border-[#2A2B2C] w-full relative h-[250px] flex items-center justify-center cursor-pointer rounded-[10px] ${
          isDragActive ? "bg-gray-100" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-[15px] font-medium text-primary">
            Drop the files here ...
          </p>
        ) : (
          <div className="text-center">
            <p className="text-[15px] font-medium">
              Drag and drop your site output folder here
            </p>
            <a className="text-[15px] font-semibold">
              Or, <span className="underline">browse to upload</span>
            </a>
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
    <div className="mt-6 flex justify-between">
      <button
        className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase"
        onClick={prevStep}
      >
        Back
      </button>
      <button
        className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase"
        onClick={nextStep}
        disabled={!propertyType || uploadedFiles.length === 0}
      >
        Continue
      </button>
    </div>
  </>
);

const Step3 = ({
  prevStep,
  handleSubmit,
  formData,
  uploadedFiles,
  // priceValue,
  // propertyType,
  // commission,
}) => (
  <>
    <h1 className="text-[32px] font-semibold leading-[48px] mb-6 ">
      Review Your Deal
    </h1>
    <div className="mt-6">
      <p className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2">
        <strong className="mr-3">Location:</strong> {formData.location}
      </p>
      <p className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2">
        <strong className="mr-3">Transaction type:</strong>{" "}
        {formData.transactionType}
      </p>
      <p className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2">
        <strong className="mr-3">Property value:</strong>{" "}
        {formatCurrency(formData.priceValue)}
      </p>
      <p className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2">
        <strong className="mr-3">Property commission:</strong>{" "}
        {formatCurrency(formData.commission)}
      </p>
      {/* <p className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2">
        <strong className="mr-3">Property value:</strong>{" "}
        {formatCurrency(formData.priceValue)}
      </p> */}
      <p className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2 capitalize">
        <strong className="mr-3">Property Type:</strong> {formData.propertyType}
      </p>
      <h2 className="text-[20px] font-semibold mb-4  w-full bg-grey py-3 px-2">
        Uploaded Files:
      </h2>
      <ul className="mt-2">
        {uploadedFiles.map((file) => (
          <li key={file.name} className="mb-2  w-full bg-grey py-3 px-2">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-6 flex justify-between">
      <button
        className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase"
        onClick={prevStep}
      >
        Back
      </button>
      <button
        className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase"
        onClick={handleSubmit}
      >
        Submit Deal
      </button>
    </div>
  </>
);

export default AddDeal;
