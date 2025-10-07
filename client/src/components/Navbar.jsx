import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>SumantCart</span>
        </Link>
        <Link to="/cart" style={styles.cartLink}>
          <FaShoppingCart style={styles.cartIcon} />
          {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#16161C',
    padding: '1rem 2rem',
    borderBottom: '1px solid #27272A',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#E5E7EB',
  },
  cartLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#E5E7EB',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    position: 'relative',
  },
  cartIcon: {
    fontSize: '1.2rem',
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#6366F1',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
  },
};

export default Navbar;
