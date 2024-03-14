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
// Dependencies
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
// Express and app setup
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(bodyParser.json());
// Database
const storage = new Map();
// Functions
function generateSecretKey() {
    return crypto_1.default.randomBytes(8).toString('hex');
}
// Endpoints
app.post('/secrets', (req, res) => {
    const { message } = req.body;
    const secretKey = generateSecretKey();
    storage.set(secretKey, { message });
    const urlForSecret = `http://localhost:3000/secrets/` + secretKey; //no estatico config/setting file
    res.status(201).json({ secretKey, urlForSecret });
});
app.get('/secrets/:secretKey', (req, res) => {
    const { secretKey } = req.params;
    const secret = storage.get(secretKey);
    console.log(secret);
    console.log(typeof (secret));
    if (!secret) {
        res.status(404).json({ error: 'Secret not found' });
    }
    else {
        storage.delete(secretKey);
        res.json(secret);
    }
});
// Launching express app
app.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
});
