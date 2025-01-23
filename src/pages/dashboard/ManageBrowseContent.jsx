import React, { useEffect, useState } from "react";
import { getDashboard, setDashboard } from "../../context/DashboardContext";
import { useParams } from "react-router-dom";

const ManageBrowseContent = () => {
  // Sample restaurant data
  const { id } = useParams();
  const { serialBrowseContent, reveseBrowseContent } = getDashboard();
  const {
    manageRestaurantBrowseContent,
    getBrowseContentById,
    getReverseBrowseContentById,
  } = setDashboard();

  const [addedRestaurants, setAddedRestaurants] = useState([]);
  const [notAddedRestaurants, setNotAddedRestaurants] = useState([]);

  // Function to move restaurant to added list
  const addRestaurant = (restaurantId) => {
    // console.log(id, restaurantId, true)
    const browseId = parseInt(id, 10) + 1;
    console.log(browseId);
    manageRestaurantBrowseContent(browseId, restaurantId, true);
    getBrowseContentById(id);
    getReverseBrowseContentById(id);
  };

  // Function to remove restaurant from added list
  const removeRestaurant = (restaurantId) => {
    const browseId = parseInt(id, 10) + 1;
    console.log(browseId);
    manageRestaurantBrowseContent(browseId, restaurantId, false);
    getBrowseContentById(id);
    getReverseBrowseContentById(id);
  };

  useEffect(() => {
    getBrowseContentById(id);
    getReverseBrowseContentById(id);
  }, []);

  useEffect(() => {
    // console.log("-------------------------")
    // console.log("serialBrowseContent",serialBrowseContent);
    // console.log("reveseBrowseContent",reveseBrowseContent);
    // console.log("==========================")
    setAddedRestaurants(serialBrowseContent);
    setNotAddedRestaurants(reveseBrowseContent);
  }, [serialBrowseContent, reveseBrowseContent]);

  return (
    <div className="flex p-5 justify-start hw100 bor">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg border border-orange-400">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
          Manage Browse Content
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Already Added Restaurants */}
          <div className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">
              Already Added Restaurants
            </h3>
            <ul className="hideScroll bor overflow-x-auto h-[400px]">
              {addedRestaurants.map((restaurant, index) => (
                <li
                  key={restaurant.id}
                  className="flex items-center bg-white justify-between p-3 border-b border-gray-200 hover:bg-orange-200 transition-all duration-300 rounded-lg"
                >
                  
                  <div className="flex items-center space-x-3">
                    <img
                      src={restaurant.iconUrl}
                      alt={restaurant.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-black">
                        {restaurant.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {restaurant.owner.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {restaurant.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {restaurant.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        📞 {restaurant.contactNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        ⏰ {restaurant.openingTime} - {restaurant.closingTime}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeRestaurant(restaurant.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Not Added Restaurants */}
          <div className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">
              Not Added Restaurants
            </h3>
            <ul className="hideScroll bor overflow-x-auto h-[400px]">
              {notAddedRestaurants.map((restaurant, index) => (
                <li
                  key={restaurant.id}
                  className="flex items-center bg-white justify-between p-3 border-b border-gray-200 hover:bg-orange-200 transition-all duration-300 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={restaurant.iconUrl}
                      alt={restaurant.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-black">
                        {restaurant.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {restaurant.owner.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {restaurant.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        📞 {restaurant.contactNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        ⏰ {restaurant.openingTime} - {restaurant.closingTime}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => addRestaurant(restaurant.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBrowseContent;
