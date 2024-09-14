import React, { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner';
import BuyProduct from './ProductBuyer2';

function ProductBuyer() {
  const [scannedProductId, setScannedProductId] = useState("");

  return (
    <div>
      <BarcodeScanner onScan={(id) => setScannedProductId(id)} />
      <BuyProduct scannedProductId={scannedProductId} />
    </div>
  );
}

export default ProductBuyer;
