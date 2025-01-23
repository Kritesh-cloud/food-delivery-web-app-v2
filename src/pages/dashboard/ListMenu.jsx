import React, { useEffect, useState } from "react";
import { setHome, getHome } from "../../context/HomeContext";
import { Delete } from "@mui/icons-material";
import { showDangerMessage } from "../../utils/notification";

const ListMenu = () => {
  const {
    getOwnerRestauarnt,
    addToMenuCategory,
    addToMenuItem,
    deleteMenuCategory,
    deleteMenuItem,
  } = setHome();
  const { ownerRestaurant } = getHome();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(
    data?.menuCategoryResponses || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addCategory = () => {
    if (newCategory) {
      // console.log(newCategory);
      addToMenuCategory(newCategory);
      setNewCategory("");
    }
  };

  const addItem = () => {
    if (newItem && selectedCategory && newItemPrice) {
      // console.log(newItem, selectedCategory, newItemPrice);
      addToMenuItem(newItem, selectedCategory, newItemPrice);
      setNewItem("");
      setNewItemPrice("")
    }
  };

  const deleteCategory = (categoryId) => {
    // console.log("categoryId", categoryId);
    deleteMenuCategory(categoryId)
    
  };

  const deleteItem = (itemName) => {
    // console.log("itemName",itemName);
    deleteMenuItem(itemName)
  };

  useEffect(() => {
    getOwnerRestauarnt();
  }, []);

  useEffect(() => {
    setData(ownerRestaurant);
    setCategories(ownerRestaurant?.menuCategoryResponses || []);
  }, [ownerRestaurant]);

  return (
    <div className="flexcol justify-start bor hw100 p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">Menu List</h1>
      <div className="p-6 bg-white text-black w-full rounded shadow-lg bor border border-orange-400">
        
        <div className="hideScroll h-[480px] overflow-y-auto bor">
          {/* Input field and button to add a new category */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={addCategory}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Add Category
            </button>
          </div>

          {/* Input fields, dropdown, and button to add a new menu item */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <select
              className="p-2 border border-gray-300 rounded mr-2"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={addItem}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Add Item
            </button>
          </div>

          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="mb-6">
                <div className="flex gap-3 justify-start items-center border-b pb-1 border-orange-400 bor">
                  <h2 className="text-xl font-semibold text-black">
                    {category.name}
                  </h2>
                  <div
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Delete />
                  </div>
                </div>
                <ul className="mt-2">
                  {category.menuItemResponseList.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between p-2 bg-gray-100 mt-1 rounded"
                    >
                      <span>
                        {item.name} -{" "}
                        <span className="text-orange-500">
                          NRS {item.price}
                        </span>
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete Item
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No categories available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
