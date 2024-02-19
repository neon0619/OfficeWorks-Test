import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard';
import './products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProductList } from '../../services/productList';
import { useParams } from 'react-router-dom';

const Products: React.FC = () => {
  // Initialize Redux-related variables
  const dispatch: AppDispatch = useDispatch();
  const productList = useSelector((state: RootState) => state.productList);
  const { data, status, error } = productList;

  // Initialize states for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Get category and sort parameters from the URL using React Router
  const { category, sortBy } = useParams();

  // Fetch product list data from the server when the component loads
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductList());
    }
  }, [status, dispatch]);

  // Update selectedCategory and selectedSortOption when URL parameters change
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
    if (sortBy) {
      setSelectedSortOption(sortBy);
    }
  }, [category, sortBy]);

  // Filter products based on the search term
  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract unique categories from the data
  const categories = [...new Set(data.map((product) => product.category))];

  // Define sort options
  const sortOptions = ['title', 'price', 'ratings'];

  // Handle loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (status === 'failed') {
    return <div>Error: {error || 'An error occurred while fetching data.'}</div>;
  }

  // Sort products based on the selected sort option
  const sortedData = [...filteredData];
  if (selectedSortOption === 'title') {
    sortedData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSortOption === 'price') {
    sortedData.sort((a, b) => a.price - b.price);
  } else if (selectedSortOption === 'ratings') {
    sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  // Render the product list component
  return (
    <div className="product-list-container">
      <div className="header">
      <h2 className='header-category'>Products</h2>
        <div className='filter-wrapper'>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Category dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* Sort options dropdown */}
          <select
            value={selectedSortOption}
            onChange={(e) => setSelectedSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-list">
        {sortedData
          .filter((product) => !selectedCategory || product.category === selectedCategory)
          .map((product) => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;