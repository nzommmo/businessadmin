import React, { useEffect, useState } from 'react';
import axiosInstance from '/src/constants/axiosInstance';
import Card from '/src/constants/cards';
import { PlusCircleIcon, TrashIcon, InfoIcon } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddItemForm from './AddItemForm';


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(`Failed to load categories: ${error.message}`);
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') {
      alert('Category name cannot be empty');
      return;
    }

    try {
      const response = await axiosInstance.post('/categories/', {
        name: newCategoryName
      });

      setCategories([...categories, response.data]);
      setNewCategoryName('');
      setError(null);
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    }
  };

  const handleViewSupplier = async (itemId) => {
    try {
      const response = await axiosInstance.get(`/item/${itemId}/supplier/`);
      setSupplierInfo(response.data); // Set the supplier info in state
      setIsSupplierModalOpen(true);
    } catch (error) {
      console.error('Error fetching supplier info:', error);
      setError('Failed to load supplier information');
      setSupplierInfo(null); // Reset supplier info on error
    }
  };
  const handleSupplierModalClose = () => {
    setIsSupplierModalOpen(false);
    setSupplierInfo(null);
  };
  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');

    if (!isConfirmed) return;

    try {
      await axiosInstance.delete(`/categories/${id}/`);
      setCategories(categories.filter(category => category.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
    }
  };

  const handleViewItems = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axiosInstance.get(`/categories/${category.id}/items/`);
      setItems(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load items');
    }
  };

  const handleAddItem = async (category) => {
    setSelectedCategory(category);
    setIsAddItemModalOpen(true);
  };

  const handleSubmitItem = async (itemData) => {
    try {
      console.log('Sending request to add item:', itemData);
      
      const response = await axiosInstance.post('/items/', itemData);
      console.log('Server response:', response.data);      
      
      if (isModalOpen) {
        const response = await axiosInstance.get(`/categories/${selectedCategory.id}/items/`);
        setItems(response.data);
      }
      setIsAddItemModalOpen(false);
      setError(null);
    } catch (error) {
      console.error('Error adding item:', error.response || error);
      const errorMessage = error.response?.data?.detail || error.response?.data || error.message;
      setError(`Failed to add item: ${errorMessage}`);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    
    if (!isConfirmed) return;

    try {
      await axiosInstance.delete(`/items/${itemId}/`);
      // Update the items list after successful deletion
      setItems(items.filter(item => item.id !== itemId));
      setError(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-end">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border px-4 py-2 rounded"
            placeholder="Category name"
          />
          <button 
            className="flex items-center my-2 space-x-2 bg-CustomGold text-white px-4 py-2 rounded"
            onClick={handleAddCategory}
          >
            <PlusCircleIcon />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="ms-10 me-5 my-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {error ? (
          <div className="text-red-500 mx-2">{error}</div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="relative">
              <Card 
                category={category} 
                onViewItems={() => handleViewItems(category)}
              />
              <div className="absolute top-2 right-2 flex space-x-2 ">
                <button 
                  onClick={() => handleAddItem(category)}
                  className="text-green-500 hover:text-green-700"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Items Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? `Items in ${selectedCategory.name}` : 'Items'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md p-4">
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors relative group"
                  >
                     
                    <div className="flex justify-between items-start">
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <p className="text-gray-300 mt-1">{item.description}</p>
                      </div>
                      
                      <div className="text-right flex flex-col">
                      <div className='flex items-end justify-end gap-5'>
                    <button 
                      onClick={() => handleViewSupplier(item.id)}
                      className=" top-2 right-2 text-gray-200 hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <InfoIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className=" top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrashIcon className="h-5 w-5" />
                    </button>

                    </div>
                        
                        <p className="text-green-400 font-semibold">
                          Kshs {parseFloat(item.price).toFixed(2)}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      <p>Added: {formatDate(item.created_at)}</p>
                      <p>Last Updated: {formatDate(item.updated_at)}</p>
                    </div>
                   
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items found in this category.</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Add Item Modal */}
      {selectedCategory && (
        <AddItemForm
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
          isOpen={isAddItemModalOpen}
          onClose={() => setIsAddItemModalOpen(false)}
          onSubmit={handleSubmitItem}
        />
      )}

<Dialog open={isSupplierModalOpen} onOpenChange={handleSupplierModalClose}>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Supplier Information</DialogTitle>
      </DialogHeader>
      {supplierInfo ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {supplierInfo.supplier_name}</p>
          <p><strong>Contact:</strong> {supplierInfo.contact_person}</p>
          <p><strong>Email:</strong> {supplierInfo.email}</p>
          <p><strong>Address:</strong> {supplierInfo.address}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading supplier information...</p>
      )}
    </DialogContent>
  </Dialog>
      </div>
  );
};

export default Categories;