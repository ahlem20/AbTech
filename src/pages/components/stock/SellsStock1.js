// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { listAllSells, deleteTransaction } from '../../../services/productService';
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Modal from 'react-modal';

import {Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [monthlyProfits, setMonthlyProfits] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await listAllSells();
        setTransactions(response.data);
        setSortedTransactions(response.data);
        calculateTotalProfit(response.data);
        calculateMonthlyProfits(response.data);
        calculateTotalSales(response.data);
      } catch (error) {
        alert('Error fetching transactions');
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    let sorted = [...transactions];
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
    setSortedTransactions(sorted);
  }, [transactions, sortConfig]);

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
    const filteredTransactions = transactions.filter(transaction =>
      transaction.productId.name.toLowerCase().includes(value)
    );
    setSortedTransactions(filteredTransactions);
    calculateTotalProfit(filteredTransactions);
    calculateMonthlyProfits(filteredTransactions);
    calculateTotalSales(filteredTransactions);
  };

  const calculateTotalProfit = (transactions) => {
    const total = transactions.reduce((acc, transaction) => acc + transaction.profit, 0);
    setTotalProfit(total);
  };

  const calculateTotalSales = (transactions) => {
    const total = transactions.reduce((acc, transaction) => acc + (transaction.priceSell * transaction.quantity), 0);
    setTotalSales(total);
  };

  const calculateMonthlyProfits = (transactions) => {
    const monthlyProfits = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyProfits[monthKey]) {
        monthlyProfits[monthKey] = 0;
      }

      monthlyProfits[monthKey] += transaction.profit;
    });

    setMonthlyProfits(monthlyProfits);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />;
    }
    return null;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    handleOpenModal();
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
      alert('Transaction deleted successfully');
    } catch (error) {
      alert('Error deleting transaction');
    }
  };

  const handleSaveEdit = async (updatedTransaction) => {
    // Implement the API call to save the updated transaction
    try {
      // Assuming you have a function to update the transaction
      // await updateTransaction(updatedTransaction);
      setTransactions(transactions.map(transaction =>
        transaction._id === updatedTransaction._id ? updatedTransaction : transaction
      ));
      handleCloseModal();
    } catch (error) {
      alert('Error updating transaction');
    }
  };

  const monthlyProfitData = {
    labels: Object.keys(monthlyProfits),
    datasets: [
      {
        label: 'Monthly Profits',
        data: Object.values(monthlyProfits),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Profit', 'Loss'],
    datasets: [
      {
        data: [totalProfit, 100000 - totalProfit],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-5xl font-extrabold text-center text-indigo-600 mb-12">Transaction Management</h2>
      <Link to="/stor11"> <div className="text-5xl  text-gray-800"><IoMdArrowRoundBack /></div></Link>
     
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full sm:w-1/3">
          <AiOutlineSearch className="absolute left-3 top-3 text-indigo-500" />
          <input
            type="text"
            className="pl-10 pr-4 py-3 w-full border border-indigo-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className='flex justify-between'>
        <div className="mb-8 text-right">
          <h3 className="text-2xl font-bold text-gray-800">Total Sales: <span className="text-indigo-600">${totalSales.toFixed(2)}</span></h3>
        </div>
        <div className="mb-8 text-right">
          <h3 className="text-2xl font-bold text-gray-800">Total Profit: <span className="text-indigo-600">${totalProfit.toFixed(2)}</span></h3>
        </div>
      </div>

      {/* Button to open modal */}
      <div className="mb-8 text-center">
        <button
          onClick={handleOpenModal}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
        >
          View Monthly Profits & Stats
        </button>
      </div>

      {/* Modal for Monthly Profits & Statistics */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Monthly Profits & Statistics"
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">Monthly Profits</h3>
        <Bar data={monthlyProfitData} />

        <h3 className="text-2xl font-bold text-indigo-600 mt-8 mb-4">Profit vs Loss</h3>
        <Doughnut data={doughnutData} />

        <div className="text-right mt-8">
          <button
            onClick={handleCloseModal}
            className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th
                onClick={() => requestSort('date')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Date {getSortIcon('date')}
              </th>
              <th
                onClick={() => requestSort('productId.name')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Product Name {getSortIcon('productId.name')}
              </th>
              <th
                onClick={() => requestSort('quantity')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Quantity {getSortIcon('quantity')}
              </th>
              <th
                onClick={() => requestSort('priceSell')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Price Sell {getSortIcon('priceSell')}
              </th>
              <th
                onClick={() => requestSort('profit')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Profit {getSortIcon('profit')}
              </th>
              <th
                onClick={() => requestSort('interest')}
                className="py-3 px-6 text-left text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Interest {getSortIcon('interest')}
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {transaction.productId.name}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {transaction.quantity}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    ${transaction.priceSell.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    ${transaction.profit.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {transaction.interest.toFixed(2)}%
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button
                      onClick={() => handleEditTransaction(transaction)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(transaction._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-center text-gray-500">
                  No transactions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Transaction */}
      <Modal
        isOpen={!!editTransaction}
        onRequestClose={() => setEditTransaction(null)}
        contentLabel="Edit Transaction"
        className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">Edit Transaction</h3>
        {/* Render edit form with the current transaction data */}
        {editTransaction && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(editTransaction);
            }}
          >
            {/* Add form fields here */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                value={editTransaction.productId.name}
                onChange={(e) => setEditTransaction({ ...editTransaction, productId: { ...editTransaction.productId, name: e.target.value } })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            {/* Add other fields similarly */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditTransaction(null)}
                className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition-colors ml-4"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default ViewTransactions;
