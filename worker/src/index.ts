import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-processor", 
  brokers: ["localhost:9094"],
});

async function main(){
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();

  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value?.toString()}`);

      await new Promise(r => setTimeout(r,1000));

      await consumer.commitOffsets([{
        topic: "zap-events",
        partition: partition,
        offset: (parseInt(message.offset) + 1).toString()
      }])
    }
  });
}
main();