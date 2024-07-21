import { Fragment, useState } from 'react';
import LoginForm from './LoginForm';

const NavBar = () => {
  const [showmodal, setshowmodal] = useState(false)
  return (

    <Fragment>
    <div class="relative h-screen">
  <div class="absolute inset-0 bg-custom-image bg-cover bg-center opacity-30"></div>
  <div class="relative z-10 flex justify-center  h-full">
  <div className='top-0 z-50 rounded-md h-10 w-full   bg-white bg-opacity-40'>
      <div className='container px-4 pt-2 mx-auto relative text-sm pb-3'> 
      <span className='text-xl float-left text-black tracking-tight'>Business Admin</span>
        <div className='md:flex items-center justify-end flex-shrink-0 rounded-md '>
        <ul className='mx-10 text-black text-16 text-right items-center flex justify-end md-gap-18 space-x-10'>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li>
            <button href="LoginForm.jsx" onClick={()=>
              setshowmodal(true)
            }>Login</button>
            </li>
           

        </ul>
        
        </div>
        
      </div>
      <div>
        
      </div>
  <div className=''> 
  <div className='md:flex justify-center w-'>
      <div className='md:w-1/2 my-20 w:1/4'>
        <div className='flex justify-start '>
          <p className='text-3xl'>YOUR</p>
        </div>
        <div className='flex justify-center px-'>
          <p className='text-9xl font-light text-slate-400'>ULTIMATE</p>
          </div>
        <div className='flex justify-end px-'>
          <p className='text-2xl'>BUSNESS SOLUTION</p>
        </div>
        
      </div>
  

      </div>

  </div>
      
</div>
     

      </div>
      
  </div>


  
<LoginForm isvisible={showmodal} onClose={()=>
  setshowmodal(false)
}/>


  </Fragment>
      
  )
}

export default NavBar