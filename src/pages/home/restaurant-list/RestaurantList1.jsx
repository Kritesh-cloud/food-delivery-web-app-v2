import React from "react";
import { useNavigate } from "react-router-dom";
const RestaurantList1 = ({ dataList }) => {
  const navigate = useNavigate();
  return (
    <div className="px-6 md:px-20 bor">
      <h2 className="text-2xl pb-4 md:pb-6">Best Eateries for Every Taste</h2>
      <div className="hideScroll flex overflow-x-auto gap-4 md:gap-6 scrollbar-hide bor">
        {dataList.map((restaurant, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 rounded-lg shadow-lg overflow-hidden relative bor hover:cursor-pointer"
            onClick={() => {
              navigate(`/restaurant-detail/${restaurant.id}`);
            }}
          >
            {/* Background Image */}
            <div
              className="w-full h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${restaurant.backgroundUrl})` }}
            ></div>

            {/* Restaurant Info */}
            <div className="p-4 bg-orange-500 text-white">
              <div className="flex items-center">
                <img
                  src={restaurant.iconUrl}
                  alt={restaurant.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div className="ml-3">
                  <h3 className="text-md text-black">{restaurant.name}</h3>
                  <div className="text-xs text-black overflow-hidden bor hideScroll">
                    <p className="bor w-[200%]">{restaurant.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList1;
