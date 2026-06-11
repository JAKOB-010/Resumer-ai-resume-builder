import { Router } from "express";
import multer from "multer";
import { checkAts } from "../controllers/ats.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/check", upload.single("resume"), checkAts);

export default router;
