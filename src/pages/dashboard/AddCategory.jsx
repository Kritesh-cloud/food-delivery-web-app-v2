import React, { useState } from "react";
import { setDashboard } from "../../context/DashboardContext";

const AddCategory = () => {
  const { addToCategory } = setDashboard();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle category name input
  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", categoryName);
    formData.append("image", image);
    addToCategory(formData);
    setCategoryName("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="flex p-5 justify-start hw100 borr">
      <div className="max-w-lg w-[500px] bg-orange-100 p-6 rounded-lg shadow-lg border border-orange-400">
        <h2 className="text-2xl font-bold text-orange-500 text-center">
          Add Category
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Category Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={handleNameChange}
              placeholder="Enter category name"
              className="w-full px-3 py-2 border border-stone-500 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm"
              required
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Image Preview:</p>
              <div className="flex">
                <img
                  src={preview}
                  alt="Category Preview"
                  className="w-40 h-40 object-cover rounded-lg border border-orange-400"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
