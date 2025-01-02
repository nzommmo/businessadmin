import React, { useState, useEffect } from "react";
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
import { Card } from "../ui/card";
import { MoreHorizontal } from "lucide-react";
import axiosInstance from "/src/constants/axiosInstance";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [supplierDetails, setSupplierDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/categories/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axiosInstance
      .get("/items/")
      .then((response) => {
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
  }, [categories]);

  const getStatusBadge = (quantity) => {
    if (quantity >= 100) {
      return {
        text: "Enough",
        color: "bg-green-100 text-green-800",
        context: "Safe quantity",
      };
    } else if (quantity >= 50) {
      return {
        text: "Running Out",
        color: "bg-yellow-100 text-yellow-800",
        context: "Needs attention",
      };
    } else if (quantity > 0) {
      return {
        text: "Low Stock",
        color: "bg-orange-100 text-orange-800",
        context: "Critical, running low",
      };
    } else if (quantity === 0) {
      return {
        text: "Finished",
        color: "bg-red-100 text-red-800",
        context: "Critical, requires action",
      };
    }
    return null;
  };

  const fetchSupplierDetails = async (supplierId) => {
    try {
      const response = await axiosInstance.get(`/suppliers/${supplierId}/`);
      setSupplierDetails(response.data);
    } catch (error) {
      console.error("Error fetching supplier details:", error);
      setSupplierDetails(null);
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    fetchSupplierDetails(item.supplier);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSupplierDetails(null);
    setShowModal(false);
  };

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) =>
          item.categoryName.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="bg-white">
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
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Table className="lg:w-[800px] bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const status = getStatusBadge(item.quantity);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-medium">{item.quantity}</TableCell>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>
                      {status ? (
                        <div className="flex flex-col items-start">
                          <Badge variant="outline" className={status.color}>
                            {status.text}
                          </Badge>
                          <span className="text-xs text-gray-600">{status.context}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">No status available</span>
                      )}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
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

      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 text-black flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">{selectedItem.name} Details</h2>
            <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
            <p><strong>Category:</strong> {selectedItem.categoryName}</p>
            <p><strong>Price:</strong> {selectedItem.price}</p>
            <p><strong>Supplier:</strong> {supplierDetails ? supplierDetails.supplier_name : "Loading..."}</p>
            <div className="mt-4">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
