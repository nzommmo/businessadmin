import React, { useState } from 'react';
import Categories from './Dashboard/Categories';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCategories, setShowCategories] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInventoryClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setShowCategories(true); // Show the Categories component
  };

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div className="bg-white text-black md:w-[200px] h-screen sm:w-[200px] flex flex-col gap-4 px-0.5 border tracking-wide">
          <div className="flex justify-end p-2">
            <button onClick={toggleSidebar} className="text-black text-xl">X</button>
          </div>
          <div>
            <h6 className="text-l underline pb-3">Management</h6>
            <ul>
              <li><a href="#" onClick={handleInventoryClick}>Inventory</a></li>
              <li><a href="#">Policies & Licences</a></li>
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
      )}
      <div className="flex-1">
        {!isSidebarOpen && (
          <button onClick={toggleSidebar} className="m-2 p-2 bg-gray-200 text-black">
            Open Sidebar
          </button>
        )}
        <div>
          {showCategories && <Categories />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
