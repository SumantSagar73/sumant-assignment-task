import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaShoppingCart, FaHome } from 'react-icons/fa';
import './CancelPage.css';

const CancelPage = () => {
  const navigate = useNavigate();

  const handleBackToCart = () => {
    window.scrollTo(0, 0);
    navigate('/cart', { replace: true });
  };

  const handleBrowseMore = () => {
    window.scrollTo(0, 0);
    navigate('/', { replace: true });
  };

  return (
    <div className="cancel-container">
      <div className="cancel-card">
        <div className="cancel-icon-wrapper">
          <FaTimesCircle className="cancel-icon" />
        </div>
        <h1 className="cancel-title">Payment Cancelled</h1>
        <p className="cancel-message">Your payment was not processed</p>
        <p className="cancel-submessage">No charges have been made to your account</p>
        
        <div className="cancel-button-group">
          <button 
            onClick={handleBackToCart} 
            className="cancel-primary-button"
          >
            <FaShoppingCart />
            Back to Cart
          </button>
          <button 
            onClick={handleBrowseMore} 
            className="cancel-secondary-button"
          >
            <FaHome />
            Browse More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
