import client from "../database";

export type Product = {
    id: number;
    name: string;
    price: number;
    category?: string;
}

export type ProductInput = Omit<Product, 'id'>;

export class ProductStore {
    async index(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        const conn = await client.connect();

        try {
            const result = await conn.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Unable to retrieve products. Error: ${error}`);
        } finally {
            conn.release();
        }
    }

    async show(productId: number): Promise<Product> {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const conn = await client.connect();

        try {
            const result = await conn.query(sql, [productId]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to find product ${productId}. Error: ${err}`);
        } finally {
            conn.release();
        }
    }

    async create(p: ProductInput): Promise<Product> {
        const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
        const conn = await client.connect();

        try {
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create product. Error: ${error}`);
        } finally {
            conn.release();
        }
    }
}