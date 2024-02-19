import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTopRatedProducts } from '../../services/topProduct';
import './home.scss';
import ProductCard from '../../components/productCard';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const topRatedProducts = useSelector((state: RootState) => state.topProducts.data);

  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  return (
    <div className="top-product-container">
      <div className="header">
        <h2>Top 5 Products</h2>
      </div>
      <div className="product-list">
        {topRatedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
  </div>
  );
};

export default Home;
