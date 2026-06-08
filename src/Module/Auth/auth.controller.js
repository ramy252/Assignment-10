import { Router } from "express";
import * as authService from "./auth.service.js";

const router = Router();

router.get("/", authService.getUser);

export default router;
