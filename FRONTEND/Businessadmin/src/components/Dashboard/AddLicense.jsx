import { useState } from "react";
import axiosInstance from "/src/constants/axiosInstance"; // Ensure this path is correct
import { PlusCircle} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddLicense = ({ onAddLicense }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("draft");
  const [duration, setDuration] = useState(30);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Calculate expiry date based on duration
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(duration));

    const newLicense = {
      name,
      status,
      expiry_date: expiryDate.toISOString(),
    };

    try {
      const formData = new FormData();
      formData.append("name", newLicense.name);
      formData.append("status", newLicense.status);
      formData.append("expiry_date", newLicense.expiry_date);
      if (image) {
        formData.append("image", image);
      }

      const response = await axiosInstance.post("/licenses/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Trigger callback to instantly update licenses list
      onAddLicense(response.data);

      // Reset form after successful submission
      setName("");
      setStatus("draft");
      setDuration(30);
      setImage(null);
    } catch (error) {
      console.error("Error adding license:", error);
      setError("Failed to add license");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
        <PlusCircle className="h-3.5 w-3.5" />
          Add License
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add License</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="License Name"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Upload Image
              </label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium">
                Duration (Days)
              </label>
              <Select
                value={duration.toString()}
                onValueChange={(value) => setDuration(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLicense;
