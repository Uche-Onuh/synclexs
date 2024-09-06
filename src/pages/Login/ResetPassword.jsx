import React, { useState } from "react";
import { Helmet } from "../../components";
import { blob, logoblack } from "../../assets";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const ResetPassword = () => {
  // State for form values and errors
  const [formValues, setFormValues] = useState({
    password: "",
    confPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change and remove error
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });

    // Clear the error for the field that is being typed into
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formValues.confPassword) {
      newErrors.confPassword = "Please confirm your password";
    } else if (formValues.confPassword !== formValues.password) {
      newErrors.confPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // Return whether the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // If form is valid, you can proceed with form submission
      toast.success("Form submitted successfully");
      console.log("Form submitted successfully:", formValues);
    } else {
      toast.error("Validation failed. Please fix the errors and try again.");
      console.log("Validation failed. Please fix the errors and try again.");
    }
  };

  return (
    <Helmet title="Reset Password">
      <div className="flex justify-start items-center h-[100vh] w-full">
        <div className="bg-alternate w-[30%] h-full overflow-visible relative">
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[200px]">
            <Link to="/">
              <img src={logoblack} alt="logo" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="rounded-l-[30px] w-[70%] p-[100px] bg-loginbg  bg-cover bg-center  h-full">
          <h1 className="leading-[72px] font-bold text-[48px]">
            Reset Your Password
          </h1>

          <form className="my-[50px]" onSubmit={handleSubmit}>
            <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full mb-11">
              <label
                htmlFor="password"
                className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formValues.password}
                onChange={handleChange}
                className="bg-transparent h-[50px] focus:outline-none w-full px-[30px]"
              />
              <div
                className="absolute right-4 top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm font-semibold">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full mb-11">
              <label
                htmlFor="confPassword"
                className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confPassword"
                value={formValues.confPassword}
                onChange={handleChange}
                className="bg-transparent h-[50px] focus:outline-none w-full px-[30px]"
              />
              <div
                className="absolute right-4 top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
              {errors.confPassword && (
                <span className="text-red-500 text-sm font-semibold">
                  {errors.confPassword}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="bg-[#003574] py-2 rounded-[10px] outline-none border-none hover:bg-primary text-secondary hover:text-tertiary font-bold text-[24px] transition  ease-in-out duration-700"
              >
                Change Password
              </button>
            </div>
          </form>

          <div className="absolute right-20 bottom-10">
            <img
              src={blob}
              alt="decorative blob"
              className="w-[38px] h-[34px]"
            />
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ResetPassword;
