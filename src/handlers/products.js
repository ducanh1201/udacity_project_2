"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};
const store = new products_1.ProductStore();
const index = async (_, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const create = async (req, res) => {
    try {
        const product = await store.create(req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.default = product_routes;
