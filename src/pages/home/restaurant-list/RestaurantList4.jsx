import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList4 = ({ dataList }) => {
  const navigate = useNavigate();
  return (
    <div className="flexcol justify-center py-8 bg-white px-6 md:px-20">
      <h2 className="text-3xl font-semibold text-black text-center mb-6">
        🍴 Discover Amazing Restaurants
      </h2>
      <div className="flex flex-wrap md:justify-start justify-center  gap-5 px-4 bor">
        {dataList.map((restaurant, index) => (
          <div
            key={index}
            className="w-full md:w-64 h-72 bg-white rounded-xl border border-gray-300 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative bor cursor-pointer"
            onClick={() => {
              navigate(`/restaurant-detail/${restaurant.id}`);
            }}
          >
            {/* Background Image */}
            <div
              className="w-full h-32 bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: `url(${restaurant.backgroundUrl})` }}
            ></div>

            {/* Restaurant Info */}
            <div className="p-4">
              <div className="flex justify-center -mt-8">
                <div className="w-14 h-14 bg-stone-300 rounded-full flex items-center justify-center shadow-md border border-stone-400">
                  <img
                    src={restaurant.iconUrl}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </div>
              <h3 className="text-base font-medium mt-4">{restaurant.name}</h3>
              <p className="text-sm text-gray-800 mt-1">{restaurant.address}</p>
            </div>

            {/* Action Button */}
            <div className="flex  bor px-4">
              <button className="px-6 py-[4px] border border-stone-500 rounded-md text-sm">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList4;
