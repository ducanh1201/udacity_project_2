CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(10)
);

CREATE TABLE order_products (
    order_product_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER
);