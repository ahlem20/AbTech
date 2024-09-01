import React from 'react';
import LoginPage from './pages/loginPage/LoginPage';
import Stor2 from './pages/mainPage/stor2';
import Stor22 from './pages/adminPage/stor2';
import Stor11 from './pages/adminPage/stor1';
import Stor1 from './pages/mainPage/stor1';
import MainPage from './pages/mainPage/main';
import AddProduct from './pages/components/add1/AddProduct';
import SellProduct from './pages//components/sell/SellProduct';
import BuyProduct from './pages/components/buy/BuyProduct';
import SellsStock from './pages/components/stock/SellsStock1';
import ShowStock from './pages//components/stock/ViewStock';
import SellsStock2 from './pages/components/stock/SellsStock2';
import ShowStock2 from './pages//components/stock/ViewStock2';
import ScanBarcode from './pages//components/scan/ScanBarcode';
import OilChangeModal from './pages/components/OilChangeModal';
import AdminPage from './pages/adminPage/admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure BrowserRouter is imported
import { ThemeProvider } from './themeContext'; // Correct the import for ThemeContext

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/stor11" element={<Stor11 />} />
          <Route path="/stor22" element={<Stor22 />} />
          <Route path="/stor1" element={<Stor1 />} />
          <Route path="/stor2" element={<Stor2 />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/sell-product" element={<SellProduct />} />
          <Route path="/buy-product" element={<BuyProduct />} />
          <Route path="/view-stock" element={<ShowStock />} /> {/* Define route for ViewStock */}
          <Route path="/sells-stock" element={<SellsStock />} /> {/* Define route for ViewStock */}
          <Route path="/view-stock2" element={<ShowStock2 />} /> {/* Define route for ViewStock */}
          <Route path="/sells-stock2" element={<SellsStock2 />} /> {/* Define route for ViewStock */}
          <Route path="/OilChangeModal" element={<OilChangeModal />} />
          <Route path="/scan-barcode" element={<ScanBarcode />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
