import React, { useState, useEffect } from "react";
import AddLicense from "./AddLicense"; // Ensure this path is correct
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import axiosInstance from "../../constants/axiosInstance";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Licensestable = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

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

  const handleAddLicense = (newLicense) => {
    setLicenses((prevLicenses) => [...prevLicenses, newLicense]);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/licenses/${id}/`);
      setLicenses(licenses.filter((license) => license.id !== id));
    } catch (error) {
      console.error("Error deleting license:", error);
      alert("Failed to delete license!");
    }
  };

  const filteredLicenses = licenses.filter((license) => {
    const status = license.status?.toLowerCase();
    switch (activeTab) {
      case "active":
        return status === "active";
      case "expired":
        return status === "expired";
      case "draft":
        return status === "draft";
      default:
        return true;
    }
  });

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "expired":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "";
    }
  };

  if (loading) return <p>Loading licenses...</p>;
  if (error) return <p>Error loading licenses: {error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
      <AddLicense onAddLicense={handleAddLicense} />

      </div>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center gap-2">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
            >
              Expired
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="hidden sm:flex data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800"
            >
              Draft
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {filteredLicenses.map((license) => (
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
        <Badge
          variant="outline"
          className={getStatusStyle(license.status)}
        >
          {license.status || "Draft"}
        </Badge>
      </TableCell>
      <TableCell>
        {new Date(license.created_at).toLocaleString()}
      </TableCell>
      <TableCell>
        {license.expiry_date
          ? new Date(license.expiry_date).toLocaleString()
          : "N/A"}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Licensestable;
