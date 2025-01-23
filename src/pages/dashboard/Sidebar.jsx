import React, { useState } from "react";
import { sideBarData } from "../../constant";
import { Link } from "react-router-dom";
import { Menu, Close, ExpandMore, ExpandLess } from "@mui/icons-material";

import Logout from "../../general/Logout";

const Sidebar = ({ userRoles = [] }) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open state
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle submenu
  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Check if userRoles array has any matching role in item.for
  const hasAccess = (allowedRoles) => {
    return allowedRoles.some((role) => userRoles.includes(role));
  };


  return (
    <div
      className={`flex ${
        isOpen ? "w-64" : "w-20"
      } flexcol transition-all duration-300  bor overflow-y-auto`}
    >
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } flexcol h-screen bg-orange-500 text-black p-4 transition-all duration-300 fixed`}
      >
        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <Close fontSize="medium" /> : <Menu fontSize="medium" />}
          </button>
        </div>

        <div className="hideScroll bor h-[80vh] overflow-y-auto">
          {/* Sidebar Items */}
          <ul className="space-y-4 bor pb-[100px]">
            {sideBarData.map((item, index) => {
              
              if (!hasAccess(item.for) || !item.display) return null;

              return (
                <li key={index} className="">
                  {/* Main Item */}
                  <div
                    className={`flex ${
                      isOpen ? "justify-start" : "justify-center"
                    } rounded-lg bg-orange-600 bor`}
                  >
                    {/* <div className={`flex items-center ${isOpen?"justify-between":"justify-end"} rounded-lg bg-orange-600 bor pr-2 bor`}> */}
                    <Link
                      to={item.subList.length > 0 ? "/dashboard" : item.link}
                      className={`flex  ${
                        isOpen ? "pl-4 pr-2" : "px-0"
                      } py-2 text-white font-normal  hover:bg-orange-600 transition bor`}
                    >
                      <div className="relative flexmid bor h-8 w-8 bor">
                        <div className="absolute flexmid bor ">{item.icon}</div>
                      </div>
                      {isOpen && (
                        <div className="hideScroll relative pl-2 flex items-center w-[136px] overflow-x-auto overflow-y-hidden bor">
                          <span className="absolute w-[300px]  bor">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </Link>

                    {/* If item has sublist, add toggle */}
                    {isOpen && item.subList.length > 0 && (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="text-white bor"
                      >
                        {openSubmenus[item.title] ? (
                          <ExpandLess fontSize="medium" />
                        ) : (
                          <ExpandMore fontSize="medium" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Submenu */}
                  {openSubmenus[item.title] && item.subList.length > 0 && (
                    <ul className="ml-2 mt-2 space-y-2">
                      {item.subList.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="block px-4 py-2 text-white bg-orange-400 rounded-lg hover:bg-orange-600 transition"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flexcol justify-end flex-1 bor">
          <Logout isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
