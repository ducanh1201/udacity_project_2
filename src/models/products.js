"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        const sql = 'SELECT * FROM products';
        const conn = await database_1.default.connect();
        try {
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to retrieve products. Error: ${error}`);
        }
        finally {
            conn.release();
        }
    }
    async show(productId) {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const conn = await database_1.default.connect();
        try {
            const result = await conn.query(sql, [productId]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to find product ${productId}. Error: ${err}`);
        }
        finally {
            conn.release();
        }
    }
    async create(p) {
        const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
        const conn = await database_1.default.connect();
        try {
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create product. Error: ${error}`);
        }
        finally {
            conn.release();
        }
    }
}
exports.ProductStore = ProductStore;
