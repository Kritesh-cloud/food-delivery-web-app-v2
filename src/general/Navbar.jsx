import React, { useEffect, useState } from "react";
import AuthForm from "../components/AuthFrom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { navigation } from "../constant";
import { AuthProvider } from "../context/AuthContext";
import { getNavbar } from "../context/NavbarContext";
import { showSuccessMessage, showDangerMessage } from "../utils/notification";
import logo from "../assets/logo/logo1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const cartCount = getNavbar();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken")) || ""
  );

  const [isOpen, setIsOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleClick = (buttonName) => {
    if (buttonName === "Sign In") {
      setShowAuthForm(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    setToken("");
    navigate("/");
    showSuccessMessage("Logged Out");
    window.location.reload();
  };

  const extractUserTokenToJson = (userToken) => {
    const base64Url = userToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    // console.log(JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload);
  };
  const dashboardAccess = () => {
    const userToken = localStorage.getItem("authToken");
    if (userToken == null || userToken == "") {
      return false;
    }
    try {
      const userRoles = extractUserTokenToJson(userToken).roles;
      return userRoles.length > 1;
    } catch (ex) {
      return false;
    }
  };

  return (
    <>
      <nav className="bg-orange-100 text-orange-500 p-4 md:px-[100px] fixed w100 z-30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-12 bor">
            <img src={logo} className="h100" />
          </div>

          <div className="mdnone flex gap-5">
            {token != "" && (
              <button className="relative bor">
                <ShoppingCartIcon />
                <span className="flexmid absolute text-sm right-[-4px] bottom-[-4px] rounded-full bg-white h-4 w-4 borx3">
                  {cartCount}
                </span>
              </button>
            )}
            <button
              className=" text-orange-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </button>
          </div>
          <ul
            className={`md:flex space-x-6 ${
              isOpen ? "block top-16" : "hidden"
            } md:block absolute md:relative bg-orange-100 text-orange-500 md:bg-transparent left-0 w-full md:w-auto p-4 md:p-0`}
          >
            {navigation &&
              navigation.map(
                (item, index) =>
                  // (item.display && (!item.loggedIn || (item.loggedIn && dashboardAccess())))) && "A"+index+" "
                  item.display &&
                  (!item.loggedIn || (item.loggedIn && dashboardAccess())) && (
                    <li key={index}>
                      <Link
                        to={item.link}
                        className="block py-2 hover:text-orange-600"
                        onClick={() => navigate(item.link)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
              )}
            {token == "" ? (
              <button
                className="  bg-white  text-orange-500 px-4 py-1 rounded-md hover:bg-orange-600 hover:text-white  md:w-auto mt-1 md:mt-0 bor mdnone border border-orange-600"
                onClick={() => handleClick("Sign In")}
              >
                Sign In
              </button>
            ) : (
              <button
                className="  bg-white text-orange-500 px-4 py-1 rounded-md hover:bg-orange-600 hover:text-white  md:w-auto mt-1 md:mt-0 mdnone border border-orange-600"
                onClick={logOut}
              >
                Log Out <LogoutIcon />
              </button>
            )}
          </ul>
          <div className="hidden md:flex">
            {token == "" ? (
              <button onClick={() => handleClick("Sign In")}>
                <AccountCircleIcon /> Sign In
              </button>
            ) : (
              <div className="flex gap-6 bor">
                <button
                  className="relative bor"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <ShoppingCartIcon />
                  <span className="flexmid absolute text-sm right-[-4px] bottom-[-4px] rounded-full bg-white h-4 w-4 borx3">
                    {cartCount}
                  </span>
                </button>
                <button onClick={logOut} className="bor">
                  Log Out&nbsp;
                  <LogoutIcon fontSize="small" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Authentication Form */}
      {showAuthForm && (
        <div
          className={`${
            isOpen ? "" : ""
          } fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 md:pb-0 pb-[120px] z-40`}
        >
          <AuthProvider>
            <AuthForm closeForm={setShowAuthForm} setToken={setToken} />
          </AuthProvider>
        </div>
      )}
    </>
  );
};

export default Navbar;
