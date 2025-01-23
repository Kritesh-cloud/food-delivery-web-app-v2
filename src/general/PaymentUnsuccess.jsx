import React from "react";
import { ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PaymentUnsuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-6 pb-[140px]">
      {/* Error Icon */}
      <ErrorOutline className="text-red-500 text-6xl animate-pulse mb-4" />

      {/* Error Message */}
      <h1 className="text-3xl font-bold text-black mb-2">Payment Failed</h1>
      <p className="text-gray-600 text-center max-w-md">
        Unfortunately, your payment could not be processed. Please check your payment details and try again.
      </p>

      {/* Error Details */}
      <div className="mt-6 bg-red-100 p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold text-red-500">Transaction Details</h2>
        <div className="mt-2 flex justify-between">
          <span>Transaction ID:</span>
          <span className="font-medium">#98765432</span>
        </div>
        <div className="mt-2 flex justify-between none">
          <span>Amount:</span>
          <span className="font-medium">$45.99</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span>Reason:</span>
          <span className="font-medium">Insufficient funds</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition none"
          onClick={() => navigate("/payment")}
        >
          Retry Payment
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentUnsuccess;
