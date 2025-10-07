import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axios';
import { FaShoppingBag, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, totalPrice } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCheckout = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/checkout/create-checkout-session', {
        cartItems: cart,
        email: email
      });

      if (response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-emptyCart">
          <FaShoppingBag className="cart-emptyIcon" />
          <h1 className="cart-emptyTitle">Your Cart is Empty</h1>
          <p className="cart-emptySubtitle">Add some items to get started</p>
          <a href="/" className="cart-shopBtn">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-cartContent">
        {cart.map((item) => (
          <div key={item.id" className="cart-cartItem}>
            <div className="cart-imageWrapper">
              <img src={item.image" alt={item.name} className="cart-image} />
            </div>
            <div className="cart-itemDetails">
              <h3 className="cart-itemName">{item.name"</h3>
              <p className="cart-price">₹{item.price"</p>
            </div>
            <div className="cart-quantityControl">
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="cart-quantityBtn}
              >
                <FaMinus />
              </button>
              <span className="cart-quantity">{item.quantity"</span>
              <button 
                onClick={() => addToCart(item)} 
                className="cart-quantityBtn}
              >
                <FaPlus />
              </button>
            </div>
            <div className="cart-itemTotal">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-checkoutSection">
        <div className="cart-totalSection">
          <h2 className="cart-totalText">Total: <span className="cart-totalAmount">₹{totalPrice"</span></h2>
        </div>
        
        <div className="cart-emailSection">
          <label htmlFor="email" className="cart-label">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="cart-input}
            required
          />
        </div>

        {error && <div className="cart-error">{error"</div>}

        <button 
          onClick={handleCheckout} 
          className="cart-checkoutBtn}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>

        <button 
          onClick={clearCart} 
          className="cart-clearBtn}
        >
          <FaTrashAlt style={{ marginRight: '8px' "} />
          Clear Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: '2rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: '#16161C',
    borderRadius: '12px',
    border: '1px solid #27272A',
  },
  emptyIcon: {
    fontSize: '4rem',
    color: '#6366F1',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: '0.5rem',
  },
  emptySubtitle: {
    fontSize: '1rem',
    color: '#9CA3AF',
    marginBottom: '1.5rem',
  },
  shopBtn: {
    display: 'inline-block',
    background: '#6366F1',
    color: '#FFFFFF',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
  },
  cartContent: {
    marginBottom: '2rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#16161C',
    borderRadius: '12px',
    marginBottom: '1rem',
    border: '1px solid #27272A',
  },
  imageWrapper: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: '0.25rem',
  },
  price: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6366F1',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    border: '1px solid #27272A',
    borderRadius: '6px',
    background: '#0D0D10',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#E5E7EB',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    padding: '0 0.75rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#E5E7EB',
    minWidth: '30px',
    textAlign: 'center',
  },
  itemTotal: {
    fontWeight: '700',
    fontSize: '1.2rem',
    color: '#6366F1',
    minWidth: '80px',
    textAlign: 'right',
  },
  checkoutSection: {
    background: '#16161C',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #27272A',
  },
  totalSection: {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#0D0D10',
    borderRadius: '8px',
  },
  totalText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#E5E7EB',
  },
  totalAmount: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#6366F1',
  },
  emailSection: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#E5E7EB',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #27272A',
    borderRadius: '8px',
    fontSize: '1rem',
    background: '#0D0D10',
    color: '#E5E7EB',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#EF4444',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontWeight: '500',
    fontSize: '0.9rem',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  checkoutBtn: {
    width: '100%',
    background: '#6366F1',
    color: '#FFFFFF',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '0.75rem',
  },
  clearBtn: {
    width: '100%',
    background: 'transparent',
    color: '#EF4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CartPage;
