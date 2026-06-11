import { Router } from "express";
import { getResumeTemplate, validateResumePayload } from "../controllers/resume.controller.js";

const router = Router();

router.get("/template", getResumeTemplate);
router.post("/validate", validateResumePayload);

export default router;
