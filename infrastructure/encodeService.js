"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeService = void 0;
const crypto_1 = __importDefault(require("crypto"));
require('dotenv').config();
const bytesSize = Number(process.env.BYTESSIZE);
class EncodeService {
    encodeKey() {
        console.log(bytesSize);
        return crypto_1.default.randomBytes(bytesSize).toString('hex');
    }
}
exports.EncodeService = EncodeService;
