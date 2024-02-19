// Product-related controllers
const axiosInstance = require('../../helpers/axiosInstance');

const getProducts = async (req, res) => {
    try {
      const response = await axiosInstance.get('/products');
      const products = response.data;
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      const response = await axiosInstance.get(`/products/category/${category}`);
      let products = response.data;
  
      // Sort products by ratings from top to lowest rating
      products.sort((a, b) => b.rating.rate - a.rating.rate);
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const getTopRatedProducts = async (req, res) => {
    try {
      // Make an HTTP request to fetch the product data from the external API
      const response = await axiosInstance.get('/products');
      const products = response.data;
  
      // Sort the products by rating in descending order
      const topRatedProducts = products.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 5); // Get the top 5 rated products
  
      res.json(topRatedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {
  getProducts,
  getProductsByCategory,
  getTopRatedProducts
};
