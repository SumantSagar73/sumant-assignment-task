import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaShoppingCart, FaHome } from 'react-icons/fa';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <FaTimesCircle style={styles.icon} />
        </div>
        <h1 style={styles.title}>Payment Cancelled</h1>
        <p style={styles.message}>Your payment was not processed</p>
        <p style={styles.submessage}>No charges have been made to your account</p>
        
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => navigate('/cart')} 
            style={styles.primaryButton}
          >
            <FaShoppingCart style={{ marginRight: '10px' }} />
            Back to Cart
          </button>
          <button 
            onClick={() => navigate('/')} 
            style={styles.secondaryButton}
          >
            <FaHome style={{ marginRight: '10px' }} />
            Browse More
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  card: {
    background: '#16161C',
    borderRadius: '12px',
    padding: '3rem 2rem',
    border: '1px solid #27272A',
  },
  iconWrapper: {
    marginBottom: '1.5rem',
  },
  icon: {
    fontSize: '80px',
    color: '#EF4444',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.1rem',
    color: '#E5E7EB',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  submessage: {
    fontSize: '1rem',
    color: '#9CA3AF',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: '#6366F1',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    background: 'transparent',
    color: '#E5E7EB',
    border: '1px solid #27272A',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CancelPage;
