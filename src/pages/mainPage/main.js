import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../themeContext';

function MainPage() {
  const { theme, toggleTheme } = useTheme();
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const handleSellProductClick = () => {
    setShowBarcodeScanner(!showBarcodeScanner);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <header className={`w-full p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} mt-3 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>Dashboard</h1>
          <button
            onClick={toggleTheme}
            className={`transition duration-300 ${theme === 'light' ? 'text-blue-500 hover:text-blue-600' : 'text-gray-300 hover:text-gray-400'}`}
          >
            Toggle Theme
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-10 text-center flex-grow">
        <h2 className={`text-3xl mb-10 font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Welcome to the Main Page</h2>
        <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          Explore the stores below:
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Store 1 */}
          <Link to="/stor1" className="block">
            <div className={`p-4 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} hover:shadow-xl transition-shadow duration-300`}>
              <img
                src="/2.jpg"
                alt="Store 1"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>Store 1</h3>
              <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                This is Store 1. You can add items, manage inventory, and track sales here.
              </p>
              <button
                onClick={handleSellProductClick}
                className={`mt-4 px-4 py-2 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-600 transition duration-300`}
              >
                Sell Product
              </button>
              {showBarcodeScanner && (
                <div className={`mt-4 p-4 rounded ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
                  <p className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>Scan Barcode:</p>
                  {/* You can add your barcode scanner component here */}
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>[Barcode Scanner Component]</p>
                </div>
              )}
            </div>
          </Link>

          {/* Store 2 */}
          <Link to="/stor2" className="block">
            <div className={`p-4 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} hover:shadow-xl transition-shadow duration-300`}>
              <img
                src="/1.jpg"
                alt="Store 2"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>Store 2</h3>
              <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                This is Store 2. It offers a variety of products and services for customers.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
