import React, { useState, useEffect } from "react";
import { Helmet } from "../../components";
import { profile } from "../../assets";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useSelector } from "react-redux";

const LAWYER_DETAIL = "lawyers";

const Profile = () => {
  const [user, setUser] = useState(null); // Initialize as null to handle loading
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${LAWYER_DETAIL}/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch deals. Please try again later.");
      }
    };

    fetchDeals();
  }, [token]);

  const navigate = useNavigate();

  if (!user) {
    return (
      <section className="w-[90%] h-[90vh] mx-auto mt-16">Loading...</section>
    );
  }

  return (
    <Helmet title="Profile">
      <section className="w-[90%] h-auto mx-auto mt-16">
        <div className=" flex flex-col md:flex-row items-start mt-5 gap-7 mb-10 border-b-2 py-20 border-black">
          <div className="w-full md:w-1/3">
            <div className="mx-auto w-[300px] h-[300px] rounded-full overflow-hidden">
              <img
                src={profile}
                alt="user profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-[20px] font-semibold mb-6 w-full bg-grey py-3 px-2">
              <strong className="mr-3">First Name: </strong>
              {user.first_name}
            </p>
            <p className="text-[20px] font-semibold mb-6 w-full bg-grey py-3 px-2">
              <strong className="mr-3">Last Name:</strong> {user.last_name}
            </p>
            <p className="text-[20px] font-semibold mb-6 w-full bg-grey py-3 px-2">
              <strong className="mr-3">Email Address:</strong> {user.email}
            </p>
            <p className="text-[20px] font-semibold mb-6 w-full bg-grey py-3 px-2">
              <strong className="mr-3">Mobile Number:</strong>{" "}
              {user.phone_number}
            </p>
            <p className="text-[20px] font-semibold mb-6 w-full bg-grey py-3 px-2">
              <strong className="mr-3">Home Address:</strong> {user.address}
            </p>
          </div>
        </div>

        <div className="flex justify-end my-20">
          <button
            onClick={() => {
              navigate("/user/edit-profile");
            }}
            className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000]  uppercase"
          >
            Edit profile
          </button>
        </div>
      </section>
    </Helmet>
  );
};

export default Profile;
