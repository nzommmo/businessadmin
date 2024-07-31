import React, { useState } from 'react';
import Categories from './Categories';
import Licences from './Licences';
import Suppliers from './Suppliers';

const Dashboard = () => {
  const [showComponent, setShowComponent] = useState('');

  const handleInventoryClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setShowComponent('categories'); // Show the Categories component
  };

  const handleLicencesClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setShowComponent('licences'); // Show the Licences component
  };

  const handleSuppliersClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setShowComponent('suppliers'); // Show the Licences component
  };

  return (
    <div className="h-screen flex">
      <div className="bg-white text-black md:w-[200px] sm:w-[200px] h-full fixed flex flex-col gap-4 px-0.5 border tracking-wide z-10 overflow-y-auto">
        <div className="flex justify-end p-2">
          {/* Optional close button for the sidebar */}
        </div>
        <div>
          <h6 className="text-l underline pb-3">Management</h6>
          <ul>
            <li><a href="#" onClick={handleInventoryClick}>Inventory</a></li>
            <li><a href="#" onClick={handleLicencesClick}>Policies & Licences</a></li>
            <li><a href="#" onClick={handleSuppliersClick}>Suppliers</a></li>
          </ul>
        </div>
        <div className="my-3">
          <h6 className="underline pb-2">Team Work</h6>
          <p>Tasks</p>
          <ul className="flex flex-col gap-2">
            <li><a href="#">Pending Tasks</a></li>
            <li><a href="#">Assign Tasks</a></li>
            <li><a href="#">Submitted Tasks</a></li>
          </ul>
        </div>
        <div>
          <h6 className="underline">Account</h6>
          <ul>
            <li><a href="#">Settings</a></li>
          </ul>
        </div>
      </div>
      
      <div className="ml-[200px] overflow-y-auto">
        <div className="w-full">
          {showComponent === '' && (
            <div className="welcome-message text-center">
              <h1>Welcome to the Dashboard</h1>
              <p>Select a category from the sidebar to view details.</p>
            </div>
          )}
          {showComponent === 'categories' && <Categories />}
          {showComponent === 'licences' && <Licences />}
          {showComponent === 'suppliers' && <Suppliers />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
