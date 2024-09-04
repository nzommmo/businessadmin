import React from 'react'
import logo from "../../assets/profile-pictures/logo.png";

const Header = () => {
  return (
    <div className="container px-4 pt-2 mx-auto relative text-sm pb-3 flex items-center justify-between">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="w-20" />
      <p className="text-2xl text-gray-300 tracking-tight ml-2">
        Business <span className="text-CustomGold">Admin</span>
      </p>
      </div>
      </div>
      

)
}

export default Header