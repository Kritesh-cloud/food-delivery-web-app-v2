import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList3 = ({ dataList }) => {
  const navigate = useNavigate();
  return (
    <div className="py-6 bg-black">
      <h2 className="text-white text-2xl pb-4 md:pb-6 px-6">
        🔥 Featured Restaurants
      </h2>
      <div className="hideScroll flex overflow-x-auto space-x-4 px-6 scrollbar-hide">
        {dataList.map((restaurant, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 rounded-lg border border-orange-500 overflow-hidden cursor-pointer"
            onClick={() => {
              navigate(`/restaurant-detail/${restaurant.id}`);
            }}
          >
            <div className="flex-shrink-0 w-72  overflow-hidden relative shadow-lg  transition-transform transform hover:scale-105">
              {/* Background Image */}
              <div
                className="w-full h-44 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${restaurant.backgroundUrl})` }}
              >
                {/* Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-black/50 "></div>
              </div>

              {/* Content */}
              <div className="p-4 bg-black text-white relative">
                <div className="absolute -top-6 left-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-stone-900">
                  <img
                    src={restaurant.iconUrl}
                    alt={restaurant.name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <h3 className="text-base font-medium mt-6">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {restaurant.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList3;
