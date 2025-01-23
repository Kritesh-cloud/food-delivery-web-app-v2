import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { showSuccessMessage, showDangerMessage } from "../utils/notification";
import { setNavbar, getNavbar } from "./NavbarContext";
import { Link, useNavigate } from "react-router-dom";
const HomeContext = React.createContext();
const HomeContextUpdate = React.createContext();

export const getHome = () => {
  return useContext(HomeContext);
};

export const setHome = () => {
  return useContext(HomeContextUpdate);
};

export const HomeProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const getCart = setNavbar();
  const cartCount = getNavbar();
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [ownerRestaurant, setOwnerRestaurant] = useState({});
  const [restaurantList1, setRestaurantList1] = useState([]);
  const [restaurantList2, setRestaurantList2] = useState([]);
  const [restaurantList3, setRestaurantList3] = useState([]);
  const [restaurantList4, setRestaurantList4] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function getRestaurantList() {
    const url1 = "http://localhost:8080/list-restaurant-details/0";
    const url2 = "http://localhost:8080/list-restaurant-details/1";
    const url3 = "http://localhost:8080/list-restaurant-details/2";
    const url4 = "http://localhost:8080/list-restaurant-details/3";
    axios
      .get(url1)
      .then((res) => {
        // console.log(res.data);
        setRestaurantList1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(url2)
      .then((res) => {
        // console.log(res.data);
        setRestaurantList2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(url3)
      .then((res) => {
        setRestaurantList3(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(url4)
      .then((res) => {
        setRestaurantList4(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRestaurntDetail(id) {
    const url = `http://localhost:8080/list-restaurant-details-by-id/${id}`;
    axios
      .get(url)
      .then((res) => {
        setRestaurantDetail(res.data);
      })
      .catch((err) => {
        console.log("err in RES", err);
      });
  }

  function addToCart(id, userToken) {
    try {
      const bearerToken = `Bearer ${JSON.parse(userToken)}`;
      const url = `http://localhost:8080/user/order/add-to-basket/${id}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          getCart();
        })
        .catch((err) => {
          showDangerMessage("Item couldn't be added to cart");
        });
    } catch (err) {
      console.log("err in add to cart, home context: ", err);
    }
  }

  const getUserCart = () => {
    const url = `http://localhost:8080/user/order/get-user-basket`;
    const bearerToken = `Bearer ${JSON.parse(token)}`;
    const header = {
      headers: {
        Authorization: bearerToken,
      },
    };
    axios
      .get(url, header, header)
      .then((res) => {
        const sortedItems = [...res.data.menuItemResponses].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCartItems(sortedItems);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const itemQuantityUpdate = (itemId, quantity) => {
    try {
      const url = `http://localhost:8080/user/order/update-item-quantity?menuItemId=${itemId}&quantity=${quantity}`;
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          getUserCart();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const itemRemove = (itemId) => {
    try {
      const url = `http://localhost:8080/user/order/remove-from-basket/${itemId}`;
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          getUserCart();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const checkout = () => {
    const url = "http://localhost:8080/user/order/payment-detail";
    const currentCheckout = {
      amount: cartItems.reduce(
        (total, item) => total + item.price * item.quantity * 100,
        0
      ),
      quantity: 1,
      currency: "INR",
      name: "Food Items",
    };
    const bearerToken = `Bearer ${JSON.parse(token)}`;
    const header = {
      headers: {
        Authorization: bearerToken,
      },
    };

    console.log(url, currentCheckout, header);
    axios
      .post(url, currentCheckout, header)
      .then((res) => {
        console.log(res.data);
        const tempSucess = res.data.status;
        const tempUrl = res.data.sessionUrl;
        console.log(tempSucess);
        console.log(tempUrl);
        if (res.data.status == "SUCCESS") {
          console.log("sucess pay");
          window.location.href = tempUrl;
          // navigate(tempUrl)
        }
        console.log("res data payment");
      })
      .catch((err) => {
        console.log("res data payment error", err);
      });
  };

  function createRestaurant(formData) {
    try {
      const url = "http://localhost:8080/user/account/register-restaurant";
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, formData, header)
        .then((res) => {
          showSuccessMessage(
            "Restauarnt account created. Please login again to refresh your token"
          );
          navigate("/");
        })
        .catch((err) => {
          showDangerMessage("Failed to create restauarnt account");
        });
    } catch (err) {
      console.log(err);
    }
  }

  function updateRestaurantData(formData) {
    try {
      const url = "http://localhost:8080/owner/update-restaurant";
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, formData, header)
        .then((res) => {
          showSuccessMessage("Restauarnt updated successfully.");
        })
        .catch((err) => {
          showDangerMessage("Failed to update restauarnt.");
        });
    } catch (err) {
      console.log(err);
    }
  }

  function getOwnerRestauarnt() {
    try {
      const url = "http://localhost:8080/owner/view-owner-restaurant";
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .get(url, header, header)
        .then((res) => {
          // console.log("setOwnerRestaurant()", res.data);
          setOwnerRestaurant(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function addToMenuCategory(category) {
    try {
      const url = `http://localhost:8080/owner/add-menu-category?menuCategory=${category}`;
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          // console.log("added category,",res.data)
          showSuccessMessage("Menu category added");
          getOwnerRestauarnt();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function addToMenuItem(itemName, categoryId, price) {
    try {
      const url = `http://localhost:8080/owner/add-menu-item?menuItem=${itemName}&menuCategoryId=${categoryId}&price=${price}`;
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          // console.log("added item,",res.data)
          showSuccessMessage("Menu item added");
          getOwnerRestauarnt();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  ///delete-menu-category?menuCategoryId=9
  ///owner/delete-menu-item/1

  function deleteMenuCategory(categoryId) {
    try {
      const url = `http://localhost:8080/owner/delete-menu-category?menuCategoryId=${categoryId}`;
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          // console.log("delete category,", res.data);
          showSuccessMessage("Menu category removed");
          getOwnerRestauarnt();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function deleteMenuItem(itemId) {
    try {
      const url = `http://localhost:8080/owner/delete-menu-item/${itemId}`;
      const bearerToken = `Bearer ${JSON.parse(token)}`;
      const header = {
        headers: {
          Authorization: bearerToken,
        },
      };
      axios
        .post(url, header, header)
        .then((res) => {
          // console.log("delete item,", res.data);
          showSuccessMessage("Menu item removed");
          getOwnerRestauarnt();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <HomeContext.Provider
      value={{
        restaurantDetail,
        restaurantList1,
        restaurantList2,
        restaurantList3,
        restaurantList4,
        cartItems,
        ownerRestaurant,
      }}
    >
      <HomeContextUpdate.Provider
        value={{
          getRestaurantList,
          getRestaurntDetail,
          addToCart,
          getUserCart,
          itemQuantityUpdate,
          itemRemove,
          checkout,
          createRestaurant,
          getOwnerRestauarnt,
          updateRestaurantData,
          addToMenuCategory,
          addToMenuItem,
          deleteMenuCategory,
          deleteMenuItem,
        }}
      >
        {children}
      </HomeContextUpdate.Provider>
    </HomeContext.Provider>
  );
};
