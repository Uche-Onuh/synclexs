import React, { useState, useEffect } from "react";
import { Helmet, LoadingSpinner } from "../../components";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import {
  formatCurrency,
  formatISODate,
} from "../../utilityFunctions/functions";

const DEALS_DETAIL = "deals";

const DealsDetail = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null); // Initialize as null to handle loading
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${DEALS_DETAIL}/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeal(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch deals. Please try again later.");
      }
    };

    fetchDeals();
  }, [token, id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!deal) {
    return <LoadingSpinner />;
  }

  return (
    <Helmet title="Deal Details">
      <section className="w-[90%] h-[90vh] mx-auto mt-16">
        <h1 className="text-[26px] sm:text-[32px] font-semibold leading-[48px] mb-6 ">
          Deal details
        </h1>
        <div className="mt-6">
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2">
            <strong className="mr-3">ID:</strong> {deal.id}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2">
            <strong className="mr-3">Location:</strong> {deal.location}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2">
            <strong className="mr-3">Transaction type:</strong> {deal.deal_type}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2">
            <strong className="mr-3">Property value:</strong>{" "}
            {formatCurrency(deal.property_value)}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2">
            <strong className="mr-3">Commission:</strong>{" "}
            {formatCurrency(deal.commission.amount)}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2 capitalize">
            <strong className="mr-3">Property Type:</strong>{" "}
            {deal.property_type}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2 capitalize">
            <strong className="mr-3">Date Created:</strong>{" "}
            {formatISODate(deal.created_at)}
          </p>
          <p className="text-[16px] sm:text-[20px] font-semibold mb-4 w-full bg-grey py-3 px-2 capitalize">
            <strong className="mr-3">Deal Status:</strong> {deal.deal_status}
          </p>
        </div>
      </section>
    </Helmet>
  );
};

export default DealsDetail;
