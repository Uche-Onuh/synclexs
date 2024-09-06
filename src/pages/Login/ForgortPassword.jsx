import React, { useState } from "react";
import { Helmet } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { blob, logoblack } from "../../assets";
import { toast } from "react-toastify";

const ForgortPassword = () => {
  const navigate = useNavigate();
  // State for form values and errors
  const [formValues, setFormValues] = useState({
    email: "",
  });

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
    setErrors(newErrors);

    // Return whether the form is valid
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // If form is valid, you can proceed with form submission
      toast.success(
        "A link has been sent to your email. Follow the link to reset your password"
      );

      setTimeout(() => {
        navigate("/auth/reset-password");
      }, 3000);
      console.log("Form submitted successfully:", formValues);
    } else {
      toast.error("Validation failed. Please fix the errors and try again.");
      console.log("Validation failed. Please fix the errors and try again.");
    }
  };

  return (
    <Helmet title="Forgot Password">
      <div className="flex justify-start items-center h-[100vh] w-full">
        <div className="bg-alternate w-[30%] h-full relative">
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[200px]">
            <Link to="/">
              <img src={logoblack} alt="logo" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="rounded-l-[30px] w-[70%] p-[100px] bg-loginbg  bg-cover bg-center  h-full">
          <h1 className="leading-[72px] font-bold text-[48px]">
            {" "}
            Forgot password
          </h1>

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

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="bg-[#003574] py-2 rounded-[10px] outline-none border-none hover:bg-primary text-secondary hover:text-tertiary font-bold text-[24px] transition  ease-in-out duration-700"
              >
                Reset Password
              </button>
            </div>
          </form>

          <div>
            <h1 className="font-medium text-[20px] leading-[30px]">
              Go back?{" "}
              <Link
                to="/auth/login"
                className="text-primary hover:text-tertiary"
              >
                Login here
              </Link>
            </h1>
          </div>

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

export default ForgortPassword;
