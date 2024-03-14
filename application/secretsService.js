"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretService = void 0;
class SecretService {
    constructor(encodeService, database) {
        this.encodeService = encodeService;
        this.database = database;
    }
    saveSecret(message) {
        const secretKey = this.encodeService.encodeKey();
        this.database.addSecret(secretKey, message);
        return secretKey;
    }
    getSecret(secretKey) {
        const secret = this.database.getSecret(secretKey);
        let response;
        if (!secret) {
            response = { status: 404, message: { error: 'Secret not found' } };
        }
        else {
            this.database.deleteSecret(secretKey);
            response = { status: 200, message: secret };
        }
        return response;
    }
}
exports.SecretService = SecretService;
