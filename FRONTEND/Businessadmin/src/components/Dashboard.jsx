import React, { useEffect, useState } from 'react';
import Card from '/src/constants/cards'; // Ensure this path is correct

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMjg0NDQ1LCJpYXQiOjE3MjIyODQxNDUsImp0aSI6IjMyODY2NTdjZDUyZDRmMjE4ODk0NDg1YTBjZWY4MGU1IiwidXNlcl9pZCI6MjZ9.L2rCTgWkrJmhcDrk-TqNGoVuFp_sGqXRbkVx7g2kcuA'; // Replace with your actual token

  useEffect(() => {
    console.log('Token being sent:', token);

    fetch('http://127.0.0.1:8000/categories/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Ensure this is correct
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
    <div>
      <div className='flex flex-col gap-0.5'>
        <div className='border'>
          <nav className='bg-white text-black'>
            <p>Business Admin</p>
          </nav>
        </div>
        <div className='flex flex-row'>
          <div className='bg-white text-black w-[200px] h-screen flex flex-col gap-4 px-0.5 border tracking-wide'>
            <div>
              <h6 className='text-l underline pb-3'>Management</h6>
              <p>Inventory</p>
              <p>Policies & Licences</p>
            </div>
            <div className='my-3'>
              <h6 className='underline pb-2'>Team Work</h6>
              <p>Tasks</p>
              <ul className='flex flex-col gap-2'>
                <li>Pending Tasks</li>
                <li>Assign Tasks</li>
                <li>Submitted Tasks</li>
              </ul>
            </div>
            <div>
              <h6 className='underline'>Account</h6>
              <ul>
                <li>Settings</li>
              </ul>
            </div>
          </div>
          <div className='mx-20 my-4 flex gap-4 '>
            {error ? (
              <div className='text-red-500'>{error}</div>
            ) : (
              categories.map(category => (
                <Card key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
