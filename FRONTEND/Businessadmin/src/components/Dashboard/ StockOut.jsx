'use client';
import axiosInstance from '/src/constants/axiosInstance'; // Ensure this path is correct
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const StockOut = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const [quantity, setQuantity] = useState(''); // State for quantity
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    // Fetch categories
    axiosInstance
      .get('/categories/')
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setError(`Failed to load categories: ${error.message}`);
      });
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setItems([]); // Clear items when category changes

    // Fetch items for the selected category
    axiosInstance
      .get(`/categories/${categoryId}/items/`) // Adjust this endpoint to match your API
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.error('Error fetching items:', error);
        setError(`Failed to load items: ${error.message}`);
      });
  };

  const handleStockOut = () => {
    if (!selectedItem || !quantity || quantity <= 0) {
      setError('Please select an item and enter a valid quantity.');
      return;
    }

    // Send data to the backend to subtract the stock
    axiosInstance
      .patch(`/stockout/${selectedItem}/`, {
        quantity: parseInt(quantity, 10),
      })
      .then((response) => {
        setSuccessMessage('Stock updated successfully!');
        setError(null);
        setQuantity(''); // Reset quantity
      })
      .catch((error) => {
        console.error('Error updating stock:', error);
        setError('Failed to update stock. Please try again.');
      });
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center mt-20">
        <div className="my-4 w-[250px]">
          <div className="space-y-2">
            <h1>Stock Out Card</h1>
            {error && <div className="text-red-500">{error}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}

            <div className="flex gap-2">
              {/* Category Dropdown */}
              <Select onValueChange={(value) => handleCategoryChange(value)}>
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

              {/* Item Dropdown */}
              <Select onValueChange={(value) => setSelectedItem(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Item" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <input
              type="number"
              className="border px-4 py-2 rounded w-full"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={handleStockOut} className="bg-Customl text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockOut;
