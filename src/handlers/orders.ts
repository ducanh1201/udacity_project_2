import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';
import { OrderInput, OrderStatus, OrderStore } from '../models/orders';

export const order_routes = (app: express.Application) => {
    app.get("/orders", verifyToken, show);
    app.post("/orders", verifyToken, create);
    app.post("/orders/:id/product", verifyToken, addProduct);
};

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userId = Number(req.user_id);

        const orders = await store.show(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).send(`Error retrieving orders: ${error}`);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userId = Number(req.user_id);

        const orderInput: OrderInput = {
            user_id: userId,
            status: OrderStatus.ACTIVE as OrderStatus
        };

        const newOrder = await store.create(orderInput);
        res.json(newOrder);
    } catch (error) {
        res.status(500).send(`Error creating order: ${error}`);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const orderId = Number(req.params.id);
        const productId = req.body.product_id as number;
        const quantity = req.body.quantity as number;

        const orderProductInput = {
            order_id: orderId,
            product_id: productId,
            quantity: quantity,
        }

        const updatedOrder = await store.addProduct(orderProductInput);
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).send(`Error adding product to order: ${error}`);
    }
}