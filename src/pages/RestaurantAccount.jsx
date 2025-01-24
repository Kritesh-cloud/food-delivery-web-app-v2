import React, { useState } from "react";
import Footer from "../general/Footer";
import Navbar from "../general/Navbar";
import { setHome } from "../context/HomeContext";
import { showDangerMessage } from "../utils/notification";

const RestaurantAccount = () => {
  const { createRestaurant } = setHome();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    contactNumber: "",
    email: "",
    openingTime: "00:00",
    closingTime: "00:00",
    icon: null,
    background: null,
    gallery: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);

    if (name === "gallery") {
      const newGallery = [...formData.gallery, ...files].slice(0, 4);
      setFormData({ ...formData, gallery: newGallery });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted Data:", formData);
    const formDataCopy = { ...formData };
    delete formDataCopy.icon;
    delete formDataCopy.background;
    delete formDataCopy.gallery;

    const newFormData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(formDataCopy)], {
      type: "application/json",
    });
    newFormData.append("restaurantInfo", jsonBlob, "data.json");
    try {
      newFormData.append("icon", formData.icon, "icon.png");
      newFormData.append("background", formData.background, "backgorund.png");
      if (formData.gallery && Array.isArray(formData.gallery)) {
        formData.gallery.forEach((file) => {
          newFormData.append("gallery", file);
        });
      }
    } catch (err) {
      showDangerMessage("Please upload images");
      return;
    }
    // for (let [key, value] of newFormData.entries()) {
    //   console.log(key, value);
    // }
    createRestaurant(newFormData);
  };

  return (
    <div>
      <div className="h-[80px]">
        <Navbar />
      </div>
      <div className="bg-white text-black min-h-screen p-6 bor">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-500">
            {isUpdateMode ? "Update Your Restaurant" : "Create Your Restaurant"}
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to {isUpdateMode ? "update" : "register"} your
            restaurant.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-100 py-6 rounded-lg shadow-lg mt-6"
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Contact Number & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-black font-semibold mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-black font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Opening & Closing Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-black font-semibold mb-2">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-black font-semibold mb-2">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Image Uploads with Preview */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Icon Image
            </label>
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {formData.icon && (
              <img
                src={URL.createObjectURL(formData.icon)}
                alt="Icon Preview"
                className="w-20 h-20 mt-2 rounded-lg"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Background Image
            </label>
            <input
              type="file"
              name="background"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {formData.background && (
              <img
                src={URL.createObjectURL(formData.background)}
                alt="Background Preview"
                className="w-full h-40 mt-2 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Gallery Images (Up to 4)
            </label>
            <input
              type="file"
              name="gallery"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.gallery.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Gallery ${index}`}
                  className="w-20 h-20 rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex mt-5  mb-[120px]">
            <button
              type="submit"
              className="bg-orange-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              {isUpdateMode ? "Update Restaurant" : "Create Restaurant"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default RestaurantAccount;
