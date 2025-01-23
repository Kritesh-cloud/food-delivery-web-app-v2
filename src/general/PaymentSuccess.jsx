import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-6 pb-[140px]">
      {/* Success Icon */}
      <CheckCircleOutline className="text-orange-500 text-6xl animate-bounce mb-4" />

      {/* Success Message */}
      <h1 className="text-3xl font-bold text-black mb-2">Payment Successful!</h1>
      <p className="text-gray-600 text-center max-w-md">
        Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>

      {/* Order Summary */}
      <div className="mt-6 bg-orange-100 p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold text-orange-500">Order Summary</h2>
        <div className="mt-2 flex justify-between">
          <span>Order ID:</span>
          <span className="font-medium">#12345678</span>
        </div>
        <div className="mt-2 flex justify-between none">
          <span>Total Amount:</span>
          <span className="font-medium">NRS 45.99</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span>Payment Method:</span>
          <span className="font-medium">Credit Card</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition none"
          onClick={() => navigate("/orders")}
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
