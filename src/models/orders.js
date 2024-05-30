"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = exports.OrderStatus = void 0;
const database_1 = __importDefault(require("../database"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["ACTIVE"] = "active";
    OrderStatus["COMPLETE"] = "complete";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
class OrderStore {
    async show(userId) {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to retrieve orders for user ${userId}. Error: ${err}`);
        }
    }
    async create(orderInput) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderInput.user_id, orderInput.status]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Order creation failed. Error details: ${error}`);
        }
    }
    async addProduct(orderProductInput) {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderProductInput.order_id, orderProductInput.product_id, orderProductInput.quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add product ${orderProductInput.product_id} to order ${orderProductInput.order_id}. Error details: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
