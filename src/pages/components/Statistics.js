import React from 'react';

const StatisticsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Statistics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* All Users */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <p className="text-2xl font-bold">Number of Users: 100</p>
        </div>
        
        {/* Sells for the Day */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Today's Sales</h2>
          <p className="text-2xl font-bold">$5,000</p>
        </div>
        
        {/* Sells for the Month */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">This Month's Sales</h2>
          <p className="text-2xl font-bold">$50,000</p>
        </div>
        
        {/* Products to Rebuy */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Products to Rebuy</h2>
          <ul className="list-disc pl-4">
            <li>Product A</li>
            <li>Product B</li>
            <li>Product C</li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Sales for Each User</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul className="list-disc pl-4">
            <li>User 1: $1,000</li>
            <li>User 2: $1,500</li>
            <li>User 3: $2,000</li>
            {/* Add more users here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
