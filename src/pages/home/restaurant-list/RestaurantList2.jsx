import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList2 = ({ dataList }) => {
  const navigate = useNavigate();
  return (
    <div className="px-6 md:px-20 bor">
      <h2 className="text-2xl pb-4 md:pb-6">
        Must-Try Restaurants for Food Lovers
      </h2>
      <div className="hideScroll flex overflow-x-auto overflow-y-hidden  space-x-4 px-6 scrollbar-hide">
        {dataList.map((restaurant, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 rounded-lg relative shadow-md transform transition duration-300 hover:scale-105 bor cursor-pointer"
            onClick={() => {
              navigate(`/restaurant-detail/${restaurant.id}`);
            }}
          >
            {/* Background Image */}
            <div
              className="w-full h-44 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${restaurant.backgroundUrl})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4 bg-white relative">
              <div className="absolute -top-6 left-4 w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center shadow-md border border-stone-400">
                <img
                  src={restaurant.iconUrl}
                  alt={restaurant.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <h3 className="text-base font-medium mt-4">{restaurant.name}</h3>
              <p className="text-sm text-gray-800 mt-1">{restaurant.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList2;
