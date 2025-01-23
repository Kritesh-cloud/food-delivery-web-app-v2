import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard, setDashboard } from "../../context/DashboardContext";

const ListBrowseContent = () => {
  const { browseContent } = getDashboard();
  const { getBrowseContent } = setDashboard();
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState(browseContent);
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
    getBrowseContent();
  }, []);

  useEffect(() => {
    setDataList(browseContent);
  }, [browseContent]);

  return (
    <div className="flex p-5 justify-start hw100 borr">
      <div className="w-full bg-white px-5 rounded-lg shadow-lg border border-orange-400">
        <h2 className="text-2xl font-bold text-orange-500 text-center my-2">
          Browse Restaurants
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Restaurant Count</th>
                <th className="py-3 px-6 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((restaurant, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index+1}</td>
                  <td className="py-3 px-6">{restaurant.title}</td>
                  <td className="py-3 px-6">{restaurant.ids.length}</td>
                  <td className="flex py-2 px-6">
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        navigate("/dashboard/browse-content/" + (parseInt(restaurant.id)-1));
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

export default ListBrowseContent;
