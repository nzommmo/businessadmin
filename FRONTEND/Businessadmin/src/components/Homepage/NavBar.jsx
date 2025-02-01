import { Fragment, useState } from 'react';
import LoginForm from './LoginForm';
import logo from "../../assets/profile-pictures/logo.png";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Waitlist');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', href: '#', className: 'lg:block text-white hover:text-CustomGold' },
    { label: 'About Us', href: '#', className: 'block text-white hover:text-CustomGold' },
    { label: 'Contact Us', href: '#', className: 'block text-white hover:text-CustomGold' },
    { 
      label: 'Waitlist', 
      href: '#', 
      className: 'bg-black px-4 rounded text-white w-full text-center',
      onClick: handleLogin 
    },
    { 
      label: 'Login', 
      href: '#',
      className: 'bg-CustomGold px-4 text-black rounded w-full text-center',
      onClick: () => setShowModal(true)
    }
  ];

  return (
    <Fragment>
      <div className="h-screen">
        <div className="absolute inset-0 bg-custom-image bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 flex justify-center h-full">
          <div className="top-0 z-50 rounded-md h-10 w-full">
            <div className="container px-4 pt-2 mx-auto relative text-sm pb-3 flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-20" />
                <p className="text-2xl text-black tracking-tight ml-2">
                  Business <span className="text-CustomGold">Admin</span>
                </p>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-md"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center justify-end flex-shrink-0 rounded-md">
                <ul className="mx-10 text-white text-16 text-right items-center flex justify-end md-gap-18 space-x-5">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a 
                        href={item.href} 
                        className={item.className}
                        onClick={item.onClick}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-16 right-0 w-64 bg-white shadow-lg rounded-lg p-4 mr-4">
                <ul className="flex flex-col space-y-4">
                  {menuItems.map((item, index) => (
                    <li key={index} className="text-center">
                      <a 
                        href={item.href}
                        className={`block py-2 ${item.className}`}
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hero Section */}
            <div className="md:flex justify-center w-full">
              <div className="md:w-1/2 my-20">
                <div className="flex justify-start">
                  <p className="text-2xl pl-2">YOUR</p>
                </div>
                <div className="flex justify-center">
                  <p className="lg:text-9xl text-7xl font-light text-slate-400">ULTIMATE</p>
                </div>
                <div className="flex justify-end">
                  <p className="text-2xl pr-2">BUSINESS SOLUTION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoginForm isvisible={showModal} onClose={() => setShowModal(false)} />
      </div>
    </Fragment>
  );
};

export default NavBar;