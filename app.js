"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Dependencies
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const secretsService_1 = require("./application/secretsService");
const encodeService_1 = require("./infrastructure/encodeService");
const database_1 = require("./infrastructure/database");
require('dotenv').config();
// Express and app setup
exports.app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
exports.app.use(bodyParser.json());
// Services
const encodeService = new encodeService_1.EncodeService();
const database = new database_1.Database();
const secretsService = new secretsService_1.SecretService(encodeService, database);
database.addSecret('mockedSecretKey', 'Test message');
// Endpoints
exports.app.post('/secrets', (req, res) => {
    const { message } = req.body;
    const secretKey = secretsService.saveSecret(message);
    res.status(201).json({ secretKey });
});
exports.app.get('/secrets/:secretKey', (req, res) => {
    const { secretKey } = req.params;
    const response = secretsService.getSecret(secretKey);
    res.status(response.status).json(response.message);
});
// Launching express app
exports.app.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
});
