import { Kafka } from "kafkajs"; 

const clientId = "outbox-processor";
const brokers = ["localhost:9094"]; 

export const kafka = new Kafka({
  clientId,
  brokers,
});

const topicsToCreate = [
  {
    name: "zap-events",
    partitions: 1,
    replicationFactor: 1,
  },
];

const startKafka = async () => {
  const admin = kafka.admin();

  try {
    await admin.connect();
    console.log("Kafka Admin Client Connected!");

    const topics = await admin.listTopics();
    console.log("Existing topics: ", topics);

    const created = await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({
        topic: topic.name,
        numPartitions: topic.partitions || 3,
        replicationFactor: topic.replicationFactor || 1,
      })),
    });

    console.log({ created });
  } catch (err) {
    console.error("Kafka Initialization Error: ", err);
  } finally {
    await admin.disconnect();
    console.log("Kafka Admin Client Disconnected!");
  }
};

startKafka();
