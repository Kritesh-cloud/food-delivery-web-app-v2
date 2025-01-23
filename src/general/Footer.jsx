import React from "react";
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn, Apple, Android } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 ">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">FoodDelivery</h2>
          <p className="mt-2 text-gray-400">
            Get your favorite meals delivered fast and fresh. Quality food, quick service!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/menu" className="hover:text-orange-500">Menu</a></li>
            <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500">Contact Us</h3>
          <p className="mt-2 flex items-center"><LocationOn className="text-orange-500 mr-2"/> 123 Food Street, NY</p>
          <p className="flex items-center"><Phone className="text-orange-500 mr-2"/> +1 234 567 890</p>
          <p className="flex items-center"><Email className="text-orange-500 mr-2"/> support@fooddelivery.com</p>
        </div>

        {/* Newsletter Signup & App Download */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500">Subscribe</h3>
          <p className="mt-2 text-gray-400">Get the latest deals and offers.</p>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="mt-3 w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-orange-500"
          />
          <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">
            Subscribe
          </button>

          <h3 className="text-xl font-semibold text-orange-500 mt-6">Get Our App</h3>
          <div className="flex space-x-3 mt-2">
            <button className="flex items-center bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700">
              <Apple className="mr-2"/> iOS
            </button>
            <button className="flex items-center bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700">
              <Android className="mr-2"/> Android
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 text-center pt-5 text-gray-400">
        <p>&copy; 2025 FoodDelivery. All rights reserved.</p>
        <div className="flex justify-center space-x-5 mt-3">
          <a href="#" className="hover:text-orange-500"><Facebook fontSize="large" /></a>
          <a href="#" className="hover:text-orange-500"><Twitter fontSize="large" /></a>
          <a href="#" className="hover:text-orange-500"><Instagram fontSize="large" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
