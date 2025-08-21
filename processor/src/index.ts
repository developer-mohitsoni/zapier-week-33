import prisma from "./db/db.config";
import { connectToKafka, producer } from "./producer/producer";

async function main(){
  await connectToKafka();
  while(1){
    const pendingRows = await prisma.zapRunOutbox.findMany({
      take: 10
    })

    pendingRows.forEach(r=>{
      // Send each row to Kafka
      producer.send({
        topic: "zap-events",
        messages: pendingRows.map(r => ({
          value: r.zapRunId
        }))
      })
    })

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map(r => r.id)
        }
      }
    })
  }
  await producer.disconnect();
}

main();