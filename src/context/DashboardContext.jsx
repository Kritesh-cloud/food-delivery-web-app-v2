import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessMessage, showDangerMessage } from "../utils/notification";

const DashboardContext = React.createContext();
const DashboardContextUpdate = React.createContext();

export const getDashboard = () => {
  return useContext(DashboardContext);
};

export const setDashboard = () => {
  return useContext(DashboardContextUpdate);
};

export const DashboardProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const [browseContent, setBrowseContent] = useState([]);
  const [serialBrowseContent, setSerialBrowseContent] = useState([]);
  const [reveseBrowseContent, setReverseBrowseContent] = useState([]);
  const [restaurantList, setRestauarntList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  function getBrowseContent() {
    try {
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const url = `http://localhost:8080/moderator/list-restaurant-browse-content`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .get(url, header, header)
        .then((res) => {
          console.log("res.data", res.data);
          setBrowseContent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("err in add to cart, home context: ", err);
    }
  }
  function getBrowseContentById(id) {
    try {
      const url = `http://localhost:8080/list-restaurant-details/${id}`;
      axios
        .get(url)
        .then((res) => {
          console.log("setSerialBrowseContent  res.data", res.data);
          setSerialBrowseContent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("err in add to cart, home context: ", err);
    }
  }
  function getReverseBrowseContentById(id) {
    try {
      const url = `http://localhost:8080/reverse-list-restaurant-details/${id}`;
      axios
        .get(url)
        .then((res) => {
          console.log("setReverseBrowseContent res.data", res.data);

          setReverseBrowseContent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("err in add to cart, home context: ", err);
    }
  }

  function getRestaurantList() {
    try {
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const url = `http://localhost:8080/list-short-restaurant-details`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .get(url, header, header)
        .then((res) => {
          const updatedData = res.data.map((item, index) => ({
            ...item,
            sn: index + 1,
            detail: "Detail",
            link: "/dashboard/restaurant",
          }));
          // console.log("res.data updatedData", updatedData);
          setRestauarntList(updatedData);
        })
        .catch((err) => {
          console.log("err in axios", err);
        });
    } catch (err) {
      console.log("err in try catch", err);
    }
  }

  function manageRestaurantBrowseContent(browseId, id, typeAdd) {
    console.log("browseId, id, typeAdd", browseId, id, typeAdd);
    try {
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const addPath = `http://localhost:8080/moderator/add-item-to-browse-content?browseContentId=${browseId}&itemId=${id}`;
      const rmvPath = `http://localhost:8080/moderator/remove-item-from-browse-content?browseContentId=${browseId}&itemId=${id}`;
      const url = typeAdd ? addPath : rmvPath;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      console.log("url", url, header);
      axios
        .post(url, header, header)
        .then((res) => {
          console.log(res.data);
          showSuccessMessage(
            typeAdd
              ? "Restaurant added to Browse Content"
              : "Restaurant removed from Browse Content"
          );
        })
        .catch((err) => {
          console.log("err in axios", err);
        });
    } catch (err) {
      console.log("err in try catch", err);
    }
  }

  function addToCategory(formData) {
    try {
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const url = `http://localhost:8080/admin/add-new-category`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, formData, header)
        .then((res) => {
          showSuccessMessage("New category added succesfully.")
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("err in add to cart, home context: ", err);
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        browseContent,
        serialBrowseContent,
        reveseBrowseContent,
        restaurantList,
      }}
    >
      <DashboardContextUpdate.Provider
        value={{
          getBrowseContent,
          getBrowseContentById,
          getReverseBrowseContentById,
          getRestaurantList,
          manageRestaurantBrowseContent,
          addToCategory,
        }}
      >
        {children}
      </DashboardContextUpdate.Provider>
    </DashboardContext.Provider>
  );
};
