import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import revenueRoutes from "./routes/revenue.routes.js";
// import { connectRedis } from "./utils/redis.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("Revenue Analytics Dashboard");
});

// Routes
app.use("/api/revenue", revenueRoutes);

// Error Handler
app.use(errorHandler);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Redis Connection
// connectRedis();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
