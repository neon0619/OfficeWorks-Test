const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/search/searchController');

router.get('/', searchController.searchProducts);

module.exports = router;
