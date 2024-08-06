import React, { useEffect, useState } from 'react';
import axiosInstance from '/src/constants/axiosInstance'; // Ensure this path is correct
import Card from '/src/constants/cards'; // Ensure this path is correct
import { PlusCircleIcon, TrashIcon } from 'lucide-react';

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
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [items, setItems] = useState([]); // Add state if you need to display items related to suppliers

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get('/suppliers/');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setError(`Failed to load suppliers: ${error.message}`);
      }
    };

    fetchSuppliers();
  }, []);

  const handleAddSupplier = async () => {
    if (!newSupplier.supplier_name.trim()) {
      alert('Supplier name cannot be empty');
      return;
    }

    try {
      const response = await axiosInstance.post('/suppliers/', newSupplier);
      setSuppliers([...suppliers, response.data]);
      setNewSupplier({
        supplier_name: '',
        contact_person: '',
        phone_number: '',
        email: '',
        address: ''
      });
      setIsAdding(false);
      setError(null);
    } catch (error) {
      console.error('Error adding supplier:', error);
      setError('Failed to add supplier');
    }
  };

  const handleDeleteSupplier = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this supplier?');

    if (!isConfirmed) return;

    try {
      await axiosInstance.delete(`/suppliers/${id}/`);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setError('Failed to delete supplier');
    }
  };

  const handleViewItems = async (supplierId) => {
    setSelectedSupplierId(supplierId);

    try {
      const response = await axiosInstance.get(`/suppliers/${supplierId}/items/`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load items');
    }
  };

  return (
    <div className=''>
      <div className='flex justify-end'>
        <div className='flex items-center space-x-2'>
          <button
            className="flex items-center my-2 space-x-2 bg-CustomGold text-white px-4 py-2 rounded"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircleIcon />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>
      {isAdding && (
        <div className='flex flex-col items-center justify-center'>
          <div className='my-4 w-1/2'>
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
                className="bg-Customl text-white px-4 py-2 rounded"
                onClick={handleAddSupplier}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=''>
        <div className="ms-10 me-5 my-4 grid gap-3 grid-cols-1 sm:grid-cols-2 grid-rows-2 flex gap-5 lg:grid-cols-5">
          {error ? (
            <div className="text-red-500 mx-2 gap-20">{error}</div>
          ) : (
            suppliers.map(supplier => (
              <div key={supplier.id} className="relative">
                <Card 
                  supplier={supplier}
                  onViewItems={handleViewItems} // Pass the handleViewItems function if needed
                />
                <button
                  onClick={() => handleDeleteSupplier(supplier.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <TrashIcon className='pb-2' />
                </button>
                {selectedSupplierId === supplier.id && items.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Items for {supplier.supplier_name}:</h3>
                    <ul className="list-disc list-inside">
                      {items.map(item => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
