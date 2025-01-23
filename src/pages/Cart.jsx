import React, { useEffect, useState } from "react";
import { Add, Remove, Delete } from "@mui/icons-material";
import Navbar from "../general/Navbar";
import Footer from "../general/Footer";
import { getHome, setHome } from "../context/HomeContext";

const Cart = () => {
  const { cartItems } = getHome();
  const { itemQuantityUpdate, itemRemove, getUserCart, checkout } = setHome();

  const handleIncrease = (itemId, quantity) => {
    itemQuantityUpdate(itemId, quantity + 1);
  };

  const handleDecrease = (itemId, quantity) => {
    itemQuantityUpdate(itemId, quantity - 1);
  };

  const handleRemove = (itemId) => {
    itemRemove(itemId);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <div className="flexcol bor">
      <div className="h-[80px]">
        <Navbar />
      </div>
      <div className="min-h-[500px] bg-white text-black pb-[130px]">
        <h1 className="pt-8 md:pt-10 px-6 md:px-36 text-2xl md:text-3xl">
          Order Summary
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 p-6 md:px-36">Your cart is empty.</p>
        ) : (
          <div className="bg-gray-100 rounded-lg shadow-lg  px-6 py-2 md:px-36 bor">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 py-4 bor"
              >
                {/* Item Name & Price */}
                <div className="bor flex-1 basis-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-stone-600">NRS {item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-end flex-1 basis-1 items-center space-x-4 bor">
                  <button
                    className="flexmid bg-orange-600 h-8 w-8 hover:bg-orange-700 p-2 rounded-full bor"
                    onClick={() => handleIncrease(item.id, item.quantity)}
                  >
                    <Add
                      className="text-white bor"
                      style={{ fontSize: "16px" }}
                    />
                  </button>
                  <span className="flexmid w-8 text-lg font-medium bor">
                    {item.quantity}
                  </span>
                  <button
                    className="flexmid bg-orange-600 h-8 w-8 hover:bg-orange-700 p-2 rounded-full bor"
                    onClick={() => handleDecrease(item.id, item.quantity)}
                  >
                    <Remove
                      className="text-white bor"
                      style={{ fontSize: "16px" }}
                    />
                  </button>

                  <button
                    className="flexmid bg-red-600 h-8 w-8 hover:bg-red-700 p-2 rounded-full bor"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Delete
                      className="text-white"
                      style={{ fontSize: "16px" }}
                    />
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right text-xl font-medium text-black mt-5">
              Total: NRS {calculateTotal()}
            </div>
            <div className="flex justify-end mt-8 bor">
              <button
                className="bg-black text-sm text-white px-12 py-2"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
