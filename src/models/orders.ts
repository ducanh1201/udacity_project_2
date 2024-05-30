import client from "../database";

export enum OrderStatus {
    ACTIVE = 'active',
    COMPLETE = 'complete'
}

export type Order = {
    id: number;
    user_id: number;
    status: OrderStatus;
}


export type OrderInput = Omit<Order, 'id'>;

export type OrderProduct = {
    order_product_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export type OrderProductInput = Omit<OrderProduct, 'order_product_id'>;


export class OrderStore {
    async show(userId: number): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Unable to retrieve orders for user ${userId}. Error: ${err}`);
        }

    }

    async create(orderInput: OrderInput): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [orderInput.user_id, orderInput.status]);

            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Order creation failed. Error details: ${error}`);
        }
    }

    async addProduct(orderProductInput: OrderProductInput): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [orderProductInput.order_id, orderProductInput.product_id, orderProductInput.quantity]);

            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Failed to add product ${orderProductInput.product_id} to order ${orderProductInput.order_id}. Error details: ${error}`);
        }
    }
}
