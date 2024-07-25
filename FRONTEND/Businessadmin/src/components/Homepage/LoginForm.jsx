import React, { Fragment, useState } from 'react'
import SignUpForm from './SignUpForm';

const LoginForm = ({isvisible, onClose}) => {
  if (!isvisible) return null;

  const handleclose = (e) => {
    if (e.target.id === 'wrapper') onclose();
  }
  const [showForm, SetShowform] = useState(false)

  return (
    <Fragment>   
       <div className='fixed inset-0 bg-black z-10 bg-opacity-25 backdrop-blur-sm flex justify-center items-center'    onClick={handleclose}>
      <div className='w-[400px] '>
        <div className='bg-white text-black p-2 rounded flex flex-col my-0 pt-'>

        <button className='text-black text-xl   place-self-end z-50' onClick={()=>onClose()}>
          X

        </button>
        <div className='flex  flex-col justify-center items-center'>
        <h1 className='text-2xl'>Login To Your Account</h1>

        <div className='pt-10'>
          <form action="">
             <label htmlFor="Email">Email</label> <br />
             <input type="text" className='my-2 bg-neutral-400 rounded w-[300px] h-[28px]'/> <br />
            <label htmlFor="Password">Password</label> <br />
            <input type="password" name="password" id="" className='bg-neutral-400 rounded w-[300px] h-[28px]'/> <br />
            <div className='flex justify-center items-center pb-20'>
            <button className=' bg-black text-white text-xl px-10 mt-10 rounded ' >Login</button>
            </div>
            <div className='flex justify-center items-center pb-20'>
            <button type='button'   className=' bg-black text-white text-xl px-10 mt-10 rounded ' onClick={()=>SetShowform(true)}>Sign UP</button>
            </div>
          </form>
        </div>


        </div>


          <div>
            
          </div>

        </div>

      </div>
    </div>


<SignUpForm isopen={showForm} closeform={()=> SetShowform(false)} />
</Fragment>

    
  )
}

export default LoginForm