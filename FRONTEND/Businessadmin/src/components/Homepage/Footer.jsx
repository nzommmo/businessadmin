import React from 'react'
import { Phone } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { Mail } from 'lucide-react'
import { CheckCircle } from 'lucide-react'


const Footer = () => {
  return (
    <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
        <div className='flex flex-row justify-between flex-wrap'>
            <div clas>
                Services
                <div className='flex flex-col gap-4 pt-2'>
                <p className='flex items-center'><span> <CheckCircle className='w-[20px] mr-2'/></span>Inventory Management</p>
                <p className='flex items-center'><span> <CheckCircle className='w-[20px] mr-2'/></span>Policy & Licences</p>
                <p className='flex items-center'><span> <CheckCircle className='w-[20px] mr-2'/></span>Task Management</p>

                    
                </div>

            </div>
            <div>
                Locate US
                <div className='flex flex-col gap-4 pt-2'>
                   <p>Business Admin Plaza</p> 
                   <p>Magadi Road, off Langata Road</p>
                   <p>Nairobi,Kenya</p>


                    
                </div>
            </div>
            <div>
                Contact us
                <div className='flex flex-col gap-4 pt-2'>
                    <p className='flex items-center'><span> <Phone className='w-[20px] mr-2'/></span>0712312345</p>
                    <p className='flex items-center'><span> <MessageCircle className='w-[20px] mr-2'/></span>0712312345</p>
                    <p className='flex items-center'><span> <Mail className='w-[20px] mr-2'/></span>businessadmin.org</p>


                </div>
                
            </div>
            <div>
                Leave Us A Review
                <div className='pt-2'>
                    <textarea name="" id="" cols="30" rows="5"className='focus:outline-none rounded ' placeholder='Type your message here...'></textarea> <br />
                    <button className='my-4 float-right bg-Customl text-white rounded px-10 py-1'>Send</button>

                </div>
            </div>
        </div>
        <div className='pt-5 flex justify-center items-center'>
    <p className='text-CustomGold'>Business Admin  <span className='text'>copyright</span>  2024</p>
</div>

    </div>
  )
}

export default Footer