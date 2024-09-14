import React, { useState } from 'react';
import axios from 'axios';

function AddOilTransaction({ closePopup }) {
  const [formData, setFormData] = useState({
    productId: "vidange",  // Set your default product ID here
    profit: 0,
    quantity: 1, 
    storname: "stor1",  // Set default quantity
    priceSell: 0,  // Set default priceSell
    interest: 0  // Set default interest
  });

  const handleChange = (e) => setFormData({ ...formData, profit: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://abtech-api2.onrender.com/api/products/sellOil', formData);
      alert(response.data.message);
      closePopup();
    } catch (error) {
      alert('Error creating oil transaction');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Oil Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="number"
            name="profit"
            placeholder="Profit"
            value={formData.profit}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddOilTransaction;
