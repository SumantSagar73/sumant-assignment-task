import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
