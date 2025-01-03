import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import Licences from './Licences';
import Suppliers from './Suppliers';
import StockIn from './ StockIn';
import StockOut from './ StockOut';
import Analytics from '../ui/Analytics';
import Tasks from './Tasks/Tasks';
import Pending from './Tasks/Pending';
import Completed from './Tasks/Completed';
import Items from './Items';
import Settings from './Settings';



import { UserCircle2Icon,ListChecks ,BoxIcon, FileTextIcon, UsersIcon, ClockIcon, CheckCircleIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

const Dashboard = () => {
  const [showComponent, setShowComponent] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest'); // Default to 'Guest' if no username found
  }, []);

  const handleInventoryClick = (event) => {
    event.preventDefault();
    setShowComponent('categories');
  };
  const handleStockInClick = (event) => {
    event.preventDefault();
    setShowComponent('StockIn');
  };
  const handleStockOutClick = (event) => {
    event.preventDefault();
    setShowComponent('StockOut');
  };
  const handleLicencesClick = (event) => {
    event.preventDefault();
    setShowComponent('licences');
  };
  const handleTasksClick = (event) => {
    event.preventDefault();
    setShowComponent('Tasks');
  };

  const handleSuppliersClick = (event) => {
    event.preventDefault();
    setShowComponent('suppliers');
  };
  const handleAnalyticsClick = (event) => {
    event.preventDefault();
    setShowComponent('Analytics');
  };
  const handlePendingClick = (event) => {
    event.preventDefault();
    setShowComponent('Pending');
  };
  const handleSubmittedClick = (event) => {
    event.preventDefault();
    setShowComponent('Completed');
  };

  const handleSupperUserClick = (event) => {
    event.preventDefault();
    window.location.href = "/admin";
  };
  const handleViewItems = (event) => {
    event.preventDefault();
    setShowComponent('Items');
  };
  const handleViewSettings = (event) => {
    event.preventDefault();
    setShowComponent('Settings');
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      // Redirect to root page
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex">
      <div className="bg-white text-black px-3 md:w-[200px] sm:w-[200px] h-full fixed flex flex-col gap-4 border tracking-wide z-10 ">
        <div className="flex justify-end p-2">
          {/* Optional close button for the sidebar */}
        </div>
        <div>
          <h6 className="text-l underline pb-3">Management</h6>
          <ul className='flex flex-col gap-6'>
            <li className="relative group">
              <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleInventoryClick}>
                <BoxIcon size={16} />
                Inventory
              </a>
             

              {/* Dropdown Menu */}
              <ul className="  top-0 hidden group-hover:block mt-2 bg-white shadow-lg rounded-md overflow-hidden">
                <li>
                  <a className="block px-4 py-2 hover:bg-gray-100" href="#" onClick={handleStockInClick}>
                    Stock In
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-gray-100" href="#" onClick={handleStockOutClick}>
                    Stock Out
                  </a>
                </li>
                <li>
                <a className='block px-4 py-2 hover:bg-gray-100' href="#" onClick={handleViewItems}>
                Items
              </a>
              </li>
              </ul>
            </li>
            <li>
              <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleLicencesClick}>
                <FileTextIcon size={16} />
                Policies & Licences
              </a>
            </li>
            <li>
              <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleSuppliersClick}>
                <UsersIcon size={16} />
                Suppliers
              </a>
            </li>
            <li>
              <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleSupperUserClick}>
                <UsersIcon size={16} />
                Admin
              </a>
            </li>
            <li>
              <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleAnalyticsClick}>
                <UsersIcon size={16} />
                Analytics
              </a>
            </li>
          </ul>
        </div>
        <div className="my-3">
          <h6 className="underline pb-2">Team Work</h6>
          <ul className="flex flex-col gap-6">
          <li>
              <a className='hover:text-CustomGold flex items-center gap-2' href="#"  onClick={handleTasksClick}>
                <ListChecks size={16} />
                 Tasks
              </a>
            </li>
            <li>
              <a className='hover:text-red-500 flex items-center gap-2' href="#" onClick={handlePendingClick}>
                <ClockIcon size={16} />
                Pending Tasks
              </a>
            </li>
            <li>
              <a className='hover:text-green-500 flex items-center gap-2' href="#" onClick={handleSubmittedClick}>
                <CheckCircleIcon size={16} />
                Completed Tasks
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="underline">Account</h6>
          <ul className='pt-3'>
            <li>
              <a className='flex items-center gap-2' href="#" onClick={handleViewSettings}>
                <SettingsIcon size={16} />
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button className='flex items-center gap-2 pt-2' onClick={handleLogout}>
            <LogOutIcon size={16} />
            Log Out
          </button>
        </div>
        <div className="mt-auto flex items-center gap-2 p-2">
          <UserCircle2Icon size={24} />
          <span>{username}</span>
        </div>
      </div>
      
      <div className={`ml-[200px] flex-1 overflow-y-auto ${showComponent === '' ? 'flex justify-center items-center' : ''}`}>
        <div className="w-full">
          {showComponent === '' && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h1>Welcome to the Dashboard</h1>
              <p>Select a category from the sidebar to view details.</p>
            </div>
          )}
          {showComponent === 'categories' && <Categories />}
          {showComponent === 'licences' && <Licences />}
          {showComponent === 'suppliers' && <Suppliers />}
          {showComponent === 'StockIn' && <StockIn />}
          {showComponent === 'StockOut' && <StockOut />}
          {showComponent === 'Analytics' && <Analytics />}
          {showComponent === 'Tasks' && <Tasks />}
          {showComponent === 'Pending' && <Pending />}
          {showComponent === 'Completed' && <Completed />}
          {showComponent === 'Items' && <Items />}
          {showComponent === 'Settings' && <Settings />}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
