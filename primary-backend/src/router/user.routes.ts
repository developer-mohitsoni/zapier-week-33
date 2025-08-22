import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import prisma from "../db/db.config";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config/config";
import { SigninSchema, SignupSchema } from "../validation/authValidation";

const router = Router();

router.post("/signup", async(req, res)=>{
  const {name, username, password} = req.body;

  const parsedData = SignupSchema.safeParse({name, username, password});

  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const userExists = await prisma.user.findFirst({
    where:{
      email: parsedData.data.username
    }
  })

  if (userExists) {
    return res.status(403).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

  await prisma.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.username,
      password: hashedPassword
    }
  })

  // await sendEmail()

  return res.status(201).json({ message: "Please verify your account by checking your email" });
})

router.post("/signin", async(req, res)=>{
  const {username, password} = req.body;

  const parsedData = SigninSchema.safeParse({username, password});

  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const user = await prisma.user.findFirst({
    where:{
      email: parsedData.data.username,
    }
  })

  if(!user){
    return res.status(403).json({
      message: "Sorry credentials are incorrect"
    })
  }

  const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({
      message: "Sorry credentials are incorrect"
    })
  }

  const token = jwt.sign({ id: user.id }, config.jwtSecret!, {
    expiresIn: "1h"
  });

  return res.status(200).json({ token });
})

router.get("/", authMiddleware, async(req, res)=>{
  const id = req.user?.userId;

  const user = await prisma.user.findFirst({
    where:{
      id
    },
    select:{
      name: true,
      email: true
    }
  });

  return res.json({
    user
  })
})

export const userRouter = router;