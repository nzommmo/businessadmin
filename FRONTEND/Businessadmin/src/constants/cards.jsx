import React from 'react';

const Card = ({ category, onViewItems }) => {
  return (
    <div className="bg-white border h-full w-[210px] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className='flex items-center justify-center'>
      <h2 className="text-xl text-black flex items-center justify-center font-semibold ">
        {category.name}
      </h2>

      </div>
      <div className='flex items-center justify-center'>
      <button 
        onClick={() => onViewItems(category.id)}
        className="bg-green-500 my-2 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        View Items
      </button>

      </div>
      
    </div>
  );
};

export default Card;
