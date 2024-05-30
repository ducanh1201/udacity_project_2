import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserInput, UserStore } from '../models/users';
import { verifyToken } from '../middlewares/auth';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export const user_routes = (app: express.Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/users", create);
  app.post("/users/login", login);
};

const store = new UserStore();

const index = async (_: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req: Request, res: Response) => {
  console.log(req.body);
  const user: UserInput = {
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password: req.body.password as string,
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req: Request, res: Response) => {
  const user: UserInput = {
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password: req.body.password as string,
  };

  try {
    const u = await store.authenticate(user);
    const token = jwt.sign({ user: u }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(401).send(error);
  }
};