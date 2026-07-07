import { Router } from "express";
import { authentication } from "../../middleware/authentication.middleware.js";
import { TokenTypeEnum } from "../../Utils/enum/user.enum.js";
import * as userService from "./user.service.js";


const router = Router();

router.get("/profile", authentication({ TokenType: TokenTypeEnum.ACCESS }), userService.getProfile);

export default router;
