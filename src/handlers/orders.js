"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_routes = void 0;
const auth_1 = require("../middlewares/auth");
const orders_1 = require("../models/orders");
const order_routes = (app) => {
    app.get("/orders", auth_1.verifyToken, show);
    app.post("/orders", auth_1.verifyToken, create);
    app.post("/orders/:id/product", auth_1.verifyToken, addProduct);
};
exports.order_routes = order_routes;
const store = new orders_1.OrderStore();
const show = async (req, res) => {
    try {
        //@ts-ignore
        const userId = Number(req.user_id);
        const orders = await store.show(userId);
        res.json(orders);
    }
    catch (error) {
        res.status(500).send(`Error retrieving orders: ${error}`);
    }
};
const create = async (req, res) => {
    try {
        //@ts-ignore
        const userId = Number(req.user_id);
        const orderInput = {
            user_id: userId,
            status: orders_1.OrderStatus.ACTIVE
        };
        const newOrder = await store.create(orderInput);
        res.json(newOrder);
    }
    catch (error) {
        res.status(500).send(`Error creating order: ${error}`);
    }
};
const addProduct = async (req, res) => {
    try {
        const orderId = Number(req.params.id);
        const productId = req.body.product_id;
        const quantity = req.body.quantity;
        const orderProductInput = {
            order_id: orderId,
            product_id: productId,
            quantity: quantity,
        };
        const updatedOrder = await store.addProduct(orderProductInput);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).send(`Error adding product to order: ${error}`);
    }
};
