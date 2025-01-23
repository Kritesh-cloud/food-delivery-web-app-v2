import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const NavbarContext = React.createContext();
const NavbarContextUpdate = React.createContext();

export const getNavbar = () => {
  return useContext(NavbarContext);
};

export const setNavbar = () => {
  return useContext(NavbarContextUpdate);
};

export const NavbarProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [cartCount, setCartCount] = useState(0);
  const [refreshCart, setRefreshCart] = useState(true);

  const toggelCartRefresh = () => {
    setRefreshCart(!refreshCart);
  };
  const isTokenExpired = (userToken) => {
    if (!userToken || !userToken.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return userToken.exp > currentTime;
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
    return JSON.parse(jsonPayload);
  };

  function getCart() {
    const url = "http://localhost:8080/user/order/get-user-basket";

    if (token == null) {
      // navigate("/");
      return;
    }

    if (!isTokenExpired(extractUserTokenToJson(token))) {
      //token expired
      localStorage.removeItem("authToken");
      // navigate("/");
      window.location.reload();
      return;
    }

    try {
      const header = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      };
// console.log(url,header)
      axios
        .get(url, header, header)
        .then((res) => {
          setCartCount(res.data.menuItemResponses.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setCartCount(0);
      console.log(err);
    }
  }

  useEffect(() => {
    getCart();
  }, [refreshCart]);

  return (
    <NavbarContext.Provider value={cartCount}>
      <NavbarContextUpdate.Provider value={getCart}>
        {children}
      </NavbarContextUpdate.Provider>
    </NavbarContext.Provider>
  );
};
