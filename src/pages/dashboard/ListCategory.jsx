import axios from "axios";
import React, { useEffect, useState } from "react";

const ListCategory = () => {
  const [dataList, setDataList] = useState([]);

  const getCategoryList = () => {
    const url = "http://localhost:8080/user/browse/list-main-category";
    axios
      .get(url)
      .then((res) => {
        setDataList(res.data);
      })
      .catch((err) => {});
  };

  const itemsPerPage = 6;
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
    getCategoryList();
  }, []);

  return (
    <div className="flex p-5 justify-start hw100 borr">
      <div className="w-full  bg-orange-100 p-6 rounded-lg shadow-lg border border-orange-400">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">
          Category List
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getPaginatedData().map((category, index) => (
            <div
              key={index}
              className="flexcol jcc aic bg-gray-100 p-4 rounded-lg shadow-md text-center border border-orange-300 "
            >
              <div className="p-2 h-32 w-32 rounded-lg border bg-orange-100 border-orange-200 non">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full object-cover  "
                />
              </div>
              <p className="text-lg font-semibold mt-2 text-gray-800">
                {category.name}
              </p>
            </div>
          ))}
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

export default ListCategory;
