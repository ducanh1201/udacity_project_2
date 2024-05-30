import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { User } from "../models/users";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      if(!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET must be defined');
      } 
  
      const authorizationHeader = req.headers.authorization;
  
      if (!authorizationHeader) {
        return res.status(401).json({ message: 'No token provided.' });
      }
  
      const token = authorizationHeader.split(' ')[1];
  
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Authorization token not found" });
      }
      const decodedToken = jwt.verify(token, tokenSecret) as { user: User };
  
      //@ts-ignore
      req.user_id = decodedToken.user.id;
  
      next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
  }