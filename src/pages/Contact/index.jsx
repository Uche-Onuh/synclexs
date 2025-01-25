import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/axios";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Uncomment this when ready to connect to the backend
      const response = await axios.post("http://localhost:3000/send-email", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      const data = await response.json();
      toast.success("Message sent successfully!");
      setForm({ firstName: "", email: "", lastName: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[90%] h-auto mx-auto flex flex-col md:flex-row justify-center items-center mt-16">
      <div className="w-full h-auto mb-16">
        <div className="w-full h-auto mb-16 text-center">
          <h1 className="font-semibold text-[40px] mb-1">
            Support and Resources
          </h1>
          <h4 className="text-[18px]">Get Help When You Need It</h4>
        </div>
        <div className="w-full h-auto mb-16 text-left">
          <div className="mb-8">
            <p className="text-[16px]">
              At Snyclexs, we're committed to providing exceptional support to
              our clients. Whether you have a question, need assistance with a
              transaction, or require technical support, we're here to help.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-20 md:gap-20 mb-20">
          <div className="w-full md:w-1/2 bg-alternate rounded-xl py-8 px-10 text-white">
            <h2 className="font-bold text-[18px] sm:text-[24px] md:text-[28px] lg:text-[30px] relative w-full md:w-4/5 leading-tight md:leading-snug mb-8">
              Get in touch
            </h2>
            {/* Contact Details */}
            <div className="mb-6">
              <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] mb-1 md:mb-2">
                Chat with us
              </p>
              <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] mb-2 md:mb-2">
                Our friendly team is here to help
              </p>
              <Link
                to="mailto:support@snyclexs.com"
                className="font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] hover:text-secondary"
              >
                support@snyclexs.com
              </Link>
            </div>
            <div className="mb-6">
              <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] mb-1 md:mb-2">
                Call us
              </p>
              <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] mb-2 md:mb-2">
                Mon - Fri from 9:00am to 5:00pm WAT
              </p>
              <Link
                to="tel:+2348123456789"
                className="font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[22px] md:leading-[24px] hover:text-secondary"
              >
                +2348123456789
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-start w-full mb-10 gap-3">
                <div className="flex flex-col gap-3 w-1/2">
                  <label
                    htmlFor="firstName"
                    className="text-alternate font-semibold"
                  >
                    First name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="px-1 py-2 border-[1px] border-alternate outline-none text-alternate placeholder:text-alternate placeholder:opacity-50 placeholder:text-[14px] bg-transparent rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                  <label
                    htmlFor="lastName"
                    className="text-alternate font-semibold"
                  >
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="px-1 py-2 border-[1px] border-alternate outline-none text-alternate placeholder:text-alternate placeholder:opacity-50 placeholder:text-[14px] bg-transparent rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full mb-10">
                <label htmlFor="email" className="text-alternate font-semibold">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="px-1 py-2 border-[1px] border-alternate outline-none text-alternate placeholder:text-alternate placeholder:opacity-50 placeholder:text-[14px] bg-transparent rounded-none"
                />
              </div>

              <div className="flex flex-col gap-3 mb-16 w-full">
                <label
                  htmlFor="message"
                  className="text-alternate font-semibold"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  cols="10"
                  rows="8"
                  onChange={handleChange}
                  value={form.message}
                  required
                  placeholder="Message"
                  className="px-3 py-2 border-[1px] border-alternate outline-none text-alternate placeholder:text-alternate placeholder:opacity-50 placeholder:text-[14px] bg-transparent rounded-none"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-alternate py-3 rounded-sm outline-none border-none hover:bg-tertiary hover:text-primary font-bold transition ease-in-out duration-700"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
