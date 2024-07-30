import React, { useEffect, useState } from 'react';
import Card from '/src/constants/cards'; 

const Categories= () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMzQ4NTY0LCJpYXQiOjE3MjIzNDgyNjQsImp0aSI6IjJiMzlkOTJlZTA4YzQ1YmRiMzIwMzlkNzYwYWRkYmViIiwidXNlcl9pZCI6MjZ9.1F-mnjNwaID3-g2AeUVOKX-dP0HudfFZ7xjLfxayWps'; // Replace with your actual token

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
  return (
    <div className="ms-10 me-5 my-4 grid gap-3 grid-cols-1 sm:grid-cols-2 grid-rows-5 flex gap-5 lg:grid-cols-5">
      {error ? (
        <div className="text-red-500 mx-2 gap-20">{error}</div>
      ) : (
        categories.map(category => (
          <Card key={category.id} category={category} />
        ))
      )}
    </div>
  );
};

export default Categories;
