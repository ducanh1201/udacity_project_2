CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    password_digest VARCHAR
);