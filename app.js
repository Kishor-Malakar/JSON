const fs = require('fs');
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    let products = jsonData.jsonData;

    const newProduct = {"id": 5, "name": "Fridge", "category": "Electronics", "price": 60000, "available": true};
    products = addProduct(products, newProduct);

    const updatedProduct = updatePrice(products, 2, 40000);
    const availableProducts = filterAvailableProducts(products);
    const electronicsProducts = filterProductsByCategory(products, "Electronics");

    console.log("Updated Products:", products);
    console.log("Available Products:", availableProducts);
    console.log("Electronics Products:", electronicsProducts);

  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});

function addProduct(products, newProduct) {
  if (!newProduct.id || !newProduct.name || !newProduct.category || typeof newProduct.price !== 'number' || typeof newProduct.available !== 'boolean') {
    console.error('Invalid product data');
    return products;
  }

  products.push(newProduct);
  return products;
}

function updatePrice(products, productId, newPrice) {
  const product = products.find(product => product.id === productId);
  if (!product) {
    console.error('Product not found');
    return null;
  }
  product.price = newPrice;
  return product;
}

function filterAvailableProducts(products) {
  return products.filter(product => product.available === true);
}

function filterProductsByCategory(products, category) {
  return products.filter(product => product.category === category);
}
