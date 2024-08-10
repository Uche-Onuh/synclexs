import React, { useState } from "react";
import { Helmet } from "../../components";
import { Link } from "react-router-dom";
import { blob } from "../../assets";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
  // State for form values and errors
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
    <Helmet title="Login">
      <div className="flex justify-start items-center h-[100vh] w-full">
        <div className="bg-alternate w-[30%] h-full"></div>
        <div className="rounded-l-[30px] w-[70%] p-[100px] bg-loginbg  bg-cover bg-center  h-full">
          <h1 className="leading-[72px] font-bold text-[48px]">Log in</h1>

          <form className="mt-[100px] mb-[50px]" onSubmit={handleSubmit}>
            <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full mb-11">
              <label
                htmlFor="email"
                className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formValues.email}
                onChange={handleChange}
                className="bg-transparent h-[50px] focus:outline-none w-full px-[30px]"
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-semibold">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full mb-6">
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

            <div className="flex justify-end mb-6">
              <Link
                to="/user/forgot-password"
                className="text-end font-medium text-[20px] leading-8"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="bg-[#003574] py-2 rounded-[10px] outline-none border-none hover:bg-primary text-secondary hover:text-tertiary font-bold text-[24px] transition  ease-in-out duration-700"
              >
                Log in
              </button>
            </div>
          </form>

          <div>
            <h1>
              New User?{" "}
              <Link to="/user/signup" className="text-primary">
                Sign up
              </Link>
            </h1>
          </div>

          <div className="flex justify-end mt-[180px] ">
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

export default Login;
