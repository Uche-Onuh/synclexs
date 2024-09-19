import React from "react";
import { Helmet } from "../../components";
import { deals } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

const Deals = () => {
  const navigate = useNavigate();

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
