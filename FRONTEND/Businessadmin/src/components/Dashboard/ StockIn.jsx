import React from 'react'

const  StockIn = () => {
  return (
    <div className='relative'> 
    <div className='flex items-center justify-center mt-20'> 
    <div className='my-4 w-1/2'>
    <div className='space-y-2'>
        <h1>Stock In Card</h1>
              <input
                type="text"
                className="border px-4 py-2 rounded w-full"
                placeholder="Category"
              />
              <input
                type="text"
                className="border px-4 py-2 rounded w-full"
                placeholder="Item"
              />
              <input
                type="number"
                className="border px-4 py-2 rounded w-full"
                placeholder="Quantity"
              />
              <input
                type="text"
                className="border px-4 py-2 rounded w-full"
                placeholder="Confirmed By"
              />
             
            
              <button
                className="bg-Customl text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
    </div>

    </div>
    </div>
  )
}

export default  StockIn