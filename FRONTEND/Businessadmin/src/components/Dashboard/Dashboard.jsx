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

import { 
  UserCircle2Icon,
  ListChecks,
  BoxIcon, 
  FileTextIcon, 
  UsersIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  SettingsIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';

const Dashboard = () => {
  const [showComponent, setShowComponent] = useState('');
  const [username, setUsername] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest');
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleInventoryClick = (event) => {
    event.preventDefault();
    setShowComponent('categories');
    closeDrawer();
  };

  const handleStockInClick = (event) => {
    event.preventDefault();
    setShowComponent('StockIn');
    closeDrawer();
  };

  const handleStockOutClick = (event) => {
    event.preventDefault();
    setShowComponent('StockOut');
    closeDrawer();
  };

  const handleLicencesClick = (event) => {
    event.preventDefault();
    setShowComponent('licences');
    closeDrawer();
  };

  const handleTasksClick = (event) => {
    event.preventDefault();
    setShowComponent('Tasks');
    closeDrawer();
  };

  const handleSuppliersClick = (event) => {
    event.preventDefault();
    setShowComponent('suppliers');
    closeDrawer();
  };

  const handleAnalyticsClick = (event) => {
    event.preventDefault();
    setShowComponent('Analytics');
    closeDrawer();
  };

  const handlePendingClick = (event) => {
    event.preventDefault();
    setShowComponent('Pending');
    closeDrawer();
  };

  const handleSubmittedClick = (event) => {
    event.preventDefault();
    setShowComponent('Completed');
    closeDrawer();
  };

  const handleSupperUserClick = (event) => {
    event.preventDefault();
    window.location.href = "/admin";
    closeDrawer();
  };

  const handleViewItems = (event) => {
    event.preventDefault();
    setShowComponent('Items');
    closeDrawer();
  };

  const handleViewSettings = (event) => {
    event.preventDefault();
    setShowComponent('Settings');
    closeDrawer();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex relative">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleDrawer}
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white text-black shadow-lg"
      >
        {isDrawerOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeDrawer}
        />
      )}

      {/* Sidebar/Drawer */}
      <div className={`
        fixed top-0 left-0 h-full bg-white text-black px-3 z-40
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-[200px]
        ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[250px]
      `}>
        <div className="flex flex-col gap-4 h-full">
          <div className="flex justify-end p-2 md:hidden">
            <button onClick={closeDrawer}>
              <XIcon size={24} className='text-black' />
            </button>
          </div>

          <div>
            <h6 className="text-l underline pb-3">Management</h6>
            <ul className='flex flex-col gap-6'>
              <li className="relative group">
                <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleInventoryClick}>
                  <BoxIcon size={16} />
                  Inventory
                </a>
                <ul className="absolute left-full top-0 hidden group-hover:block mt-0 ml-2 bg-white shadow-lg rounded-md overflow-hidden">
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
                <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleTasksClick}>
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
      </div>
      
      {/* Main Content Area */}
      <div className={`
        flex-1 overflow-y-auto
        md:ml-[200px]
        ${isDrawerOpen ? 'ml-[250px]' : 'ml-0'}
        transition-margin duration-300
        ${showComponent === '' ? 'flex justify-center items-center' : ''}
      `}>
        <div className="w-full p-4">
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