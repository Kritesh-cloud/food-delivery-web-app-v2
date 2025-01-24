import React, { useState, useEffect } from "react";
import { setHome, getHome } from "../../context/HomeContext";
import { Close } from "@mui/icons-material";

const UpdateRestauarnt = () => {
  const { getOwnerRestauarnt, updateRestaurantData } = setHome();
  const { ownerRestaurant } = getHome();
  const [isUpdateMode, setIsUpdateMode] = useState(true);
  const [iconUpdated, setIconUpdated] = useState(false);
  const [backgroundUpdated, setBackgroundUpdated] = useState(false);
  const [galleryUpdated, setGalleryUpdated] = useState(false);
  const [galleryRemove, setGalleryRemove] = useState([]);
  const [galleryImages, setGaleryImages] = useState([]);
  const [galleryImageLimit, setGalleryImageLimit] = useState(4);
  const [restaurantData, setRestaurantData] = useState({
    name: "hello hellow",
    description: "cat cta",
    address: "dog dog",
    contactNumber: "098765543221",
    email: "email@name.moc",
    openingTime: "06:00",
    closingTime: "22:00",
    icon: null,
    background: null,
    gallery: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);

    if (name === "gallery") {
      const newGallery =
        restaurantData.gallery == undefined
          ? [...files]
          : [...restaurantData.gallery, ...files].slice(0, galleryImageLimit);
      setRestaurantData({ ...restaurantData, gallery: newGallery });

      setGalleryUpdated(true);
    } else {
      if (name === "icon") {
        setIconUpdated(true);
      }
      if (name === "background") {
        setBackgroundUpdated(true);
      }
      setRestaurantData({ ...restaurantData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted Data:", restaurantData);
    const formDataCopy = { ...restaurantData };

    delete formDataCopy.approved;
    delete formDataCopy.backgroundUrl;
    delete formDataCopy.categoryList;
    delete formDataCopy.createdAt;
    delete formDataCopy.imageGalleryList;
    delete formDataCopy.menuCategoryResponse;
    delete formDataCopy.owner;
    delete formDataCopy.updatedAt;

    const updatedFormDataCopy = {
      ...formDataCopy,
      iconChanged: iconUpdated,
      backgroundChanged: backgroundUpdated,
      newGalleryImageAdded: galleryUpdated,
      removeGalleryImageIds: galleryRemove,
    };

    const newFormData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(updatedFormDataCopy)], {
      type: "application/json",
    });
    newFormData.append("restaurantInfo", jsonBlob);

    try {
      if (iconUpdated) {
        newFormData.append("icon", restaurantData.icon, "icon.png");
      }
      if (backgroundUpdated) {
        newFormData.append(
          "background",
          restaurantData.background,
          "backgorund.png"
        );
      }

      if (
        restaurantData.gallery &&
        galleryUpdated &&
        Array.isArray(restaurantData.gallery)
      ) {
        restaurantData.gallery.forEach((file) => {
          newFormData.append("gallery", file);
        });
      }
    } catch (err) {
      console.log("err in img ", err);
    }
    // for (let [key, value] of newFormData.entries()) {
    //   console.log(key, value);
    // }
    setGaleryImages([]);
    updateRestaurantData(newFormData);
  };

  const removeGallery = (bgImageId) => {
    setGalleryRemove([...galleryRemove, bgImageId]);
    setGalleryUpdated(true);
    setGaleryImages(
      galleryImages &&
        galleryImages.filter((bgImg) => !bgImageId.includes(bgImg)).sort()
    );
  };

  useEffect(() => {
    getOwnerRestauarnt();
  }, []);

  useEffect(() => {
    setRestaurantData(ownerRestaurant);
    setGaleryImages(
      ownerRestaurant.imageGalleryList &&
        ownerRestaurant.imageGalleryList.sort()
    );
  }, [ownerRestaurant]);

  useEffect(() => {}, [restaurantData]);

  useEffect(() => {}, [galleryRemove]);

  return (
    <div className="bor w-full h-full overflow-y-auto">
      <div className="bg-white text-black min-h-screen p-6 bor non">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-orange-600">
            {isUpdateMode ? "Update Your Restaurant" : "Create Your Restaurant"}
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className=" border border-orange-500 p-6 bg-gray-100 py-6 rounded-lg shadow-lg mt-6"
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={restaurantData.name || ""}
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
              value={restaurantData.description || ""}
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
              value={restaurantData.address || ""}
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
                value={restaurantData.contactNumber || ""}
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
                value={restaurantData.email || ""}
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
                value={restaurantData.openingTime || "00:00"}
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
                value={restaurantData.closingTime || "00:00"}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-stone-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Image Uploads with Preview */}
          <div className="mb-4 non">
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
            {!iconUpdated && restaurantData.iconUrl && (
              <img
                src={restaurantData.iconUrl}
                alt="Icon Preview"
                className="w-20 h-20 mt-2 rounded-lg"
              />
            )}
            {restaurantData.icon && (
              <img
                src={URL.createObjectURL(restaurantData.icon)}
                alt="Icon Preview"
                className="w-20 h-20 mt-2 rounded-lg"
              />
            )}
          </div>

          <div className="mb-4 non">
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
            {!backgroundUpdated && restaurantData.backgroundUrl && (
              <img
                src={restaurantData.backgroundUrl}
                alt="Background Preview"
                className="w-[500px] h-40 mt-2 rounded-lg object-cover"
              />
            )}
            {restaurantData.background && (
              <img
                src={URL.createObjectURL(restaurantData.background)}
                alt="Background Preview"
                className="w-[500px] h-40 mt-2 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="mb-4 ">
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
            <div className="flex flex-wrap mt-2 gap-3 bor">
              {galleryImages &&
                galleryImages.map((bgImage, index) => (
                  <div
                    key={bgImage}
                    className="w-24 h-24 relative overflow bor"
                  >
                    <div
                      className="flexmid p-[2px] absolute bor -right-2 -top-1 bg-stone-300 border border-stone-600 rounded-full cursor-pointer none"
                      onClick={() => {
                        removeGallery(bgImage);
                      }}
                    >
                      <Close fontSize="small" />
                    </div>
                    <img
                      key={index}
                      src={`http://localhost:8080/image/${bgImage}`}
                      alt={`Gallery ${index}`}
                      className="w-24 h-24 rounded-lg"
                    />
                  </div>
                ))}

              {restaurantData.gallery &&
                restaurantData.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Gallery ${index}`}
                    className="w-24 h-24 rounded-lg"
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
    </div>
  );
};

export default UpdateRestauarnt;

/*
add
iconChanged bool
backgroundChanged bool
newGalleryImageAdded bool
removeGalleryImageIds arr

remove
approved
backgroundUrl
categoryList
createdAt
imageGalleryList
menuCategoryResponse
owner
updatedAt


* */
