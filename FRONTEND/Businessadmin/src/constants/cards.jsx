
import React from 'react';

const Card = ({ category }) => {
  return (
    <div className="bg-white  border h-full w-[200px] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl text-black flex items-center justify-center font-semibold">{category.name}</h2>
      <p className="text-gray-600">{category.description}</p>
    </div>
  );
};

export default Card;
