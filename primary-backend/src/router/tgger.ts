import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import prisma from "../db/db.config";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config/config";
import { SigninSchema, SignupSchema } from "../validation/authValidation";

const router = Router();

// /api/v1/trigger/available
router.get("/available", async(req:Request,res:Response)=>{
  const availableTriggers = await prisma.availableTrigger.findMany({});
  return res.json({availableTriggers});
})

export const triggerRouter = router;