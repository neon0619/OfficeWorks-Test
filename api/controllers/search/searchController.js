const axiosInstance = require("../../helpers/axiosInstance");

const searchProducts = async (req, res) => {
  try {
    const { keywords } = req.query;
    if (!keywords) {
      return res.status(400).json({ error: "Keywords parameter is missing" });
    }

    const response = await axiosInstance.get("/products");
    const products = response.data;

    // Filter products based on keywords
    const filteredProducts = products.filter((product) => {
      const productName = product.title.toLowerCase();
      return productName.includes(keywords.toLowerCase());
    });

    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  searchProducts,
};
