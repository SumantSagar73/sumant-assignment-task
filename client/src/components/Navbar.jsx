import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-text">SumantCart</span>
        </Link>
        <Link to="/cart" className="navbar-cart-link">
          <FaShoppingCart className="navbar-cart-icon" />
          {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
