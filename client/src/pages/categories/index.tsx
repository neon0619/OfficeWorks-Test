import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchCategories } from '../../services/categories';
import './categories.scss';
import { fetchProductsByCategory } from '../../services/productList';
import ProductCard from '../../components/productCard';

const CategoryPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.data);
  const products = useSelector((state: RootState) => state.productListByCategory.data);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    dispatch(fetchProductsByCategory(category));
    setSelectedCategory(category);
  };

  return (
    <div className="category-page">
      <h2 className='header-category'>Categories</h2>
      <div>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={selectedCategory === category ? 'selected-category' : ''}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list">
        {products.length === 0 ? (
          <div className='select-category-wrapper'>
            <p>Select Category</p>
          </div>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
