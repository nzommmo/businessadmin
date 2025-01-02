import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '../ui/card';
import { MoreHorizontal } from "lucide-react";
import axiosInstance from "/src/constants/axiosInstance"; // Ensure this path is correct

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch categories
    axiosInstance
      .get("/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch items
    axiosInstance
      .get("/items/")
      .then((response) => {
        // Map category ID to category name after categories are fetched
        const itemsWithCategories = response.data.map((item) => {
          const category = categories.find(
            (cat) => cat.id === item.category
          );
          return {
            ...item,
            categoryName: category ? category.name : "Unknown",
          };
        });
        setItems(itemsWithCategories);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, [categories]); // Fetch items only after categories are fetched

  // Filtered items based on the selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) =>
          item.categoryName.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="bg-white"> {/* Removed any background class here */}
        {/* Category Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="categoryFilter" className="block text-sm font-medium">
            Filter by Category
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 p-2 border bg-white rounded-md"
          >
            <option className='bg-white rounded' value="All">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <Table className="lg:w-[800px] bg-white"> {/* Removed background color here */}
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Assigned By</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">{item.supplier}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-500">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Details</DropdownMenuItem>
                        <DropdownMenuItem>Submit</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Items;
