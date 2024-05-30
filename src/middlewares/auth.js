"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    try {
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET must be defined');
        }
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Authorization token not found" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, tokenSecret);
        //@ts-ignore
        req.user_id = decodedToken.user.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
