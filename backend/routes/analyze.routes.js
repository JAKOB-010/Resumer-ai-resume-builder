import { Router } from "express";
import { analyzeResumeText } from "../controllers/analyze.controller.js";

const router = Router();

router.post("/", analyzeResumeText);

export default router;
