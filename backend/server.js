import express from "express";
import cors from "cors";
import "dotenv/config";
import atsRoutes from "./routes/ats.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import { atsScoreResumeData } from "./controllers/ai.controller.js";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";



const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "AI Resume Builder Backend is running!",
    status: "ok",
  });
});

app.use("/api/analyze", analyzeRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/ai", aiRoutes);
app.post("/api/ats-score", atsScoreResumeData);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});