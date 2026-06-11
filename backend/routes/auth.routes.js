import { Router } from "express";
import { googleAuthStub, verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/google", googleAuthStub);
router.get("/verify", verifyToken);

export default router;
