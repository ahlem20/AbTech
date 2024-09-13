import React, { useEffect, useState } from 'react';
import { listAllProducts2 } from '../../../services/productService';
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';

import {Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
function ViewStock() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'productId', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listAllProducts2();
        setProducts(response.data);
        setSortedProducts(response.data);
      } catch (error) {
        alert('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = [...products];
    if (sortConfig) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedProducts(sorted);
  }, [products, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(value)
    );
    setSortedProducts(filteredProducts);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />;
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Stock Management</h2>
      <Link to="/stor22"> <div className="text-5xl  text-gray-800"><IoMdArrowRoundBack /></div></Link>
     
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th
                onClick={() => requestSort('productId')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Product ID {getSortIcon('productId')}
              </th>
              <th
                onClick={() => requestSort('name')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Name {getSortIcon('name')}
              </th>
              <th
                onClick={() => requestSort('quantity')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Quantity {getSortIcon('quantity')}
              </th>
              <th
                onClick={() => requestSort('priceBuy')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Price Buy {getSortIcon('priceBuy')}
              </th>
              <th
                onClick={() => requestSort('priceSell')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Price Sell {getSortIcon('priceSell')}
              </th>
                 <th
                onClick={() => requestSort('description')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                description {getSortIcon('description')}
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium">
                Interest
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-medium">
                    {product.productId}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {product.quantity}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    ${product.priceBuy.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    ${product.priceSell.toFixed(2)}
                  </td> 
                    <td className="py-4 px-6 text-sm">
                    ${product.description}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    ${product.priceSell - product.priceBuy}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStock;
