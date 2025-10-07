import React from 'react';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';
import './ProductList.css';

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div className="product-list-container">
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
                onClick={() => addToCart(product)} 
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
