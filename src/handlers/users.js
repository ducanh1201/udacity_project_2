"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const auth_1 = require("../middlewares/auth");
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
const user_routes = (app) => {
    app.get("/users", auth_1.verifyToken, index);
    app.get("/users/:id", auth_1.verifyToken, show);
    app.post("/users", create);
    app.post("/users/login", login);
};
exports.user_routes = user_routes;
const store = new users_1.UserStore();
const index = async (_, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const show = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await store.show(userId);
        res.json(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const create = async (req, res) => {
    console.log(req.body);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const login = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user);
        const token = jsonwebtoken_1.default.sign({ user: u }, tokenSecret);
        res.json(token);
    }
    catch (error) {
        res.status(401).send(error);
    }
};
