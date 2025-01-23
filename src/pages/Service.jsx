import React from "react";
import Navbar from "../general/Navbar";
import Footer from "../general/Footer";
import restaurnt4 from "../assets/images/restaurnt4.jpg";
import restaurnt8 from "../assets/images/restaurnt8.jpg";
import delivery2 from "../assets/images/delivery2.jpg";
import menuManagement2 from "../assets/images/menuManagement2.jpg";
import support2 from "../assets/images/support2.jpg";

import { useNavigate } from "react-router-dom";

const Service = () => {
  const navigate = useNavigate();
  return (
    <div className="flexcol bg-white text-black">
      <div className="h-[80px]">
        <Navbar />
      </div>
      {/* Hero Section */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${restaurnt4})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-orange-500 z-10">
          Our Services
        </h1>
      </div>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Service 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <img
              src={delivery2}
              alt="Fast Delivery"
              className="mx-auto h-[240px]"
            />
            <h3 className="text-xl font-semibold mt-4 text-black">
              Fast Delivery
            </h3>
            <p className="text-gray-700 mt-2">
              We ensure quick and reliable food delivery so your customers enjoy
              meals at the perfect temperature.
            </p>
          </div>

          {/* Service 2 */}
          <div className="p-6 bg-orange-100 rounded-lg shadow-lg text-center">
            <img
              src={menuManagement2}
              alt="Easy Menu Management"
              className="mx-auto h-[240px]"
            />
            <h3 className="text-xl font-semibold mt-4 text-black">
              Easy Menu Management
            </h3>
            <p className="text-gray-700 mt-2">
              Manage your restaurant's menu seamlessly with real-time updates
              and pricing adjustments.
            </p>
          </div>

          {/* Service 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <img
              src={support2}
              alt="Customer Support"
              className="mx-auto h-[240px]"
            />
            <h3 className="text-xl font-semibold mt-4 text-black">
              24/7 Support
            </h3>
            <p className="text-gray-700 mt-2">
              Our dedicated support team is available round the clock to assist
              with any issues.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us? */}
      <section className="container mx-auto px-6 md:px-36 py-12 bor">
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          Why Choose Us?
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mt-8 bor">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-4 flex-1 basis-1">
            <p className="text-stone-900">
              We provide top-tier technology and services to help restaurants
              expand their reach and grow their business.
            </p>
            <ul className="list-disc list-inside text-stone-900">
              <li>Seamless order management system</li>
              <li>Secure payment processing</li>
              <li>Real-time analytics and insights</li>
              <li>Marketing and promotional tools</li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex justify-center  flex-1 basis-1">
            <img
              src={restaurnt8}
              alt="Restaurant Service"
              className="rounded-md shadow-lg h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="flex justify-center mt-8">
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          onClick={() => {
            navigate("/restaurant/create");
          }}
        >
          Create Restaurant Account
        </button>
      </div>

      {/* Footer */}
      <div className="mt-[160px]">
        <Footer />
      </div>
    </div>
  );
};

export default Service;
