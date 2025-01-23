import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css"; // Specify weight
import "@fontsource/inter/400-italic.css"; // Specify weight and style for variable font support

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import NoPage from "./general/NoPage";
import RestaurantDetail from "./pages/home/RestaurantDetail";
import { HomeProvider } from "./context/HomeContext";
import { NavbarProvider } from "./context/NavbarContext";
import CartPage from "./pages/Cart";
import PaymentSuccess from "./general/PaymentSuccess";
import PaymentUnsuccess from "./general/PaymentUnsuccess";
import Service from "./pages/Service";
import About from "./pages/About";
import RestaurantAccount from "./pages/RestaurantAccount";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import AddCategory from "./pages/dashboard/AddCategory";
import ListCategory from "./pages/dashboard/ListCategory";
import { DashboardProvider } from "./context/DashboardContext";
import ListBrowseContent from "./pages/dashboard/ListBrowseContent";
import ListRestaurant from "./pages/dashboard/ListRestaurant";
import ManageBrowseContent from "./pages/dashboard/ManageBrowseContent";
import UpdateRestaurant from "./pages/dashboard/UpdateRestaurant";
import ListMenu from "./pages/dashboard/ListMenu";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarProvider>
          <HomeProvider>
            <DashboardProvider>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="dashboard" element={<Dashboard />}>
                  <Route path="category/add" element={<AddCategory />} />
                  <Route path="category/list" element={<ListCategory />} />
                  <Route
                    path="browse-content/list"
                    element={<ListBrowseContent />}
                  />
                  <Route path="restaurant/list" element={<ListRestaurant />} />
                  <Route
                    path="browse-content/:id"
                    element={<ManageBrowseContent />}
                  />
                  <Route path="restaurant/update" element={<UpdateRestaurant />} />
                  <Route path="menu" element={<ListMenu />} />
                  {/* <Route path="browse-content/list" element={<UpdateRestaurant />} />
                <Route
                  path="browse-content/:id"
                  element={<UpdateBrowseContent />}
                /> */}
                </Route>

                <Route
                  path="restaurant-detail/:id"
                  element={<RestaurantDetail />}
                />
                <Route path="cart" element={<CartPage />} />
                <Route path="about" element={<About />} />
                <Route path="service" element={<Service />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route
                  path="payment/unsuccess"
                  element={<PaymentUnsuccess />}
                />
                <Route
                  path="restaurant/create"
                  element={<RestaurantAccount />}
                />
                {/* <Route path="contactUs" element={<ContactUs />} />
        <Route path="cart" element={<Cart />} /> */}
                <Route path="*" element={<NoPage />} />
              </Routes>
            </DashboardProvider>
          </HomeProvider>
        </NavbarProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
