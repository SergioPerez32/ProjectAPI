"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const app_1 = require("../app");
describe('API Endpoints', () => {
    it('POST /secrets should return status 201 and a secretKey', () => __awaiter(void 0, void 0, void 0, function* () {
        const message = 'Test message';
        const response = yield request(app_1.app)
            .post('/secrets')
            .send({ message });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('secretKey');
    }));
    it('GET /secrets/:secretKey should return the secret message', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming you have a secretKey already stored in your database
        const secretKey = 'mockedSecretKey';
        const response = yield request(app_1.app).get(`/secrets/${secretKey}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Test message');
    }));
});
