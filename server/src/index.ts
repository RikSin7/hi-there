import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
//routes
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";
import chatRoute from "./routes/chat.routes.js";

// middlewares
import errorMiddleware from "./middlewares/error.middleware.js";
dotenv.config();

//cors
import cors from "cors";

// connect database
connectDB();

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/chats", chatRoute);

// health check
app.get("/", (_req, res) => {
    res.send("Backend is running");
});

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
