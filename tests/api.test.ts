const request = require('supertest');
import { app } from '../app';

describe('API Endpoints', () => {
    it('POST /secrets should return status 201 and a secretKey', async () => {
      const message = 'Test message';
      const response = await request(app)
        .post('/secrets')
        .send({ message });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('secretKey');
    });
  
    it('GET /secrets/:secretKey should return the secret message', async () => {
      // Assuming you have a secretKey already stored in your database
      const secretKey = 'mockedSecretKey';
      const response = await request(app).get(`/secrets/${secretKey}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Test message');
    });
  });