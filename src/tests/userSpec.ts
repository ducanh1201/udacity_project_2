import { UserStore } from './../models/users';
import supertest from 'supertest';
import app from '../server';
import { testUser, token } from './index';

const store = new UserStore();
const request = supertest(app);

describe('User Model', () => {

  describe('Methods Availability', () => {
    it('should have a index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a login method', () => {
      expect(store.authenticate).toBeDefined();
    });
  });

  describe('Methods Functionality', () => {
    it('should return a list of users', async () => {
      const users = await store.index();
      expect(users).toBeTruthy();
    });

    it('should return a single user', async () => {
      const user = await store.show(1);
      expect(user.id).toBe(1);
    })

    it('should create a user', async () => {
      const user = await store.create(testUser);
      expect(user.firstname).toMatch(testUser.firstname);
    });
  });

  describe('End Points', () => {
    it('login: should return a token', async () => {
      const res = await request.post('/users/login').send(testUser);
      expect(res.status).toBe(200);
    });

    it('index should return users', async () => {
      const res = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);;
    });

    it('show should return a user', async () => {
      const res = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);;
    });

    it('create should return a user', async () => {
      const res = await request.post('/users').send(testUser).set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);;
    });
  });
});