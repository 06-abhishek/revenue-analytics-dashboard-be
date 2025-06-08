import { createClient } from "redis";

const redisClient = createClient();

const connectRedis = async () => {
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  await redisClient.connect();
  console.log("Redis connected");
};

export { connectRedis };
export default redisClient;
