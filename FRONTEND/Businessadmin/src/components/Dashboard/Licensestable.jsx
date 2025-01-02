import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "../../constants/axiosInstance"; // Import Axios instance
import { MoreHorizontal } from "lucide-react"; // Import missing icon

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Licensestable = () => {
  const [licenses, setLicenses] = useState([]); // State for licenses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await axiosInstance.get("/licenses/");
        setLicenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching licenses:", error);
        setError(`Failed to load licenses: ${error.message}`);
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/licenses/${id}/`);
      setLicenses(licenses.filter((license) => license.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting license:", error);
      alert("Failed to delete license!");
    }
  };

  if (loading) return <p>Loading licenses...</p>;
  if (error) return <p>Error loading licenses: {error}</p>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {licenses.map((license) => (
            <TableRow key={license.id}>
              <TableCell>
                <img
                  alt={license.name}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={license.image || "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell>{license.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{license.status || "Draft"}</Badge>
              </TableCell>
              <TableCell>
                {new Date(license.created_at).toLocaleString()}
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(license.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Licensestable;
