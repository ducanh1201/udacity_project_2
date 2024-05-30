import app from '../server';
import supertest from 'supertest';
import { OrderStore } from '../models/orders';
import { ProductStore } from '../models/products';
import { UserStore } from '../models/users';
import { setToken, testOrder, testOrderProduct, testProduct, testUser, token } from './index';

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();
const request = supertest(app);

describe('Order Model', () => {
  beforeAll(async () => {
    await userStore.create(testUser);
    await productStore.create(testProduct);
    const res = await request.post('/users/login').send(testUser);
    setToken(res.body);
  });

  describe('Method Existence', () => {
    it('should have a retrieve method', () => {
      expect(orderStore.show).toBeDefined();
    });
  
    it('should have an initiate method', () => {
      expect(orderStore.create).toBeDefined();
    });
  
    it('should have an append method', () => {
      expect(orderStore.addProduct).toBeDefined();
    });
  });

  describe('Method Functionality', () => {
    it('retrieve method should return a list of orders', async () => {
      const orders = await orderStore.show(1);
      expect(orders).toBeTruthy();
    });

    it('initiate method should create an order', async () => {
      const order = await orderStore.create(testOrder);
      expect(`${order.user_id}`).toMatch(`${testOrder.user_id}`);
    });

    it('append method should add a product to an order', async () => {
      const orderProduct = await orderStore.addProduct(testOrderProduct);
      expect(`${orderProduct.order_id}`).toMatch(`${testOrderProduct.order_id}`);
    });
  });

  describe('API Endpoints', () => {
    it('POST /orders should create an order', async () => {token
      const res = await request.post('/orders').send(testOrder).set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('GET /orders should return orders', async () => {
      const res = await request.get('/orders').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('POST /orders/1/product should add a product to an order', async () => {
      const res = await request.post('/orders/1/product').send(testOrderProduct).set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

});