import React, { useEffect, useState } from "react";
import RestaurantList1 from "./restaurant-list/RestaurantList1";
import RestaurantList2 from "./restaurant-list/RestaurantList2";
import RestaurantList3 from "./restaurant-list/RestaurantList3";
import RestaurantList4 from "./restaurant-list/RestaurantList4";

import { getHome, setHome } from "../../context/HomeContext";

const RestaurantManagement = () => {
  const { restaurantList1, restaurantList2, restaurantList3, restaurantList4 } =
    getHome();
  const { getRestaurantList } = setHome();
  const [dataList1, setDataList1] = useState([]);
  const [dataList2, setDataList2] = useState([]);
  const [dataList3, setDataList3] = useState([]);
  const [dataList4, setDataList4] = useState([]);

  useEffect(() => {
    getRestaurantList();
  }, []);

  useEffect(() => {
    setDataList1(restaurantList1);
    setDataList2(restaurantList2);
    setDataList3(restaurantList3);
    setDataList4(restaurantList4);
  }, [restaurantList1, restaurantList2, restaurantList3, restaurantList4]);

  return (
    <div className="flexcol gap-8 md:gap-10 z-0">
      <div>
        <RestaurantList1 dataList={dataList1} />
      </div>
      <div>
        <RestaurantList2 dataList={dataList2} />
      </div>
      <div>
        <RestaurantList3 dataList={dataList3} />
      </div>
      <div>
        <RestaurantList4 dataList={dataList4} />
      </div>
    </div>
  );
};

export default RestaurantManagement;
