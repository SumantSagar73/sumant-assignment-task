import React from 'react';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Products</h1>
      </div>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.cardContent}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.price}>₹{product.price}</p>
              <button 
                onClick={() => addToCart(product)} 
                style={styles.button}
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

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#E5E7EB',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#16161C',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #27272A',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '1rem',
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#E5E7EB',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#6366F1',
    margin: '0.5rem 0 1rem 0',
  },
  button: {
    width: '100%',
    background: '#6366F1',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
};

export default ProductList;
