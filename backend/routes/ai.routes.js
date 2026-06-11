import { Router } from "express";
import {
  atsScoreResumeData,
  getResumeSuggestions,
  parseResumeText,
  rewriteSummary,
  rewriteText,
  suggestSkills,
} from "../controllers/ai.controller.js";

const router = Router();

router.post("/suggestions", getResumeSuggestions);
router.post("/parse", parseResumeText);
router.post("/rewrite", rewriteText);
router.post("/rewrite-summary", rewriteSummary);
router.post("/skill-suggestions", suggestSkills);
router.post("/ats-score", atsScoreResumeData);

export default router;
