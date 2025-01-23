import React from "react";

import NavbarCover from "../../cover/NavbarCover";
import Footer from "../../general/Footer";
import Hero from "./Hero";
import CategoryList from "./CategoryList";
import RestaurantManagement from "./RestaurantManagement";
import { HomeProvider } from "../../context/HomeContext";
import Navbar from "../../general/Navbar";

const HomeLayout = () => {
  return (
    <div className="flexcol bor">
      <div>
        <Navbar />
        <div className="h-[80px]"></div>
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <CategoryList />
      </div>
      <div></div>
      <div id="restaurant" className="flexcol">
        <HomeProvider>
          <RestaurantManagement />
        </HomeProvider>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
