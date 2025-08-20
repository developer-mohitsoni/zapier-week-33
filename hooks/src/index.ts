import express, { Application, Request, Response } from "express";
import prisma from "./db/db.config"

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/hooks/catch/:userId/:zapId", async(req:Request,res:Response)=>{
  const userId = req.params.userId;
  const zapId = req.params.zapId;

  const body = req.body;

  // store in db when a new trigger happened
  await prisma.$transaction(async tx =>{
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body
      }
    });

    await tx.zapRunOutbox.create({
      data:{
        zapRunId: run.id
      }
    })
  })

  return res.json({
    message: "Webhook received!"
  })

  // push it on a queue on (kafka/redis)
  // kafkaPublisher.publish({
  //   zapId
  // })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
