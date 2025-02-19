/**
 * Express server setup for the e-commerce API
 * Provides endpoints for product and stock/price information
 */
const express = require('express');
const cors = require('cors');
const products = require('./data/products');
const stockPrice = require('./data/stock-price');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/**
 * GET /api/products
 * Returns the full list of products with their details
 * @route GET /api/products
 * @returns {Object[]} Array of product objects
 */
app.get('/api/products', (req, res) => {
  res.json(products);
});

/**
 * GET /api/stock-price/:sku
 * Returns stock and price information for a specific SKU
 * @route GET /api/stock-price/:sku
 * @param {string} sku - The SKU code to look up
 * @returns {Object} Object containing stock and price data
 * @returns {number} Object.stock - Current stock level
 * @returns {number} Object.price - Current price in cents
 * @throws {404} If SKU is not found
 */
app.get('/api/stock-price/:sku', (req, res) => {
  const { sku } = req.params;
  const variantData = stockPrice[sku];

  if (!variantData) {
    return res.status(404).json({ error: 'Variant not found' });
  }

  res.json(variantData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});