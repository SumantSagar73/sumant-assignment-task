import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, [clearCart]);

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
          onClick={() => navigate('/')} 
          className="success-button"
        >
          <FaShoppingBag style={{ marginRight: '10px' }} />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
