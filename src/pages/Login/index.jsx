import React, { useState } from "react";
import { Helmet } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { blob, logoblack } from "../../assets";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "../../api/axios"; 

import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/userSlice";

const LOGIN_URL = "auth/login/";

const Login = () => {
  const navigate = useNavigate();
  // State for form values and errors
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const { email, password } = formValues; // Destructure email and password here
      try {
        setloading(true);
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setloading(false);
        const token = response.data.token.access;
        const id = response.data.user_id;
        const isLawyer = response.data.is_lawyer;

        dispatch(
          login({
            id,
            token,
            isLoggedIn: true,
            isLawyer,
          })
        );

        setTimeout(() => {
          navigate("/");
        }, 2000);

        toast.success("Login Successful");
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } else {
      setloading(false);
      toast.error("Validation failed. Please fix the errors and try again.");
    }
  };

  return (
    <Helmet title="Login">
      <div className="flex flex-col md:flex-row justify-start items-center h-[100vh] w-full">
        <div className="bg-alternate w-full md:w-[30%]  h-full relative hidden md:block">
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[200px]">
            <Link to="/">
              <img src={logoblack} alt="logo" className="w-full" />
            </Link>
          </div>
        </div>

        <div className="rounded-l-[30px] w-full md:w-[70%] p-[30px] md:p-[100px] h-full bg-loginbg bg-cover bg-center">
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
                to="/auth/forgot-password"
                className="text-end font-medium text-[20px] leading-8 hover:text-primary"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#003574] py-2 rounded-[10px] outline-none border-none hover:bg-primary text-secondary hover:text-tertiary font-bold text-[24px] transition  ease-in-out duration-700"
              >
                {loading ? "Loading..." : "Log in"}
              </button>
            </div>
          </form>

          <div>
            <h1 className="font-medium text-[20px] leading-[30px]">
              New User?{" "}
              <Link
                to="/auth/signup"
                className="text-primary hover:text-tertiary"
              >
                Sign up
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

export default Login;
