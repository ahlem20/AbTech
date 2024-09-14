import React, { useState, useEffect, useRef } from 'react';
import { addProduct2 } from '../../../services/productService';

function AddProduct({ closePopup, scannedProductId }) {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    quantity: 0,
    storname: 'stor2', // Default value
    priceBuy: 0,
    priceSell: 0,
  });
   const barcodeInputRef = useRef(null);

  useEffect(() => {
    if (scannedProductId) {
      setFormData((prev) => ({ ...prev, productId: scannedProductId }));
    }
  }, [scannedProductId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct2(formData);
      alert(response.data.message);
      closePopup();
    } catch (error) {
      alert('Error adding product');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="productId"
            ref={barcodeInputRef}
            placeholder="Scan or Enter Product ID"
            value={formData.productId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
         <div>
          <input
            type="text"
            name="storname"
            placeholder="storname"
            onChange={handleChange}
            value="stor2"
            required
            readonly
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            name="priceBuy"
            placeholder="Price Buy"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            name="priceSell"
            placeholder="Price Sell"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
