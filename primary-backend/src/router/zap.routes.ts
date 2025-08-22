import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { zapSchema } from "../validation/zapValidation";
import prisma from "../db/db.config";

const router = Router();

router.post("/", authMiddleware, async(req, res)=>{
  const id = req.user?.id;

  const body = req.body;

  const parsedData = zapSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const zapId = await prisma.$transaction(async tx =>{
    const zap = await tx.zap.create({
      data:{
        userId: id,
        triggerId: parsedData.data.availableTriggerId,
        Trigger:{
          create:{
            triggerId: parsedData.data.availableTriggerId
          }
        },
        actions:{ 
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index
          }))
        } 
      }
    })

    return zap.id;
  })
  return res.status(201).json({ 
    zapId,
    message: "Zap created successfully" 
  });
})

router.get("/", authMiddleware, async(req, res)=>{
  const id = req.user?.id;

  const zaps = await prisma.zap.findMany({
    where:{
      userId: id
    },
    include:{
      actions:{
        include:{
          type: true
        }
      },
      Trigger:{
        include:{
          type: true
        }
      }
    }
  })

  return res.json({
    zaps
  })
})

router.get("/:zapId", authMiddleware, async(req, res)=>{
  const id = req.user?.id;

  const {zapId} = req.params;

  const zaps = await prisma.zap.findFirst({
    where:{
      userId: id,
      id: zapId
    },
    include:{
      actions:{
        include:{
          type: true
        }
      },
      Trigger:{
        include:{
          type: true
        }
      }
    }
  })

  return res.json({
    zaps
  })
})

export const zapRouter = router;