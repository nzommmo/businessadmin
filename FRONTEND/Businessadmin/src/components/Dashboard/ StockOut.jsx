'use client'
import axiosInstance from "/src/constants/axiosInstance"; // Ensure this path is correct
import React, { useEffect, useState } from 'react';import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const  StockOut = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/categories/")
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError(`Failed to load categories: ${error.message}`);
      });
  }, []);

  return (
    <div className='relative'> 
    <div className='flex items-center justify-center mt-20'> 
    <div className='my-4 w-[250px]'>
    <div className='space-y-2'>
        <h1>Stock Out Card</h1>
        {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className='flex gap-2'>
                <Select>
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

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="item1">Item 1</SelectItem>
                    <SelectItem value="item2">Item 2</SelectItem>
                    <SelectItem value="item3">Item 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

      
              <input 
                type="number"
                className="border px-4 py-2 rounded w-full"
                placeholder="Quantity"
              />
              <input
                type="text"
                className="border px-4 py-2 rounded w-full"
                placeholder="Authorized By"
              />
              <input
                type="text"
                className="border px-4 py-2 rounded w-full"
                placeholder="Collector"
              />
            
              <button
                className="bg-Customl text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
    </div>

    </div>
    </div>
  )
}

export default  StockOut