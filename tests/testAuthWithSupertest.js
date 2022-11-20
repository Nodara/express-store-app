const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const server = require('../src/server');
const { getAllProducts } = require('../src/services/productService');

require('dotenv').config();


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2ODg1OTcxOSwiZXhwIjoxNjY4ODk1NzE5fQ.aUD52HkJ-Ki5RJoq7wNbpd8O4x7sVgEHl4JT3yajT5o';

describe('checking auth middleware', () => {
  test('checks auth middleware with invalid token, with supertest', async () => {
    await request(server)
      .get('/api/regions')
      .expect(401);
  });

  test('checks auth middleware with valid token, with supertest', async () => {
    await request(server)
      .get('/api/test')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});


