import React from 'react'

const SignUpForm = ({isopen,closeform}) => {
    if (!isopen) return null
    const handlecloseform = (e) => {
        if (e.target.id = 'Sign') closeform()
            
    }
  return (
    <div className='fixed inset-0 bg-black z-10 bg-opacity-25 backdrop-blur-sm flex justify-center items-center'  onClick={handlecloseform} >
      <div className='w-[400px] '>
        <div className='bg-white text-black p-2 rounded flex flex-col my-0 pt-'>

        <button className='text-black text-xl   place-self-end z-50' onClick={()=>closeform()} >
          X

        </button>
        <div className='flex  flex-col justify-center items-center'>
        <h1 className='text-2xl'>Sign Up</h1>

        <div className='pt-10'>
          <form action="">
          <label htmlFor="Firstname">First Name</label> <br />
          <input type="email" className='my-2 bg-neutral-400 rounded w-[300px] h-[28px]'/> <br />
          <label htmlFor="Email">Last Name</label> <br />
             <input type="email" className='my-2 bg-neutral-400 rounded w-[300px] h-[28px]'/> <br />
             <label htmlFor="Email">Email</label> <br />
             <input type="email" className='my-2 bg-neutral-400 rounded w-[300px] h-[28px]'/> <br />
            <label htmlFor="Password">Password</label> <br />
            <input type="password" name="password" id="" className='bg-neutral-400 rounded w-[300px] h-[28px]'/> <br />
            <div className='flex justify-center items-center pb-20'>
            <button className=' bg-black text-white text-xl px-10 mt-10 rounded '>Sign Up</button>
            </div>
            
          </form>
        </div>


        </div>


          <div>
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUpForm