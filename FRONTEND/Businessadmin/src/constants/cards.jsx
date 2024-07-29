
import React from 'react';

const Card = ({ category }) => {
  return (
    <div className="border h-1/4 w-[200px] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl flex items-center justify-center font-semibold">{category.name}</h2>
      <p className="text-gray-600">{category.description}</p>
    </div>
  );
};

export default Card;
