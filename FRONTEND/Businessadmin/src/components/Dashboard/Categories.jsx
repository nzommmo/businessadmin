import React, { useEffect, useState } from 'react';
import axiosInstance from '/src/constants/axiosInstance'; // Ensure this path is correct
import Card from '/src/constants/cards';
import { PlusCircleIcon, TrashIcon } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/categories/')
      .then(response => setCategories(response.data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError(`Failed to load categories: ${error.message}`);
      });
  }, []);

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

  const handleViewItems = async (categoryId) => {
    setSelectedCategoryId(categoryId);

    try {
      const response = await axiosInstance.get(`/categories/${categoryId}/items/`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load items');
    }
  };

  return (
    <div className=''>
      <div className='flex justify-end'>
        <div className='flex items-center space-x-2'>
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
      <div className="ms-10 me-5 my-4 grid gap-3 grid-cols-1 sm:grid-cols-2 grid-rows-5 flex gap-5 lg:grid-cols-5">
        {error ? (
          <div className="text-red-500 mx-2 gap-20">{error}</div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="relative">
              <Card 
                category={category} 
                onViewItems={handleViewItems} // Pass the handleViewItems function
              />
              <button 
                onClick={() => handleDeleteCategory(category.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <TrashIcon className='pb-2' />
              </button>
              {selectedCategoryId === category.id && items.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Items in {category.name}:</h3>
                  <ul className="list-disc list-inside">
                    {items.map(item => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
