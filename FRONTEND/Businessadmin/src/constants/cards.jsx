import React from 'react';

const Card = ({ category, supplier, onViewItems }) => {
  return (
    <div className="bg-white border h-full w-[210px] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      {category && (
        <>
          <div className='flex items-center justify-center'>
            <h2 className="text-xl text-black flex items-center justify-center font-semibold">
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
        </>
      )}
      {supplier && (
        <>
          <div className="text-center mb-2 my-3">
            <h3 className="text-xl text-black font-semibold">{supplier.supplier_name}</h3>
          </div>
          <div className='text-black'>
          <p><strong>Contact Person:</strong> {supplier.contact_person}</p>
          <p><strong>Phone Number:</strong> {supplier.phone_number}</p>
          <p><strong>Email:</strong> {supplier.email}</p>
          <p><strong>Address:</strong> {supplier.address}</p>


          </div>
        </>
      )}
    </div>
  );
};

export default Card;
