import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
//routes
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
// middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

// connect database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// health check
app.get("/", (_req, res) => {
    res.send("Backend is running");
});

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
