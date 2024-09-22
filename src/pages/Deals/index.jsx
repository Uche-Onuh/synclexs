import React, { useState, useEffect } from "react";
import { Helmet } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useSelector } from "react-redux";

const USER_DEALS = "deals/";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(USER_DEALS, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setDeals(response.data);
      } catch (err) {
        setError("Failed to fetch deals. Please try again later.");
      }
    };

    fetchDeals();
  }, [token]); // Add token as a dependency

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main wrapper for the page */}
      <Helmet title="Deals">
        <section className="flex-grow py-10">
          {/* Main content area */}
          <div className="w-[90%] mx-auto flex justify-end">
            <button
              onClick={() => navigate("/user/add-deal")}
              className="bg-alternate py-2 px-4 rounded-l font-normal text-[15px] leading-[22px] text-white hover:bg-primary hover:text-[#000] uppercase mb-20"
              aria-label="Add a new deal"
            >
              add new deal
            </button>
          </div>
          <div className="w-[90%] mx-auto flex flex-col gap-4">
            {" "}
            {/* Deals area */}
            {deals.length > 0 ? (
              deals.map((deal) => (
                <Link
                  to={`/user/deals/${deal.id}`}
                  key={deal.id}
                  aria-label={`View details of deal ${deal.location}`}
                >
                  <div className="bg-grey border-b-2 border-black px-5 py-3 flex justify-between items-center hover:bg-primary transition duration-200">
                    <p className="text-[15px] font-medium">{deal.location}</p>
                    <p className="text-[14px] text-gray-600">{deal.id}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                No deals available.
              </p>
            )}
          </div>
        </section>
      </Helmet>
    </div>
  );
};

export default Deals;
