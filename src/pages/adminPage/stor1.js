import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineStock,
  AiOutlineBarcode,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import AddProduct from "../components/add1/AddProduct";
import BuyProduct from "../components/buy/BuyProduct";
import SellProduct from "../components/sell/SellProduct";
import ScanBarcode from "../components/scan/ScanBarcode";
import ManageUsers from "../components/ManageUsers";
import OilChangeModal from "../components/OilChangeModal";
import Statistics from "../components/Statistics";
import {Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Dashboard = ({ storeName = "Store 1", username = "Admin" }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [popupTitle, setPopupTitle] = useState("");
  const [isOilChangeModalOpen, setIsOilChangeModalOpen] = useState(false);
  const navigate = useNavigate();

  const openOilChangeModal = () => {
    setIsOilChangeModalOpen(true);
  };

  const closeOilChangeModal = () => {
    setIsOilChangeModalOpen(false);
  };

  const handleButtonClick = (path) => {
    let title = "";
    let content = null;

    switch (path) {
      case "/add-product":
        title = "Add New Product";
        content = <AddProduct closePopup={closePopup} />;
        break;
      case "/buy-product":
        title = "Buy Products";
        content = <BuyProduct closePopup={closePopup} />;
        break;
      case "/sell-product":
        title = "Sell Products";
        content = <SellProduct closePopup={closePopup} />;
        break;
      case "/scan-barcode":
        title = "Scan Barcode";
        content = <ScanBarcode closePopup={closePopup} />;
        break;
      case "/view-statistics":
        title = "View Statistics";
        content = <Statistics closePopup={closePopup} />;
        break;
      case "/manage-users":
        title = "Manage Users";
        content = <ManageUsers closePopup={closePopup} />;
        break;
      case "/view-stock":
        navigate("/view-stock");
        return;
      case "/sells-stock":
        navigate("/sells-stock");
        return; // Don't open popup, show modal instead
      default:
        title = `Manage ${path}`;
        content = `Here you can manage ${path}.`;
    }

    setPopupTitle(title);
    setPopupContent(content);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  const buttons = [
    {
      label: "Add Product",
      icon: AiOutlinePlus,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      path: "/add-product",
    },
    {
      label: "Buy Product",
      icon: AiOutlineShoppingCart,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      path: "/buy-product",
    },
    {
      label: "Sell Product",
      icon: AiOutlineDollar,
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      path: "/sell-product",
    },
    {
      label: "View Stock",
      icon: AiOutlineStock,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      path: "/view-stock",
    }, {
      label: "sells Stock",
      icon: AiOutlineStock,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      path: "/sells-stock",
    },
    {
      label: "Scan Barcode",
      icon: AiOutlineBarcode,
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      path: "/scan-barcode",
    },
    {
      label: "Manage Users",
      icon: AiOutlineUser,
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      path: "/manage-users",
    },
   
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header Section */}
      <div className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">{storeName}</h1>
        <p className="text-xl text-gray-500 mt-2">Welcome, {username}!</p>
        <Link to="/admin"> <div className="text-5xl  text-gray-800"><IoMdArrowRoundBack /></div></Link>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button.path)}
            className={`flex flex-col items-center px-6 py-8 ${button.color} text-white rounded-xl ${button.hoverColor} transition-all transform hover:scale-105 shadow-lg`}
            title={button.label}
          >
            {button.icon && <button.icon className="text-5xl mb-4" />}
            <span className="text-lg font-semibold">{button.label}</span>
          </button>
        ))}
      </div>

      {/* Popup Section */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg transform transition-transform">
            <div className="mb-6 border-b pb-3">
              <h2 className="text-2xl font-semibold text-gray-700">
                {popupTitle}
              </h2>
            </div>
            {popupContent}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Dashboard;
