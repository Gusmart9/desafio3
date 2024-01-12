// app.js
const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('../desafio3.js'); // Ajusta la ruta según la ubicación de tu archivo ProductManager

const app = express();
const port = 3000;

app.use(bodyParser.json());

const productManager = new ProductManager(); // Crea una instancia de ProductManager

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getAllProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
