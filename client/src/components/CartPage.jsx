import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axios';
import { FaShoppingBag, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
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
          <div key={item.id} className="cart-cartItem">
            <div className="cart-imageWrapper">
              <img src={item.image} alt={item.name} className="cart-image" />
            </div>
            <div className="cart-itemDetails">
              <h3 className="cart-itemName">{item.name}</h3>
              <p className="cart-price">₹{item.price}</p>
            </div>
            <div className="cart-quantityControl">
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="cart-quantityBtn"
              >
                <FaMinus />
              </button>
              <span className="cart-quantity">{item.quantity}</span>
              <button 
                onClick={() => addToCart(item)} 
                className="cart-quantityBtn"
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
          <h2 className="cart-totalText">Total: <span className="cart-totalAmount">₹{totalPrice}</span></h2>
        </div>
        
        <div className="cart-emailSection">
          <label htmlFor="email" className="cart-label">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="cart-input"
            required
          />
        </div>

        {error && <div className="cart-error">{error}</div>}

        <button 
          onClick={handleCheckout} 
          className="cart-checkoutBtn"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>

        <button 
          onClick={clearCart} 
          className="cart-clearBtn"
        >
          <FaTrashAlt style={{ marginRight: '8px' }} />
          Clear Cart
        </button>
      </div>
    </div>
  );
};
export default CartPage;
