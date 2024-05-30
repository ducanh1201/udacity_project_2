import app from '../server'
import supertest from 'supertest';
import { ProductStore } from '../models/products';
import {testProduct} from './index';

const productStore = new ProductStore();
const request = supertest(app);

describe('Product Model', () => {
  describe('Method Existence', () => {
    it('should have a list method', () => {
      expect(productStore.index).toBeDefined();
    });

    it('should have a retrieve method', () => {
      expect(productStore.show).toBeDefined();
    });
  
    it('should have an initiate method', () => {
      expect(productStore.create).toBeDefined();
    });
  
  });

  describe('Method Functionality', () => {
    it('initiate method should create a product', async () => {
      const product = await productStore.create(testProduct);
      expect(`${product.name}`).toMatch(`${testProduct.name}`);
    });

    it('list method should return a list of products', async () => {
      const products = await productStore.index();
      expect(products).toBeTruthy();
    });

    it('retrieve method should return a product', async () => {
      const product = await productStore.show(1);
      expect(product).toBeTruthy();
    });
  });

  describe('API Endpoints', () => {
    it('GET /products should return a list of products', async () => {
      const res = await request.get('/products');
      expect(res.status).toBe(200);
    });

    it('GET /products/1 should return a product', async () => {
      const res = await request.get('/products/1');
      expect(res.status).toBe(200);
    })

    it('POST /products should create a product', async () => {
      const res = await request.post('/products').send(testProduct);
      expect(res.status).toBe(200);
    });

    it('GET /products should return products', async () => {
      const res = await request.get('/products');
      expect(res.status).toBe(200);
    });
  });

});