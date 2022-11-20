const { describe, expect, test } = require('@jest/globals');
const checkAuth = require('../src/middleware/authMiddleware');

const reqMock = {
  headers: {
    authorization: 'Bearer mdaskdmal.dsadalk.ajsda'
  }
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2ODg1OTcxOSwiZXhwIjoxNjY4ODk1NzE5fQ.aUD52HkJ-Ki5RJoq7wNbpd8O4x7sVgEHl4JT3yajT5o';

const reqMockWithValidToken = {
  headers: {
    authorization: `Bearer ${token}`
  }
};

const resMock = {
  statusCode: null,
  body: {},
  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json(obj) {
    this.body = obj;
    return this;
  }
};


const nextMock = () => true;

describe('checking auth middleware', () => {
  test('checks auth middleware with invalid token', () => {
    const result = checkAuth(
      reqMock,
      resMock,
      nextMock
    );

    expect(result.statusCode).toBe(401);
  });

  test('checks auth middleware with valid token', () => {
    const result = checkAuth(
      reqMockWithValidToken,
      resMock,
      nextMock
    );
    expect(result).toBeTruthy();
  });

});