import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "../../components";
import { profile } from "../../assets";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/slice/userSlice";

const USER_DETAILS = "auth/user-detail/";
const REGISTER_LAWYER = "lawyers/";

const Settings = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  // State to hold the names of the uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(profile); // Default profile image
  const [profileImageFile, setProfileImageFile] = useState(null); //
  const fileInputRef = useRef(null); // Reference to the hidden file input
  // State to hold form values
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
  });

  // Fetch the user's data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(USER_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { first_name, last_name, email } = response.data;

        // Populate the form fields with the user details from the API
        setFormValues({
          firstName: first_name || "",
          lastName: last_name || "",
          email: email || "",
        });

        // // If a profile image URL exists, use it as the profile image
        // if (profileImageUrl) {
        //   setProfileImage(profileImageUrl);
        // }
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

  const removeFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form values
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append profile image file
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    // Append uploaded files
    uploadedFiles.forEach(({ file }) => {
      formData.append("identification_document", file);
    });

    formData.append("user_id", id);

    // console.log("Form Data:", [...formData.entries()]);

    try {
      const response = await axios.post(REGISTER_LAWYER, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", response.data);
      toast.success("Documents Successfully Uploaded");
      dispatch(login(isLawyer === true));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to upload documents");
    }
  };

  return (
    <Helmet title="Settings">
      <section className="w-full border-b-2 border-black py-10">
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
                      disabled={["firstName", "lastName", "email"].includes(
                        field
                      )} // Disable these fields
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

      {/* <section className="w-full py-10 ">
        <div className="w-[90%] mx-auto flex justify-end">
          <Link
            to="/user/deals"
            className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000]  uppercase"
          >
            See My Deals
          </Link>
        </div>
      </section> */}
    </Helmet>
  );
};

export default Settings;
