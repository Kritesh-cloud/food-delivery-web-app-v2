import React, { useEffect, useState } from "react";
import { getDashboard, setDashboard } from "../../context/DashboardContext";
import { useNavigate } from "react-router-dom";

const ListRestaurant = () => {
  const navigate = useNavigate();
  const { browseContent, restaurantList } = getDashboard();
  const { getRestaurantList, getBrowseContent } = setDashboard();

  const [dataList, setDataList] = useState([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataList.length / itemsPerPage);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return dataList.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    getRestaurantList();
  }, []);

  useEffect(() => {
    console.log(restaurantList);
    setDataList(restaurantList);
  }, [restaurantList]);

  return (
    <div className="flex p-5 justify-start hw100 borr">
      <div className="w-full bg-white px-5 rounded-lg shadow-lg border border-orange-400">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">
          Restaurant List
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="py-3 px-6 text-left">SN</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Approved</th>
                <th className="py-3 px-6 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((restaurant) => (
                <tr
                  key={restaurant.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{restaurant.sn}</td>
                  <td className="py-3 px-6">{restaurant.name}</td>
                  <td className="py-3 px-6">{restaurant.email}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        restaurant.approved
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {restaurant.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="flex py-2 px-6">
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        navigate("/restaurant-detail/" + restaurant.id);
                      }}
                    >
                      Details
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 font-semibold rounded-lg transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 font-semibold rounded-lg transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListRestaurant;
