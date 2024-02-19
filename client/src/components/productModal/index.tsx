import React from 'react';
import { Product } from '../../types/productTypes';
import './productModal.scss';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) {
    return null;
  }


  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{product.title}</h2>
          <button onClick={onClose}>x</button>
        </div>
        <div className="modal-content">
          <div className="product-image-modal">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details">
            <p className="description"><b>Description:</b> {product.description}</p>
            <p className="category">Category: {product.category}</p>
            <p className="price">Price: ${product.price}</p>
            <p className="rating">
              Rating: {product.rating.rate} ★ ({product.rating.count} reviews)
            </p>
            <div className="modal-button-wrapper">
                <button onClick={onClose}>
                    Cancel
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
