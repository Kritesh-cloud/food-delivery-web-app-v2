import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { showSuccessMessage } from "../utils/notification";

const Logout = ({ isOpen }) => {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Open modal
  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setIsLogoutOpen(false);
  };

  // Confirm logout
  const handleConfirmLogout = () => {
    console.log("Yes");
    setIsLogoutOpen(false);
    localStorage.removeItem("authToken");
    navigate("/");
    showSuccessMessage("Logged Out");
    window.location.reload();
  };

  return (
    <div className="relative">
      {/* Logout Button */}
      <div
        className={`flex ${
          isOpen ? "justify-start" : "justify-center"
        } rounded-lg bg-orange-600 bor`}
      >
        <Link
          onClick={handleLogoutClick}
          className={`flex  ${
            isOpen ? "pl-4 pr-2" : "px-0"
          } py-2 text-white font-normal  hover:bg-orange-600 transition bor`}
        >
          <div className="relative flexmid bor h-8 w-8 bor">
            <div className="absolute flexmid bor ">
              <LogoutIcon />
            </div>
          </div>
          {isOpen && (
            <div className="hideScroll relative pl-2 flex items-center w-[136px] overflow-x-auto overflow-y-hidden bor">
              <span className="absolute w-[300px]  bor">Log Out</span>
            </div>
          )}
        </Link>
      </div>

      {/* Modal */}
      {isLogoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold text-orange-500">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            {/* Buttons */}
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
              >
                Yes
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
