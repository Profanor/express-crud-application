const request = require('supertest');
const app = require('../dist/app'); 

describe('Product Routes', () => {
  let productId; // This will store the ID of the created product for testing PUT and DELETE

  // Test case for creating a new product
  test('POST /products - Should add a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 29.99,
      countInStock: 10,
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.product).toHaveProperty('id');
    productId = response.body.product.id; // Store the ID for future tests
  });

  // Test case for getting all products
  test('GET /products - Should get all products', async () => {
    const response = await request(app)
      .get('/products')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.products).toBeInstanceOf(Array);
  });

  // Test case for updating an existing product
  test('PUT /products/:id - Should update an existing product', async () => {
    const updatedProduct = {
      name: 'Updated Test Product',
      price: 39.99,
    };

    const response = await request(app)
      .put(`/products/${productId}`)
      .send(updatedProduct)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.product.name).toBe(updatedProduct.name);
    expect(response.body.product.price).toBe(updatedProduct.price);
  });

  // Test case for deleting an existing product
  test('DELETE /products/:id - Should delete an existing product', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Product deleted successfully');
  });
});
