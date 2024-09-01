import React, { useState } from "react";
import { useZxing } from "react-zxing";

function BarcodeScanner({ onScan }) {
  const [showVideoFeed, setShowVideoFeed] = useState(true);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const scannedText = result.getText();
      onScan(scannedText);
      setShowVideoFeed(false);
    },
  });

  return (
    <>
      {showVideoFeed && (
        <video
          ref={ref}
          style={{ width: "100%", maxWidth: "380px", height: "100%", maxHeight: "250px" }}
        />
      )}
    </>
  );
}

export default BarcodeScanner;
