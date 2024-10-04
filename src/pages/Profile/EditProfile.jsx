import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "../../components";
import { profile } from "../../assets";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useSelector } from "react-redux";

const UPDATE_LAWYER = "lawyers/";
const LAWYER_DETAIL = "lawyers";

const Editprofile = () => {
  const id = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState(profile);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  // State to hold form values
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${LAWYER_DETAIL}/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { first_name, last_name, email, profile_photo } = response.data;

        // Populate the form fields with the user details from the API
        setFormValues({
          firstName: first_name || "",
          lastName: last_name || "",
          email: email || "",
        });

        // If a profile image URL exists, use it as the profile image
        if (profile_photo) {
          setProfileImage(profile_photo);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input change function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the specific field dynamically
    }));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file); // Save the file for submission
    }
  };

  const handleEditProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form values
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append profile image file
    if (profileImageFile) {
      formData.append("profile_photo", profileImageFile);
    }

    try {
      const response = await axios.put(`${UPDATE_LAWYER}/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", response.data);
      toast.success("Documents Successfully Uploaded");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to upload documents");
    }
  };

  return (
    <Helmet title="Edit Profile">
      <section className="w-full border-b-2 border-black py-10 min-h-screen">
        <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
          <div className=" flex flex-col md:flex-row items-start mt-5 gap-7 mb-10">
            <div className="w-full md:w-1/3">
              <div className="mx-auto w-[300px] h-[300px] rounded-full overflow-hidden">
                <img
                  src={profileImage}
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Hidden File Input for Profile Image */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
              />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleEditProfileClick}
                  className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000]  uppercase"
                >
                  Upload picture
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="font-bold text-[40px] leading-[60px] mb-8">
                Upload Details
              </h1>

              {["firstName", "lastName", "email", "mobile", "address"].map(
                (field) => (
                  <div
                    key={field}
                    className="flex flex-col border-[1px] border-[#2A2B2C] rounded-[10px] relative h-[50px] w-full mb-11"
                  >
                    <label
                      htmlFor={field}
                      className="absolute top-[-15px] left-10 font-medium text-[20px] leading-[30px] px-[5px] bg-white uppercase"
                    >
                      {field === "firstName"
                        ? "First Name"
                        : field === "lastName"
                        ? "Last Name"
                        : field === "email"
                        ? "Email Address"
                        : field === "address"
                        ? "Home Address"
                        : "Mobile Number"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      value={formValues[field]}
                      onChange={handleInputChange}
                      className="bg-transparent h-[50px] focus:outline-none w-full px-[30px]"
                      disabled={["email"].includes(field)} // Disable these fields
                    />
                  </div>
                )
              )}

              {/* Displaying Error Messages */}
              {error && (
                <div className="mb-4 text-red-500 text-sm font-semibold">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000]  uppercase "
            >
              Update profile
            </button>
          </div>
        </form>
      </section>
    </Helmet>
  );
};

export default Editprofile;
