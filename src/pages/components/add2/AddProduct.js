import React, { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner';
import AddProduct from './addingProduct';

function ProductManager({ closePopup }) {
  const [scannedProductId, setScannedProductId] = useState("");

  return (
    <div>
      <BarcodeScanner onScan={(id) => setScannedProductId(id)} />
      <AddProduct closePopup={closePopup} scannedProductId={scannedProductId} />
    </div>
  );
}

export default ProductManager;
