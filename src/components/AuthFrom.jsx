import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth, setAuth } from "../context/AuthContext";
import { showSuccessMessage, showDangerMessage } from "../utils/notification";

const AuthForm = ({ closeForm, setToken }) => {
  const { token, curStausCode } = getAuth();
  const authUpdate = setAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [submitRefresh, setSubmitRefresh] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authUpdate(formData, isSignUp);
    setSubmitRefresh(!submitRefresh);
  };

  // const notify = () => toast("Wow so easy!");

  useEffect(() => {
    if (curStausCode == 200 && isSignUp) {
      showSuccessMessage("Sign Up, Successfully. Please Sign In.");
      setIsSignUp(!isSignUp);
    } else if (curStausCode == 200 && !isSignUp) {
      setToken(token);
      showSuccessMessage("Signed in Successfully");
      closeForm(false);
    }
    if (curStausCode == 409 && isSignUp) {
      showDangerMessage("This email is already in use");
    } else if (curStausCode == 401 && !isSignUp) {
      showDangerMessage("Password or Email dosen't match");
    }
  }, [curStausCode, submitRefresh,token]);

  useEffect(() => {}, []);

  return (
    <div className="relative flex items-center justify-center bg-orange-50  rounded-md min-w-[340px] max-w-[400px]">
      <div
        className="flexmid absolute bor top-2 right-2 h-8 w-8 hover:cursor-pointer"
        onClick={() => {
          closeForm(false);
        }}
      >
        <CloseIcon />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-orange-500 text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 bor">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div className="flexcol items-start gap-2 justify-between bor">
            <div className="flex items-center bor">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-orange-500 hover:underline bor"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
