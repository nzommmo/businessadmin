import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import Licences from './Licences';
import Suppliers from './Suppliers';
import { UserCircle2Icon, BoxIcon, FileTextIcon, UsersIcon, ClockIcon, CheckCircleIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

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

  const handleLicencesClick = (event) => {
    event.preventDefault();
    setShowComponent('licences');
  };

  const handleSuppliersClick = (event) => {
    event.preventDefault();
    setShowComponent('suppliers');
  };
  const handleSupperUserClick = (event) => {
    event.preventDefault();
    window.location.href = "/admin";
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
      <div className="bg-white text-black px-3 md:w-[200px] sm:w-[200px] h-full fixed flex flex-col gap-4 border tracking-wide z-10 overflow-y-auto">
        <div className="flex justify-end p-2">
          {/* Optional close button for the sidebar */}
        </div>
        <div>
          <h6 className="text-l underline pb-3">Management</h6>
          <ul className='flex flex-col gap-6'>
            <li>
              <a className='hover:text-CustomGold flex items-center gap-2' href="#" onClick={handleInventoryClick}>
                <BoxIcon size={16} />
                Inventory
              </a>
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
                Suppliers
              </a>
            </li>
          </ul>
        </div>
        <div className="my-3">
          <h6 className="underline pb-2">Team Work</h6>
          <ul className="flex flex-col gap-6">
            <li>
              <a className='hover:text-red-500 flex items-center gap-2' href="#">
                <ClockIcon size={16} />
                Pending Tasks
              </a>
            </li>
            <li>
              <a className='hover:text-green-500 flex items-center gap-2' href="#">
                <CheckCircleIcon size={16} />
                Submitted Tasks
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="underline">Account</h6>
          <ul className='pt-3'>
            <li>
              <a className='flex items-center gap-2' href="#">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
