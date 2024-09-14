
import React, { useState, useEffect } from 'react';
import BarcodeScanner from './scan';
import { getProduct2 } from '../../../services/productService';

function ProductScanner() {
  const [scannedProductId, setScannedProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [stockStatus, setStockStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(true); // New state to manage camera visibility

  useEffect(() => {
    if (scannedProductId && !isLoading) {
      handleScan(scannedProductId);
    }
  }, [scannedProductId]);

  const handleScan = async (productId) => {
    setIsLoading(true);
    try {
      const response = await getProduct2(productId);
      const productData = response.data;
      if (productData) {
        setProduct(productData);
        setStockStatus(productData.quantity > 0 ? "In Stock" : "Out of Stock");
        setErrorMessage("");
        setIsCameraOpen(false); // Close the camera after data is fetched
      } else {
        setProduct(null);
        setErrorMessage("Product not found");
      }
    } catch (error) {
      setProduct(null);
      setErrorMessage("Error fetching product details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReopenCamera = () => {
    setProduct(null);
    setScannedProductId("");
    setIsCameraOpen(true);
  };

  return (
    <div>
      {isCameraOpen && <BarcodeScanner onScan={(productId) => setScannedProductId(productId)} />}

      {isLoading && <p>Loading...</p>}

      {product ? (
        <div>
          <h3>Product Details</h3>
          <p>Product ID: {product.productId}</p>
          <p>Name: {product.name}</p>
          <p>Store Name: {product.storname}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price Buy: {product.priceBuy}</p>
          <p>Price Sell: {product.priceSell}</p>
          <p>Status: {stockStatus}</p>
          <button onClick={handleReopenCamera} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Scan Another Product
          </button>
        </div>
      ) : (
        errorMessage && <p>{errorMessage}</p>
      )}
    </div>
  );
}

export default ProductScanner;
