import React from "react";
import { ShoppingCart } from "@mui/icons-material";
import hero from "../../assets/images/hero.png";
import herobg from "../../assets/images/herobg.jpg";

const Hero = () => {
  return (
    <section
      className=" text-white flex-col-reverse md:min-h-screen flex gap-16 md:flex-row items-center justify-between px-6 md:px-20"
      style={{ backgroundImage: `url(${herobg})` }} // Correct interpolation for the background image
    >
      {/* Left Side: Text Content */}
      <div className="md:w-1/2 text-center md:text-left bor pb-10">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Delicious Food, <br /> Delivered{" "}
          <span className="text-black">Fast!</span>
        </h1>
        <p className="mt-4 text-lg text-gray-200 font-light">
          Order your favorite meals and get them delivered to your doorstep in
          minutes. Fresh, hot, and tasty!
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          <a
            href="#restaurant"
            className="bg-black text-orange-500 px-6 py-3 rounded-md font-medium hover:bg-gray-900 flex items-center"
          >
            <ShoppingCart className="mr-2" /> View Restaurant
          </a>
          <button className="border-2 border-black text-black px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white">
            Our Services
          </button>
        </div>
      </div>

      {/* Right Side: Food Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 bor">
        <img
          src={hero}
          alt="Delicious Food"
          className="w-full max-w-lg rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
