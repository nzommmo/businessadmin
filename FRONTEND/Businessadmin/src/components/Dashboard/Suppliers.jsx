import React, { useEffect, useState } from 'react';
import Card from '/src/constants/cards'; // Ensure this path is correct
import { PlusCircleIcon, TrashIcon } from 'lucide-react'; // Import TrashIcon for delete action

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    supplier_name: '',
    contact_person: '',
    phone_number: '',
    email: '',
    address: ''
  });
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyODY2NDEyLCJpYXQiOjE3MjI4NjYxMTIsImp0aSI6IjI0MWI4OWMyOTdlODQ5ZGM5MWE0NWZkYTQ2NTBjZTNmIiwidXNlcl9pZCI6MjZ9.j5l1AqHZMC-WchHX8qJAFovDjjwg2is2_bBVLjSJyMk'; // Replace with your actual token

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/suppliers/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setError(`Failed to load suppliers: ${error.message}`);
      }
    };

    fetchSuppliers();
  }, [token]);

  const handleDeleteSupplier = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this supplier?');

    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/suppliers/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setError('Failed to delete supplier');
    }
  };

  const handleAddSupplier = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/suppliers/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSupplier)
      });

      if (response.ok) {
        const addedSupplier = await response.json();
        setSuppliers([...suppliers, addedSupplier]);
        setNewSupplier({
          supplier_name: '',
          contact_person: '',
          phone_number: '',
          email: '',
          address: ''
        });
        setIsAdding(false);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      setError('Failed to add supplier');
    }
  };

  return (
    <div className='dvh'>
      <div className='flex justify-end'>
        <div className='flex items-center space-x-2'>
          <button 
            className="flex items-center my-2 space-x-2 bg-CustomGold text-white px-4 py-2 rounded "
            onClick={() => setIsAdding(true)}
          >
            <PlusCircleIcon />
            <span>Add</span>
          </button>
        </div>
      </div>
      {isAdding && (
        <div className='flex flex-col  items-center justify-center'>
        <div className='my-4 w-1/2  '>
          <h2 className='text-lg font-bold mb-2'>Add New Supplier</h2>
          <div className='space-y-2'>
            <input
              type="text"
              value={newSupplier.supplier_name}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplier_name: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Supplier Name"
            />
            <input
              type="text"
              value={newSupplier.contact_person}
              onChange={(e) => setNewSupplier({ ...newSupplier, contact_person: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Contact Person"
            />
            <input
              type="text"
              value={newSupplier.phone_number}
              onChange={(e) => setNewSupplier({ ...newSupplier, phone_number: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Phone Number"
            />
            <input
              type="email"
              value={newSupplier.email}
              onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Email"
            />
            <input
              type="text"
              value={newSupplier.address}
              onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              placeholder="Address"
            />
            <button 
              className="bg-Customl text-white px-4 py-2 rounded "
              onClick={handleAddSupplier}
            >
              Submit
            </button>
          </div>
        </div>


        </div>
      )}
      <div>
        
      </div>
      <div className=''>
      <div className="ms-10 me-5 my-4 grid gap-3 grid-cols-1 sm:grid-cols-2 grid-rows-2 flex gap-5 lg:grid-cols-5">
        {error ? (
          <div className="text-red-500 mx-2 gap-20">{error}</div>
        ) : (
          suppliers.map(supplier => (
            <div key={supplier.id} className="relative">
              <Card supplier={supplier} />
              <button
                onClick={() => handleDeleteSupplier(supplier.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <TrashIcon className="pb-2"/>
              </button>
            </div>
          ))
        )}
      </div>
      </div>
    
    </div>
  );
};

export default Suppliers;
