import React, { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner';
import SellProduct from './ProductSeller2';

function ProductSeller() {
  const [scannedProductId, setScannedProductId] = useState("");

  return (
    <div>
      <BarcodeScanner onScan={(id) => setScannedProductId(id)} />
      <SellProduct scannedProductId={scannedProductId} />
    </div>
  );
}

export default ProductSeller;
