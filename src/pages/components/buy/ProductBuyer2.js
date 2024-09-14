
import React, { useState, useEffect } from 'react';
import { buyProduct2 } from '../../../services/productService';

function BuyProduct({ scannedProductId }) {
  const [formData, setFormData] = useState({ productId: '', quantity: 0 });

  useEffect(() => {
    if (scannedProductId) {
      setFormData((prev) => ({ ...prev, productId: scannedProductId }));
    }
  }, [scannedProductId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await buyProduct(formData);
      alert(response.data.message);
    } catch (error) {
      alert('Error buying product');
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Buy Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product ID
          </label>
          <input
            type="text"
            name="productId"
            id="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="Enter Product ID"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 rounded-lg shadow-md font-medium transition duration-150 ease-in-out"
        >
          Buy Product
        </button>
      </form>
    </div>
  );
}

export default BuyProduct;
