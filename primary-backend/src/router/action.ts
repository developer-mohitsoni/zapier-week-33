import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import prisma from "../db/db.config";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config/config";
import { SigninSchema, SignupSchema } from "../validation/authValidation";

const router = Router();

router.get("/available", async(req:Request,res:Response)=>{
  const availableActions = await prisma.availableAction.findMany({});
  return res.json({availableActions});
})

export const actionRouter = router;