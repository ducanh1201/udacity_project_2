# Storefront Backend Project
This project is the backend for a Simple Store App, designed to handle orders, products, and user data. It provides API endpoints for creating, reading, updating data related to products, orders, and user authentication.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (Preferably the latest stable version)
- PostgreSQL (Ensure it is set up and running)
- npm (Node package manager)

### Installation
1. Run these commands in psql terminal
```
CREATE DATABASE full_stack_dev
CREATE DATABASE full_stack_test
CREATE USER full_stack_user WITH PASSWORD 'password123'
Grant full_stack_dev & full_stack_test to full_stack_user
```
2. Create .env file and add these to the file
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_TEST_DB=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
TOKEN_SECRET=secret
BCRYPT_PASSWORD=my-secret-password
SALT_ROUNDS=10
ENV=dev
```
3. Install all dependencies
```
npm install
```
4. Run migrations
```
npm run migrate
```
### Running the Application
```
npm run watch
```
### Testing
```
npm run test
```


