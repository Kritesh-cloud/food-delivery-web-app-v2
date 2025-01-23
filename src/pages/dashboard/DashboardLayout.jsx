import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userRoles, setUserRoles] = useState([]);

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

  useEffect(() => {
    if (token == null) {
      navigate("/");
    } else {
      const userClaim = extractUserTokenToJson(token);
      setUserRoles(userClaim.roles);
      // console.log(userClaim);
    }
  }, []);

  return (
    <div className="flex hw-100 bor">
      <div className=" bor">
        <Sidebar userRoles={userRoles} />
      </div>
      <div className="flex-1 bor">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
