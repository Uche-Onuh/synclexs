import React, { useState } from "react";
import { Helmet } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { blob, logoblack } from "../../assets";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "../../api/axios";

const REGISTER_URL = "auth/users/";

const Signup = () => {
  const navigate = useNavigate();
  // State for form values and errors
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);

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

    if (!formValues.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

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
  const handleSubmit = async (e) => {
    const { email, firstName, lastName, password, confPassword } = formValues;
    e.preventDefault();

    if (validate()) {
      setisLoading(true);
      try {
        // If form is valid, proceed with form submission
        await axios.post(
          REGISTER_URL,
          JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            password,
            password2: confPassword,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("Account created successfully");
        setisLoading(false);
        setTimeout(() => {
          navigate(`/auth/verify-email/${encodeURIComponent(email)}`);
        }, 3000);
      } catch (error) {
        // Error handling
        setisLoading(false);
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } else {
      toast.error("Validation failed. Please fix the errors and try again.");
    }
  };
  return (
    <Helmet title="Signup">
      <div className="flex flex-col md:flex-row justify-start items-center h-[100vh] w-full">
        <div className="bg-alternate w-full md:w-[30%] h-full relative hidden md:block">
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[200px]">
            <Link to="/">
              <img src={logoblack} alt="logo" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="rounded-l-[30px] w-full md:w-[70%] p-[30px] md:p-[100px] h-full">
          <h1 className="leading-[72px] font-bold text-[26px] sm:text-[48px]">
            Create Account
          </h1>

          <form className="my-[50px]" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-3 mb-11">
              <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full">
                <label
                  htmlFor="firstName"
                  className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  className="bg-transparent h-[50px] focus:outline-none w-full px-[30px]"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm font-semibold">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full">
                <label
                  htmlFor="lastName"
                  className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  className="bg-transparent h-[50px] focus:outline-none w-full px-[30px]"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm font-semibold">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full mb-11">
              <label
                htmlFor="email"
                className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white"
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
                disabled={isLoading === true}
                type="submit"
                className="bg-[#003574] py-2 rounded-[10px] outline-none border-none hover:bg-primary text-secondary hover:text-tertiary font-bold text-[24px] transition  ease-in-out duration-700"
              >
                Create Account
              </button>
            </div>
          </form>

          <div>
            <h1 className="font-medium text-[20px] leading-[30px]">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary hover:text-tertiary"
              >
                Login here
              </Link>
            </h1>
          </div>
        </div>
        <div className="absolute right-20 bottom-10">
          <Link to="/">
            <img
              src={blob}
              alt="decorative blob"
              className="w-[38px] h-[34px]"
            />
          </Link>
        </div>
      </div>
    </Helmet>
  );
};

export default Signup;
