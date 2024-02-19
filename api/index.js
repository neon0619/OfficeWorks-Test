require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure SendGrid
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

// CORS Configuration
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Import route files for each feature
const productsRoute = require('./routes/products/productsRoute');
const categoriesRoute = require('./routes/categories/categoriesRoute');
const searchRoute = require('./routes/search/searchRoute');
const enquiryRoute = require('./routes/enquiry/enquiryRoute');

// Use the routes for each feature
app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);
app.use('/search', searchRoute);
app.use('/enquiry', enquiryRoute);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
