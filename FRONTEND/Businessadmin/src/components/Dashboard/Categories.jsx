import React, { useEffect, useState } from 'react';
import Card from '/src/constants/cards'; // Ensure this path is correct

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMzQzNjIwLCJpYXQiOjE3MjIzNDMzMjAsImp0aSI6ImMzMWYyYzc5ODlhNDQ2MGFiNmJmOTVmNzQ0OWVmNTc2IiwidXNlcl9pZCI6MjZ9.yTfetI-bQB7k0483-XnapzB9zoGh65D3xRnVV2j7VwE'; // Replace with your actual token

  useEffect(() => {
    // Temporary static data for testing
    const staticCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
      { id: 4, name: 'Category 4' },
      { id: 5, name: 'Category 5' },
      { id: 6, name: 'Category 6' },
      { id: 7, name: 'Category 7' },
      { id: 8, name: 'Category 8' },
      { id: 9, name: 'Category 9' },
      { id: 10, name: 'Category 10' },
    ];
    setCategories(staticCategories);
  }, []);

  return (
    <div>
      <div className='flex justify-end'>
        <div>
          <button><span>+</span> Add</button>
        </div>

      </div>
       <div className="ms-10 me-5 my-4 grid gap-3 grid-cols-1 sm:grid-cols-2 grid-rows-5 flex gap-5 lg:grid-cols-5">
      {error ? (
        <div className="text-red-500 mx-2 gap-20">{error}</div>
      ) : (
        categories.map(category => (
          <Card key={category.id} category={category} />
        ))
      )}
    </div>

    </div>
   
  );
};

export default Categories;