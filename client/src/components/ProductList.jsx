import React, { useState } from 'react';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';
import Toast from './Toast';
import './ProductList.css';

const ProductList = () => {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`${product.name} added to cart!`);
  };

  return (
    <div className="product-list-container">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <div className="product-list-header">
        <h1 className="product-list-title">Products</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-card-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button 
                onClick={() => handleAddToCart(product)} 
                className="product-add-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
