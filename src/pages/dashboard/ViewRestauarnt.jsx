import React, { useState, useEffect } from "react";
import { setHome, getHome } from "../../context/HomeContext";

const ViewRestauarnt = () => {
  const { getOwnerRestauarnt, updateRestaurantData } = setHome();
  const { ownerRestaurant } = getHome();
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    getOwnerRestauarnt();
  }, []);

  useEffect(() => {
    // console.log("ownerRestaurant", ownerRestaurant);
    setRestaurant(ownerRestaurant);
  }, [ownerRestaurant]);
  return (
    <div className={`w-full h-full overflow-y-auto bor `}>
      {/* Header Section */}

      <div
        className={`relative w-full h-72 bg-cover bg-center bor non`}
        style={{ backgroundImage: `url(${restaurant.backgroundUrl})` }}
      >
        <div
          className={`absolute inset-0 flex items-center p-5 md:px-16 bg-gray-800 bg-opacity-60`}
        >
          <img
            src={restaurant.iconUrl}
            alt={restaurant.name}
            className="w-24 h-24 rounded-full border-2 border-orange-700 bg-stone-500 bg-opacity-60"
          />
          <div className="ml-5">
            <h1 className="text-3xl font-bold text-orange-600">
              {restaurant.name}
            </h1>
            <p className="text-gray-400">{restaurant.description}</p>
            <p className="text-gray-300">{restaurant.address}</p>
          </div>
        </div>
      </div>

      {/* Contact & Timing Section */}
      <div
        className={`mt-5 flex flex-col justify-between gap-2 p-5 rounded-lg md:mx-20 bg-gray-800 non`}
      >
        <p className="text-orange-500">Contact: {restaurant.contactNumber}</p>
        <p className="text-orange-500">Email: {restaurant.email}</p>
        <p className="text-orange-500">
          Open: {restaurant.openingTime} - {restaurant.closingTime}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 md:mx-20">
        {restaurant.imageGalleryList &&
          restaurant.imageGalleryList.map((imgId) => (
            <img
              key={imgId}
              src={`http://localhost:8080/image/${imgId}`}
              alt="Restaurant Gallery"
              className="w-full h-40 object-cover rounded-lg border-2 border-orange-700"
            />
          ))}
      </div>

      {/* Menu Section */}
      <div className="mt-10 mx-4 md:mx-20 pb-[200px] ">
        <h2 className="text-2xl font-bold text-orange-500">Menu</h2>

        {restaurant.menuCategoryResponses &&
          restaurant.menuCategoryResponses.map((category) => (
            <div key={category.id} className="mt-5">
              <h3 className="text-xl font-semibold text-orange-400">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {category.menuItemResponseList &&
                  category.menuItemResponseList.map((item) => (
                    <div
                      key={item.id}
                      className={`flex justify-between p-4 rounded-lg border-l-4 border-orange-500 transition-all cursor-pointer  bor bg-gray-300`}
                    >
                      <div className="flexcol bor">
                        <h4 className="text-base ">{item.name}</h4>
                        <p className="">Price: NRS {item.price}</p>
                      </div>
                      <div className="flexmid bor none">
                        <span
                          className="flexmid text-white bg-orange-500 border transition-all border-[#c2410c] hover:bg-orange-700 text-sm py-[4px] px-4 rounded cursor-pointer"
                          onClick={() => addToCart(item.id, token)}
                        >
                          Add To Cart
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewRestauarnt;
