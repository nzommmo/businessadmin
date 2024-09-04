import React from 'react'
import logo from "../../assets/profile-pictures/logo.png";

const Page = () => {
  return (
    <div className='relative'>
      <div className='flex items-center justify-center mt-20 '>
        <div className='md:w-1/2'>
        <h1 class="text-3xl font-bold text-center">Join Our Waiting List</h1>
        <p class="text-center text-gray-400 mt-4">
        Be the First to Experience Effortless Office Management: Join Our Waitlist for a Comprehensive Inventory System That Tracks Office Content, Manages Licenses, and Keeps Policies Up-to-Date!        </p>
        </div>

      </div>
      <div className='flex items-center justify-center mt-10 gap-6'>
        <input type="email" placeholder='email' className='bg-white py-1 rounded text-black  pl-3' />
        <div>
        <button className='bg-CustomGold px-12 py-1 rounded '>Send</button>
        </div>
      </div>

    </div>
  )
}

export default Page