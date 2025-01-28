import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from '/src/constants/axiosInstance';

const AddItemForm = ({ categoryId, categoryName, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: '',
    supplier: ''
  });

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get('/suppliers/');
        setSuppliers(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, supplier: response.data[0].id.toString() }));
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        setError('Failed to load suppliers');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupplierChange = (value) => {
    setFormData(prev => ({
      ...prev,
      supplier: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      category: categoryId,
      price: parseFloat(formData.price).toFixed(2),
      quantity: parseInt(formData.quantity),
      supplier: parseInt(formData.supplier)
    });
    setFormData({
      name: '',
      description: '',
      quantity: 0,
      price: '',
      supplier: suppliers.length > 0 ? suppliers[0].id.toString() : ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Item to {categoryName}</DialogTitle>
        </DialogHeader>
        {error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Item Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 h-24"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Supplier
              </label>
              <Select
                onValueChange={handleSupplierChange}
                value={formData.supplier}
                disabled={loading || suppliers.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.length > 0 ? (
                    suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-gray-500 px-4 py-2">
                      {loading ? "Loading suppliers..." : "No suppliers available"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-CustomGold text-white rounded hover:bg-opacity-90"
                disabled={loading || suppliers.length === 0}
              >
                Add Item
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddItemForm;