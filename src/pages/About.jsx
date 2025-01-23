import React from "react";
import Navbar from "../general/Navbar";
import Footer from "../general/Footer";
import restaurnt5 from "../assets/images/restaurnt5.jpg";
import restaurnt6 from "../assets/images/restaurnt6.jpg";
import restaurnt7 from "../assets/images/restaurnt7.jpg";

import delivery1 from "../assets/images/delivery1.jpg";
import menuManagement1 from "../assets/images/menuManagement1.jpg";
import support1 from "../assets/images/support1.jpg";

const About = () => {
  return (
    <div className="flexcol bg-white text-black">
      <div className="h-[80px]">
        <Navbar />
      </div>
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center flex items-center justify-center z-10"
        style={{ backgroundImage: `url(${restaurnt6})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-orange-500 z-10">
          About Us
        </h1>
      </div>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          Who We Are
        </h2>
        <p className="text-gray-700 mt-4 text-center max-w-3xl mx-auto">
          We are a food delivery platform that bridges the gap between hungry
          customers and top-rated restaurants. Whether you're a food lover
          looking to order your next meal or a restaurant owner aiming to expand
          your business, we've got you covered.
        </p>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* For Restaurants */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <img src={restaurnt5} alt="For Restaurants" className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-black">
              For Restaurants
            </h3>
            <p className="text-gray-700 mt-2">
              Create a restaurant account, set up your menu, and start receiving
              orders from a vast customer base.
            </p>
          </div>

          {/* For Customers */}
          <div className="p-6 bg-orange-100 rounded-lg shadow-lg text-center">
            <img src={restaurnt7} alt="For Customers" className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-black">
              For Customers
            </h3>
            <p className="text-gray-700 mt-2">
              Browse local restaurants, place orders online, and enjoy fast and
              reliable food delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us? */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <img src={delivery1} alt="Fast Delivery" className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-black">
              Fast & Reliable Delivery
            </h3>
            <p className="text-gray-700 mt-2">
              Our delivery system ensures you get your food hot and fresh every
              time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-orange-100 rounded-lg shadow-lg">
            <img
              src={menuManagement1}
              alt="Easy Menu Management"
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4 text-black">
              Seamless Ordering
            </h3>
            <p className="text-gray-700 mt-2">
              Order from your favorite restaurants in just a few clicks.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <img src={support1} alt="24/7 Support" className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-black">
              24/7 Customer Support
            </h3>
            <p className="text-gray-700 mt-2">
              Our dedicated support team is here to assist you anytime,
              anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-[160px]">
        <Footer />
      </div>
    </div>
  );
};

export default About;
