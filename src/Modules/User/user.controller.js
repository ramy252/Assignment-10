import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication } from "../../middleware/authentication.middleware.js";
import { TokenTypeEnum } from "../../Utils/enum/user.enum.js";
const router = Router();

router.get("/profile", authentication(TokenTypeEnum.ACCESS), userService.getProfile);

export default router;
