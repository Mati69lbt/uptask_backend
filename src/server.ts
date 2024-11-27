import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import { corsConfig } from "./config/cors";
import morgan from "morgan";

dotenv.config();

connectDB();

const app = express();

app.use(cors(corsConfig));

// Logging
app.use(morgan("dev"));

// Leer datos de formulario
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
