import { Fragment, useState } from 'react';
import LoginForm from './LoginForm';
import logo from "../../assets/profile-pictures/logo.png";
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const [showmodal, setshowmodal] = useState(false)
  const navigate = useNavigate();
  const handleLogin =()=>{
    navigate('/Waitlist')

  }
  return (
    <Fragment>
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-custom-image bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 flex justify-center h-full">
          <div className="top-0 z-50 rounded-md h-10 w-full">
            <div className="container px-4 pt-2 mx-auto relative text-sm pb-3 flex items-center justify-between">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-20" />
                <p className="text-2xl text-black tracking-tight ml-2">
                  Business <span className="text-CustomGold">Admin</span>
                </p>
              </div>
              <div className="md:flex items-center justify-end flex-shrink-0 rounded-md">
                <ul className="mx-10 text-white text-16 text-right items-center flex justify-end md-gap-18 space-x-5">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="">Contact Us</a></li>
                  <li className='bg-black px-4  rounded'><a href="#" onClick={handleLogin}>Waitlist</a></li>
                  <li>
                  <button className='bg-CustomGold px-4 text-black rounded'  href="LoginForm.jsx" onClick={()=>
              setshowmodal(true)
            }>Login</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:flex justify-center w-full">
              <div className="md:w-1/2 my-20">
                <div className="flex justify-start">
                  <p className="text-3xl">YOUR</p>
                </div>
                <div className="flex justify-center">
                  <p className="text-9xl font-light text-slate-400">ULTIMATE</p>
                </div>
                <div className="flex justify-end">
                  <p className="text-2xl">BUSINESS SOLUTION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoginForm isvisible={showmodal} onClose={()=>
  setshowmodal(false)
}/>      </div>
    </Fragment>
  );
}

export default NavBar;
