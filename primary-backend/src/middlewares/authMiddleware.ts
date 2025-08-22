import { type Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MyJwtPayload } from "../types/index.js";
import { config } from "../config/config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined) {
		res.status(401).json({
			status: 401,
			message: "Unauthorized"
		});

		return;
	}
  
  const token = authHeader;

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

  try{
    const decoded = jwt.verify(token, config.jwtSecret!);
    req.user = decoded as MyJwtPayload;
    next();
  }catch(err){
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}