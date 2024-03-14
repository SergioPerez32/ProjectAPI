"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.storage = void 0;
exports.storage = new Map();
class Database {
    addSecret(secretKey, message) {
        exports.storage.set(secretKey, { message });
    }
    getSecret(secretKey) {
        return exports.storage.get(secretKey);
    }
    deleteSecret(secretKey) {
        exports.storage.delete(secretKey);
    }
}
exports.Database = Database;
