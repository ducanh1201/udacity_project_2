# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: '/products' [GET] 
- Show: '/products/:id' [GET] 
- Create: [token required] '/products' [POST] 
- Top 5 most popular products: '/products/top5' [GET] 
- Products by category (args: product category): '/products/category/:category' [GET] 

#### Users
- Index: [token required] '/users' [GET] 
- Show: [token required] '/users/:id' [GET] 
- Create: [token required] '/users' [POST] 
- Login: 'users/login' [POST]

#### Orders
- Current Order by user (args: user id)[token required] '/orders' [GET] 

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(150)
);

#### User
- id
- firstname
- lastname
- password

TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    password_digest VARCHAR NOT NULL
);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    status VARCHAR(10)
);

TABLE order_products (
    order_product_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL
);