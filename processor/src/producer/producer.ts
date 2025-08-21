import { kafka } from "../kafka/kafka-service";

export const producer = kafka.producer();

export const connectToKafka = async()=>{
  try{
    await producer.connect();
    console.log("Producer connected!");
  }catch(err){
    console.log("Error connecting to Kafka", err);
  }
}