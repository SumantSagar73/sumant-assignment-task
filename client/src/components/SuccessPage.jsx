import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    // Clear cart only once on mount
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, []);

  const handleContinueShopping = () => {
    navigate('/', { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon-wrapper">
          <FaCheckCircle className="success-checkmark" />
        </div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">Your order has been confirmed</p>
        <p className="success-submessage">You will receive a confirmation email shortly</p>
        
        <button 
          onClick={handleContinueShopping} 
          className="success-button"
        >
          <FaShoppingBag />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
