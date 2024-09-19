import React, { useState } from "react";
import { Helmet } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blob, logoblack } from "../../assets";
import { toast } from "react-toastify";
import axios from "../../api/axios"; // Ensure axios is imported
import { maskEmail } from "../../utilityFunctions/functions";

import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/userSlice";

const VERIFY_EMAIL = "auth/verify-email/"; // Ideally, this URL should be managed via environment variables

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // Extract email using useParams
  const [codes, setCodes] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  // Handle input change and remove error
  const handleChange = (index, e) => {
    const { value } = e.target;

    // Allow only digits
    if (/^\d?$/.test(value)) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // Clear the error for the specific input if a digit is entered
      setErrors((prevErrors) => ({ ...prevErrors, [`code-${index}`]: "" }));

      // Move focus to the next input if the current input is filled
      if (value.length === 1 && index < 3) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }
  };

  // Handle keydown to detect backspace and move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && codes[index] === "") {
      if (index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        prevInput && prevInput.focus();
      }
    }
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};

    // Check if all fields are filled with a single digit
    codes.forEach((code, index) => {
      if (!code) {
        newErrors[`code-${index}`] = "This field is required";
      }
    });

    setErrors(newErrors);

    // Return whether the form is valid
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const pin = codes.join(""); // Combine codes into a single PIN
      setisLoading(true);

      try {
        // If form is valid, proceed with form submission
        const response = await axios.post(
          VERIFY_EMAIL,
          JSON.stringify({
            email,
            code: pin,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setisLoading(false);

        const token = response.data.token.access;
        const id = response.data.user_id;

        dispatch(
          login({
            id,
            token,
            isLoggedIn: true,
          })
        );

        toast.success("Verification successful, redirecting to homepage");

        setTimeout(() => {
          navigate("/");
        }, 3000);

        // console.log("Form submitted successfully:", pin);
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

  const maskedEmail = maskEmail(email);

  return (
    <Helmet title="Verify Email">
      <div className="flex flex-col md:flex-row justify-start items-center h-[100vh] w-full">
        <div className="bg-alternate w-full md:w-[30%] h-full relative hidden md:block">
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[200px]">
            <Link to="/">
              <img src={logoblack} alt="logo" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="rounded-l-[30px] w-full md:w-[70%] p-[30px] md:p-[100px] h-full">
          <h1 className="leading-[72px] font-bold text-[48px]">Verify Email</h1>

          <p className="font-medium text-[20px] leading-[30px] mt-5">
            We sent you a 4 digit code to verify your email address
            <br />
            <span className="font-bold">({maskedEmail}).</span> <br />
            Enter it in the field below
          </p>

          <form className="my-[50px]" onSubmit={handleSubmit}>
            <div className="flex justify-start items-center gap-[30px] mt-5 mb-20">
              {codes.map((code, index) => (
                <div key={index} className="flex flex-col items-center">
                  <input
                    id={`code-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-[60px] md:w-[80px] h-[60px] md:h-[87px] text-center text-[25px] border-[3px] ${
                      errors[`code-${index}`]
                        ? "border-red-500"
                        : "border-tertiary"
                    } focus:outline-none focus:border-primary rounded-xl`}
                  />
                  {errors[`code-${index}`] && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors[`code-${index}`]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-[#003574] py-2 rounded-[10px] outline-none border-none hover:bg-primary text-secondary hover:text-tertiary font-bold text-[24px] transition  ease-in-out duration-700"
              >
                {isLoading ? (
                  <span className="spinner">Loading...</span>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </form>

          <div>
            <h1 className="font-medium text-[20px] leading-[30px]">
              Didn’t get a code?{" "}
              <Link to="#" className="text-primary hover:text-tertiary ">
                Resend code
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

export default VerifyEmail;
