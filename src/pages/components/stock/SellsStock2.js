// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { listAllSells, deleteTransaction, deleteAllTransactions } from '../../../services/productService';
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import * as XLSX from 'xlsx'; // Import xlsx for Excel export
import { SiMicrosoftexcel } from "react-icons/si";
import { MdDeleteSweep } from "react-icons/md";

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

  const handleDeleteAllTransactions = async () => {
    try {
      await deleteAllTransactions();
      setTransactions([]);
      alert('All transactions deleted successfully');
    } catch (error) {
      alert('Error deleting all transactions');
    }
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
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

  // Export to Excel function
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      sortedTransactions.map(transaction => ({
        Date: new Date(transaction.date).toLocaleDateString(),
        'Product Name': transaction.productId.name,
        Quantity: transaction.quantity,
        'Price Sell': transaction.priceSell.toFixed(2),
        Profit: transaction.profit.toFixed(2),
        Interest: transaction.interest.toFixed(2)
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-5xl font-extrabold text-center text-indigo-600 mb-12">Transaction Management</h2>
      <Link to="/stor11"> <div className="text-5xl mb-6 text-gray-800"><IoMdArrowRoundBack /></div></Link>

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
        <div className='flex justify-between row-6'>
        <div
          onClick={exportToExcel}
          className=" text-green-500 text-5xl mr-6"
        >
          <SiMicrosoftexcel />
        </div>
        <div
          onClick={handleDeleteAllTransactions}
          className="text-red-500 text-5xl"
        >
         <MdDeleteSweep />
        </div></div>
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Monthly Profits"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Monthly Profits</h2>
        <Doughnut data={doughnutData} />
        <Bar data={monthlyProfitData} />
        <button
          onClick={handleCloseModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full mt-4"
        >
          Close
        </button>
      </Modal>

      {/* Transactions Table */}
      <table className="table-auto w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-indigo-500 text-white">
            <th className="py-3 px-6" onClick={() => requestSort('date')}>Date {getSortIcon('date')}</th>
            <th className="py-3 px-6" onClick={() => requestSort('productId.name')}>Product Name {getSortIcon('productId.name')}</th>
            <th className="py-3 px-6" onClick={() => requestSort('quantity')}>Quantity {getSortIcon('quantity')}</th>
            <th className="py-3 px-6" onClick={() => requestSort('priceSell')}>Price Sell {getSortIcon('priceSell')}</th>
            <th className="py-3 px-6" onClick={() => requestSort('profit')}>Profit {getSortIcon('profit')}</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction._id} className="border-b border-indigo-100">
              <td className="py-4 px-6">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="py-4 px-6">{transaction.productId.name}</td>
              <td className="py-4 px-6">{transaction.quantity}</td>
              <td className="py-4 px-6">${transaction.priceSell.toFixed(2)}</td>
              <td className="py-4 px-6">${transaction.profit.toFixed(2)}</td>
              <td className="py-4 px-6 flex space-x-4">
                <button
                  onClick={() => handleEditTransaction(transaction)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTransaction(transaction._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTransactions;
