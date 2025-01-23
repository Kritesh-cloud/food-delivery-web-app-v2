import React, { useState } from "react";
import Footer from "../general/Footer";
import Navbar from "../general/Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="flexcol">
      <div className="h-[80px]">
        <Navbar />
      </div>
      <div className="min-h-screen bg-white text-black p-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-500">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have questions? Reach out to us, and we'll be happy to assist you.
          </p>
        </div>

        {/* Contact Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-10">
          {/* Left Section - Contact Form */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-stone-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-stone-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-stone-500"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Section - Contact Details & Map */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-orange-500 mb-4">
                Our Address
              </h2>
              <p className="text-gray-700">
                📍 123 Food Street, Kathmandu, Nepal
              </p>
              <p className="text-gray-700 mt-2">📞 +977 9800000000</p>
              <p className="text-gray-700 mt-2">✉️ support@fooddelivery.com</p>
            </div>

            {/* Map Section */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0190755535466!2d85.31623391506196!3d27.717245982787315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjEiTiA4NcKwMTknMDIuNiJF!5e0!3m2!1sen!2snp!4v1639450980502!5m2!1sen!2snp"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[120px]">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
