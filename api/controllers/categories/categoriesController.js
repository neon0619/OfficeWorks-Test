// Category-related controllers
const axiosInstance = require('../../helpers/axiosInstance');

const getAllCategories = async (req, res) => {
    try {
        const response = await axiosInstance.get('/products/categories');
        const categories = response.data;
        res.json(categories);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports = {
  getAllCategories,
};
