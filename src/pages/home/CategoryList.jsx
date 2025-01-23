import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryList = () => {
  const [dataList, setDataList] = useState([]);

  const getCategoryList = () => {
    const url = "http://localhost:8080/user/browse/list-main-category";
    axios
      .get(url)
      .then((res) => {
        setDataList(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="px-6 py-6  md:px-20 md:py-16 ">
      <h2 className="text-2xl md:text-3xl font-light text-black mb-4 px-6 none">
        Categories
      </h2>
      <div className="flex  hideScroll bor overflow-y-auto">
        {dataList &&
          dataList.length > 0 &&
          dataList.map((item, index) => (
            <div key={item.name + index} className="flexcol gap-2 aic bor">
              <div className="w-28 flex jcc bor">
                <div className="flexmid w-14 h-14 md:w-16 md:h-16 p-1 rounded-full border border-slate-700 bg-slate-300">
                  <div className="border border-slate-700 bor rounded-full overflow-hidden">
                    <img src={item.imageUrl} className="w100" />
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#2a2a2a]">{item.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
