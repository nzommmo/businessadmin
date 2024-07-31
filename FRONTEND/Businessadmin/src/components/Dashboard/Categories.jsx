import React, { useEffect, useState } from 'react';
import Card from '/src/constants/cards'; // Ensure this path is correct
import { PlusCircleIcon, TrashIcon } from 'lucide-react'; // Import TrashIcon for delete action

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNDM2OTk1LCJpYXQiOjE3MjI0MzY2OTUsImp0aSI6ImQ1MWVhMWNmNjIxYTRhNmE5NDk1YjkyYjdhZmViZjg5IiwidXNlcl9pZCI6MjZ9.-xPOk0-IxWhpgsOFCQJLUEQZbW8CktPEBzzfy8L6wko'; // Replace with your actual token

  useEffect(() => {
    console.log('Token being sent:', token);

    fetch('http://127.0.0.1:8000/categories/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError(`Failed to load categories: ${error.message}`);
      });
  }, [token]);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') {
      alert('Category name cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategoryName })
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    }
  };

  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');

    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/categories/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setCategories(categories.filter(category => category.id !== id));
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
    }
  };

  const handleViewItems = async (categoryId) => {
    setSelectedCategoryId(categoryId);

    try {
      const response = await fetch(`http://127.0.0.1:8000/categories/${categoryId}/items/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const itemsData = await response.json();
        setItems(itemsData);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
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
            className="flex items-center my-2 space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
