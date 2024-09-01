import React, { useState, useEffect } from 'react';
import { sellProduct } from '../../../services/productService';

function SellProduct({ scannedProductId }) {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 0,
    customPriceSell: '' // Added for custom price
  });

  useEffect(() => {
    if (scannedProductId) {
      setFormData((prev) => ({ ...prev, productId: scannedProductId }));
    }
  }, [scannedProductId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sellProduct(formData);
      alert(response.data.message);
    } catch (error) {
      alert('Error selling product');
    }
  };

  return (
    <div>
      <h2>Sell Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productId" className="block text-gray-600 font-medium mb-2">Product ID</label>
          <input
            type="text"
            name="productId"
            id="productId"
            value={formData.productId}
            placeholder="Enter Product ID"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-gray-600 font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            placeholder="Enter Quantity"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="customPriceSell" className="block text-gray-600 font-medium mb-2">Custom Selling Price</label>
          <input
            type="number"
            name="customPriceSell"
            id="customPriceSell"
            value={formData.customPriceSell}
            placeholder="Enter Custom Selling Price (optional)"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sell Product
        </button>
      </form>
    </div>
  );
}

export default SellProduct;
