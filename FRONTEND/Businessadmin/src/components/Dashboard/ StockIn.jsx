import React, { useEffect, useState } from "react";
import axiosInstance from "/src/constants/axiosInstance";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StockIn = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(""); // Added for item selection
  const [quantity, setQuantity] = useState("");
  const [categoryError, setCategoryError] = useState(null);
  const [itemError, setItemError] = useState(null); // Separate error for item fetching
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const [errorMessage, setErrorMessage] = useState(null); // Error message

  // Fetch categories on mount
  useEffect(() => {
    axiosInstance
      .get("/categories/")
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategoryError(`Failed to load categories: ${error.message}`);
      });
  }, []);

  // Fetch items when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      axiosInstance
        .get(`/categories/${selectedCategory}/items/`)
        .then((response) => setItems(response.data))
        .catch((error) => {
          console.error("Error fetching items:", error);
          setItemError(`Failed to load items: ${error.message}`);
        });
    }
    // Reset items and selected item when category changes
    setItems([]);
    setSelectedItem("");
  }, [selectedCategory]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

  

    const data = {
      quantity: parseInt(quantity, 10), // Ensure the quantity is an integer
    };

    axiosInstance
      .patch(`/items/${selectedItem}/stockin/`, data) // Use the item ID in the endpoint
      .then((response) => {
        setSuccessMessage(`Stock updated! New quantity: ${response.data.new_quantity}`);
        setErrorMessage(null); // Clear any previous error messages
        setQuantity(""); // Clear the quantity field after successful update
      })
      .catch((error) => {
        console.error("Error updating stock:", error);
        setErrorMessage("Failed to update stock. Please try again.");
        setSuccessMessage(null); // Clear any previous success messages
      });
  };

  return (
    <div className="relative">

      <div className="flex items-center justify-center mt-20">
        <div className="my-4 w-[250px]">
          <div className="mb-5">
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
          
          <div className="space-y-2">
            <h1>Stock In Card</h1>

            {/* Display error for category fetching */}
            {categoryError && <div className="text-red-500">{categoryError}</div>}

            <div className="flex gap-2">
              {/* Category selection */}
              <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Item selection */}
              <Select
                onValueChange={(value) => setSelectedItem(value)}
                disabled={!selectedCategory || items.length === 0} // Disabled if no category or no items
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Item" />
                </SelectTrigger>
                <SelectContent>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-gray-500 px-4 py-2">
                      {selectedCategory
                        ? "No items available for this category"
                        : "Select a category first"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Display error for item fetching */}
            {itemError && <div className="text-red-500">{itemError}</div>}

            {/* Quantity input */}
            <input
              type="number"
              className="border px-4 py-2 rounded w-full"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

           

            {/* Submit button */}
            <button
              className="bg-Customl text-white px-4 py-2 rounded"
              onClick={handleSubmit}
              disabled={!selectedCategory || !selectedItem || !quantity } // Disable if any required field is missing
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockIn;
